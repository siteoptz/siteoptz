import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { AIToolEntry, ComplianceProfile } from '@/lib/compliance-config';
import { CHECKLIST_ITEMS, COMPLIANCE_DOCUMENTS } from '@/lib/compliance-config';
import ComplianceDashboardLayout from '@/components/compliance/ComplianceDashboardLayout';
import DealReadinessHeader from '@/components/compliance/DealReadinessHeader';
import WeeklyChecklist from '@/components/compliance/WeeklyChecklist';
import GapCard from '@/components/compliance/GapCard';
import AIToolTracker from '@/components/compliance/AIToolTracker';
import DocumentsSection from '@/components/compliance/DocumentsSection';

type PageStatus = 'loading' | 'has-scorecard' | 'no-scorecard' | 'error';

interface Props {
  userEmail: string;
}

export default function ComplianceDashboard({ userEmail }: Props) {
  const [status, setStatus] = useState<PageStatus>('loading');
  const [profile, setProfile] = useState<ComplianceProfile | null>(null);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [aiTools, setAITools] = useState<AIToolEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/compliance/profile')
      .then((res) => res.json())
      .then((data: ComplianceProfile & { error?: string }) => {
        if (data.error) {
          setStatus('error');
          setError(data.error);
        } else if (!data.hasScorecard) {
          setStatus('no-scorecard');
          setProfile(data);
          setChecklistState(data.checklistState ?? {});
          setAITools(data.aiTools ?? []);
        } else {
          setStatus('has-scorecard');
          setProfile(data);
          setChecklistState(data.checklistState ?? {});
          setAITools(data.aiTools ?? []);
        }
      })
      .catch(() => {
        setStatus('error');
        setError('Failed to load dashboard data');
      });
  }, []);

  return (
    <>
      <Head>
        <title>Deal Readiness Board | SiteOptz</title>
      </Head>
      <ComplianceDashboardLayout userEmail={userEmail}>
        {status === 'loading' && (
          <div className="bg-black border border-gray-800 rounded-xl p-8">
            <p className="text-gray-300">Loading your scorecard data...</p>
          </div>
        )}

        {status === 'has-scorecard' && profile?.scorecardData && (
          <div className="space-y-6">
            <DealReadinessHeader
              score={profile.scorecardData.score}
              band={profile.scorecardData.band}
              completedAt={profile.scorecardData.completedAt}
            />

            <WeeklyChecklist
              items={CHECKLIST_ITEMS}
              initialState={checklistState}
              onUpdate={setChecklistState}
            />

            {profile.scorecardData.topGaps.slice(0, 3).map((gap, i) => (
              <GapCard
                key={`${gap.category}-${i}`}
                category={gap.category}
                priority={gap.priority}
              />
            ))}

            <AIToolTracker
              initialTools={aiTools}
              onUpdate={setAITools}
            />

            <DocumentsSection documents={COMPLIANCE_DOCUMENTS} />

            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <p className="text-gray-300 text-sm">
                Need this done in days, not weeks?{' '}
                <Link href="/upgrade" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  See Starter ($497/yr) →
                </Link>
              </p>
            </div>
          </div>
        )}

        {status === 'no-scorecard' && (
          <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">No Scorecard Yet</h2>
            <p className="text-gray-300 mb-6">
              Take the AI Compliance Readiness Scorecard to see your deal readiness score.
            </p>
            <Link
              href="/ai-governance/scorecard"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Take the Scorecard
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-black border border-red-800 rounded-xl p-8">
            <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
            <p className="text-gray-300">{error}</p>
          </div>
        )}
      </ComplianceDashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userEmail: session.user.email,
    },
  };
};
