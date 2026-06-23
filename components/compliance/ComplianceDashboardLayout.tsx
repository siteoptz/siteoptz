import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  userEmail: string;
}

export default function ComplianceDashboardLayout({ children, userEmail }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      <nav className="border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-white font-semibold text-lg">Deal Readiness Board</span>
          <span className="text-gray-400 text-sm truncate ml-4">{userEmail}</span>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-gray-800 py-6">
        <p className="text-center text-gray-600 text-xs">
          siteoptz.ai · AI compliance for founders
        </p>
      </footer>
    </div>
  );
}
