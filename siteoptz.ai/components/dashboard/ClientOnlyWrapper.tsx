import React, { useState, useEffect } from 'react';

interface ClientOnlyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnlyWrapper({ children, fallback = <div>Loading...</div> }: ClientOnlyWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
