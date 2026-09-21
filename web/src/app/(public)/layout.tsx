import { Suspense } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { WebAnalyticsTracker } from '@/components/analytics/web-analytics-tracker';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
      {/* First-party page-view tracker (uses useSearchParams → needs Suspense). */}
      <Suspense fallback={null}>
        <WebAnalyticsTracker />
      </Suspense>
      <SiteHeader />
      <main
        id="main"
        className="flex-1 w-full max-w-full min-w-0 overflow-x-hidden"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
