import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface ScorecardState {
  status: 'loading' | 'has-scorecard' | 'no-scorecard' | 'error';
  score: number | null;
  band: string | null;
  completedAt: string | null;
  error: string | null;
}

interface Props {
  userEmail: string;
}

export default function ComplianceDashboard({ userEmail }: Props) {
  const [state, setState] = useState<ScorecardState>({
    status: 'loading',
    score: null,
    band: null,
    completedAt: null,
    error: null,
  });

  useEffect(() => {
    fetch('/api/compliance/scorecard')
      .then((res) => res.json())
      .then((data: { error?: string; hasScorecard?: boolean; score?: number; band?: string; completedAt?: string }) => {
        if (data.error) {
          setState({ status: 'error', score: null, band: null, completedAt: null, error: data.error });
        } else if (!data.hasScorecard) {
          setState({ status: 'no-scorecard', score: null, band: null, completedAt: null, error: null });
        } else {
          setState({
            status: 'has-scorecard',
            score: data.score ?? null,
            band: data.band ?? null,
            completedAt: data.completedAt ?? null,
            error: null,
          });
        }
      })
      .catch(() => {
        setState({ status: 'error', score: null, band: null, completedAt: null, error: 'Failed to load scorecard data' });
      });
  }, []);

  return (
    <>
      <Head>
        <title>Deal Readiness Board | SiteOptz</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl font-bold text-white mb-2">Deal Readiness Board</h1>
          <p className="text-gray-400 mb-8">{userEmail}</p>

          {state.status === 'loading' && (
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <p className="text-gray-300">Loading your scorecard data...</p>
            </div>
          )}

          {state.status === 'has-scorecard' && (
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="mb-6">
                <div className="text-5xl font-bold text-white mb-2">
                  {state.score}
                  <span className="text-2xl text-gray-400">/100</span>
                </div>
                <div className="text-xl font-semibold text-cyan-400 mb-1">{state.band}</div>
                {state.completedAt && (
                  <p className="text-gray-400 text-sm">
                    Completed {new Date(state.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <p className="text-gray-500 text-sm">Full dashboard components coming soon.</p>
            </div>
          )}

          {state.status === 'no-scorecard' && (
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

          {state.status === 'error' && (
            <div className="bg-black border border-red-800 rounded-xl p-8">
              <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
              <p className="text-gray-300">{state.error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: '/api/auth/signin',
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
