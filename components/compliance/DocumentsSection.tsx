import { useState } from 'react';
import Link from 'next/link';
import type { ComplianceDocument } from '@/lib/compliance-config';

interface Props {
  documents: ComplianceDocument[];
}

function FreeDocumentCard({ doc }: { doc: ComplianceDocument }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-white font-semibold text-sm">{doc.title}</h3>
        <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-green-900 text-green-300 border border-green-700">
          Free
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-snug mb-3">{doc.description}</p>
      <p className="text-gray-500 text-xs mb-4">{doc.meta}</p>
      <a
        href={doc.downloadUrl}
        download
        className="mt-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        Download template
      </a>
    </div>
  );
}

function LockedDocumentCard({ doc }: { doc: ComplianceDocument }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-gray-300 font-semibold text-sm">{doc.title}</h3>
        <span className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
          <svg
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Locked
        </span>
      </div>
      <p className="text-gray-500 text-sm leading-snug mb-1">{doc.description}</p>
      <p className="text-gray-600 text-xs mb-3">{doc.meta}</p>

      {doc.previewSections && doc.previewSections.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="self-start text-xs text-cyan-400 hover:text-cyan-300 hover:underline mb-3 transition-colors"
          >
            {expanded ? 'Hide contents ▴' : 'Preview contents ▾'}
          </button>

          {expanded && (
            <div className="border-t border-gray-800 pt-3 mb-4">
              <ul className="space-y-1.5">
                {doc.previewSections.map((section) => (
                  <li key={section.heading} className="text-xs leading-snug">
                    <span className="text-gray-300">{section.heading}</span>
                    <span className="text-gray-500"> — {section.valueProp}</span>
                  </li>
                ))}
              </ul>
              {doc.appendixSummary && (
                <p className="text-xs text-gray-500 italic mt-2">{doc.appendixSummary}</p>
              )}
            </div>
          )}
        </>
      )}

      <Link
        href="/upgrade"
        className="mt-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-700 text-cyan-400 rounded-lg hover:border-cyan-600 hover:text-cyan-300 transition-colors"
      >
        Unlock with Starter →
      </Link>
    </div>
  );
}

export default function DocumentsSection({ documents }: Props) {
  const freeDocs = documents.filter((d) => d.access === 'free');
  const lockedDocs = documents.filter((d) => d.access === 'locked');

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-semibold text-base">Documents</h2>
        <span className="text-xs text-gray-400">{freeDocs.length} free</span>
      </div>
      <p className="text-gray-400 text-sm mb-5">
        Audit-ready templates, mapped to NIST AI RMF, ISO 42001, SOC 2, and the EU AI Act.
      </p>

      {freeDocs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {freeDocs.map((doc) => (
            <FreeDocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}

      {lockedDocs.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Complete the set
            </span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lockedDocs.map((doc) => (
              <LockedDocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
