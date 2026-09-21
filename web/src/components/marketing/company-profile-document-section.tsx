'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  FileText,
  Download,
  ExternalLink,
  Eye,
  CheckCircle2,
  Layers,
  Sparkles,
  Maximize2,
  HardDrive,
  FileCheck2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Reveal } from '@/components/marketing/reveal';
import { company } from '@/config/company';

interface CompanyProfileDocumentSectionProps {
  id?: string;
  className?: string;
}

export function CompanyProfileDocumentSection({
  id = 'company-profile',
  className = '',
}: CompanyProfileDocumentSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewerMode, setViewerMode] = React.useState<'native' | 'drive'>(
    'drive',
  );
  const doc = company.profileDocument;

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-12 md:py-16 w-full max-w-full overflow-hidden ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        <Reveal kind="rise">
          <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card shadow-card">
            {/* Subtle brand glow accent in corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-400/10"
            />

            <div className="grid gap-8 p-4 sm:p-8 md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
              {/* Left Column: Document Visual Representation */}
              <div className="flex flex-col items-center justify-center lg:col-span-5 xl:col-span-4">
                <div
                  onClick={() => setIsOpen(true)}
                  className="group relative aspect-[1/1.38] w-full max-w-[240px] xs:max-w-[280px] cursor-pointer sm:max-w-[320px] transition-transform duration-300 hover:scale-[1.02]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsOpen(true);
                    }
                  }}
                  aria-label="Click to preview the complete Company Profile document"
                >
                  {/* Subtle 3D book shadow behind the cover */}
                  <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-ink/30 blur-md transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4 dark:bg-black/60" />

                  {/* Document Cover Container */}
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/20 bg-muted shadow-2xl">
                    <Image
                      src={doc.coverImage}
                      alt={doc.title}
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, 320px"
                    />

                    {/* Book spine lighting overlay */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent" />

                    {/* Badge on cover */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/30 bg-black/70 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-brand-400" />
                      <span>{doc.pages} Pages • PDF</span>
                    </div>

                    {/* Hover Prompt Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
                        <Eye className="h-6 w-6" />
                      </div>
                      <span className="mt-3 text-xs font-semibold tracking-wide text-white uppercase">
                        Click to Preview
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick File Specs under cover */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 font-mono text-[0.6875rem]">
                    <HardDrive className="h-3 w-3" /> {doc.fileSize}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[0.6875rem]">
                    <FileCheck2 className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                    Verified Document
                  </span>
                </div>
              </div>

              {/* Right Column: Metadata, Summary & Actions */}
              <div className="flex flex-col justify-between lg:col-span-7 xl:col-span-8">
                <div>
                  {/* Eyebrow */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-400">
                      <Layers className="h-3.5 w-3.5" />
                      Official Corporate Dossier
                    </span>
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-brand-700 dark:text-brand-300">
                      {doc.edition}
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Company Profile &amp; Technical Capabilities
                  </h2>

                  {/* Summary */}
                  <p className="measure mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The authoritative 32-page Green Ngoria Supplies Limited
                    corporate profile, compiled for tender prequalification,
                    prospective mining joint ventures, and regulatory
                    verification. This dossier details our gold extraction and
                    CIP/CIL mineral processing plants, statutory licences,
                    registered civil and mechanical engineering teams, and
                    regional delivery track record across Kenya and East Africa.
                  </p>

                  {/* Key Included Chapters Grid */}
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {[
                      {
                        title: 'Gold CIP/CIL Plant Engineering',
                        desc: 'Crushing, milling, gravity concentration, leaching & elution systems',
                      },
                      {
                        title: 'Statutory Permits & Licences',
                        desc: 'Mineral Dealer’s Processing Licence, NEMA approvals & KRA compliance',
                      },
                      {
                        title: 'Civil & Mechanical Engineering',
                        desc: 'Plant infrastructure, steel fabrication, water reticulation & heavy works',
                      },
                      {
                        title: 'Regional Footprint',
                        desc: 'Active projects & operational experience in Kenya, Tanzania, Uganda & Rwanda',
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-2.5 rounded-lg border border-hairline bg-muted/40 p-3 transition-colors hover:bg-muted/70"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                        <div>
                          <h4 className="text-xs font-bold text-foreground">
                            {item.title}
                          </h4>
                          <p className="mt-0.5 text-[0.6875rem] leading-4 text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:flex-wrap">
                  {/* Primary: Open in Google Drive */}
                  <Button
                    asChild
                    variant="brand"
                    size="lg"
                    className="w-full sm:w-auto h-auto min-h-[2.75rem] sm:min-h-[3rem] py-3 sm:py-3.5 px-4 sm:px-7 text-xs xs:text-sm sm:text-[0.9375rem] whitespace-normal sm:whitespace-nowrap leading-snug text-center font-semibold shadow-sm"
                  >
                    <a
                      href={doc.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open full Company Profile on Google Drive"
                    >
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      <span>Open on Google Drive</span>
                    </a>
                  </Button>

                  {/* Secondary: Preview in Modal */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsOpen(true)}
                    leftIcon={<Eye className="h-4 w-4 shrink-0" />}
                    className="w-full sm:w-auto h-auto min-h-[2.75rem] sm:min-h-[3rem] py-3 sm:py-3.5 px-4 sm:px-7 text-xs xs:text-sm sm:text-[0.9375rem] whitespace-normal sm:whitespace-nowrap leading-snug text-center font-semibold"
                  >
                    <span>Preview in Reader</span>
                  </Button>

                  {/* Tertiary: Direct Download */}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-auto min-h-[2.75rem] sm:min-h-[3rem] py-3 sm:py-3.5 px-4 sm:px-7 text-xs xs:text-sm sm:text-[0.9375rem] whitespace-normal sm:whitespace-nowrap leading-snug text-center font-semibold"
                  >
                    <a
                      href={doc.fileUrl}
                      download={doc.downloadName}
                      aria-label="Download the full Green Ngoria Company Profile PDF"
                    >
                      <Download className="h-4 w-4 shrink-0" />
                      <span>Download PDF ({doc.fileSize})</span>
                    </a>
                  </Button>
                </div>

                {/* Direct Google Drive URL Callout Banner */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border border-brand-500/20 bg-brand-500/5 p-3 sm:px-4 sm:py-3 text-xs">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2 min-w-0 flex-1">
                    <span className="font-bold text-brand-700 dark:text-brand-300 shrink-0 flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      Google Drive Link:
                    </span>
                    <a
                      href={doc.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.6875rem] sm:text-xs text-foreground underline hover:text-brand-600 break-all"
                    >
                      {doc.googleDriveUrl}
                    </a>
                  </div>
                  <a
                    href={doc.googleDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-full sm:w-auto text-center rounded-md bg-brand-500/10 px-3 py-2 sm:py-1 font-semibold text-brand-700 hover:bg-brand-500/20 dark:text-brand-300 text-xs sm:text-[0.6875rem]"
                  >
                    Open Document ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Document Viewer Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[92vh] max-w-6xl w-[calc(100vw-1.5rem)] sm:w-[96vw] flex flex-col p-0 overflow-hidden border border-hairline bg-card shadow-2xl sm:rounded-2xl">
          {/* Custom Dialog Header with Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-hairline bg-card p-3.5 sm:px-5 sm:py-3.5 pr-12 sm:pr-14">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <DialogTitle className="truncate text-sm sm:text-base font-bold font-display">
                  {doc.title}
                </DialogTitle>
                <span className="hidden sm:inline-flex rounded-full bg-muted px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                  {doc.pages} Pages
                </span>
              </div>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5 truncate">
                Interactive document reader • {doc.edition}
              </DialogDescription>
            </div>

            {/* Viewer Controls */}
            <div className="flex items-center gap-2">
              {/* Engine Toggle */}
              <div className="hidden sm:flex items-center rounded-lg border border-hairline bg-muted/60 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setViewerMode('native')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewerMode === 'native'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Direct Reader
                </button>
                <button
                  type="button"
                  onClick={() => setViewerMode('drive')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewerMode === 'drive'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Google Drive View
                </button>
              </div>

              {/* Open in new tab */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex h-8 px-2 text-xs"
              >
                <a
                  href={
                    viewerMode === 'drive' ? doc.googleDriveUrl : doc.fileUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new window"
                >
                  <Maximize2 className="h-3.5 w-3.5 mr-1" />
                  New Tab
                </a>
              </Button>

              {/* Download */}
              <Button
                asChild
                variant="brand"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                <a href={doc.fileUrl} download={doc.downloadName}>
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Download
                </a>
              </Button>
            </div>
          </div>

          {/* Viewer Area */}
          <div className="relative flex-1 w-full bg-mineral-charcoal/95 min-h-[50vh] sm:min-h-[70vh]">
            {viewerMode === 'native' ? (
              <object
                data={`${doc.fileUrl}#view=FitH&toolbar=1`}
                type="application/pdf"
                className="h-full w-full border-0"
                style={{ height: '70vh', minHeight: '340px' }}
              >
                <iframe
                  src={`${doc.fileUrl}#view=FitH&toolbar=1`}
                  title="Green Ngoria Supplies Company Profile PDF"
                  className="h-full w-full border-0"
                  style={{ height: '70vh', minHeight: '340px' }}
                />
              </object>
            ) : (
              <iframe
                src={doc.googleDrivePreviewUrl}
                title="Green Ngoria Supplies Company Profile Google Drive Preview"
                className="h-full w-full border-0"
                style={{ height: '70vh', minHeight: '340px' }}
                allow="autoplay"
              />
            )}
          </div>

          {/* Viewer Footer info & fallbacks */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-muted/40 px-5 py-2.5 text-xs text-muted-foreground">
            <p>
              Having trouble viewing? You can{' '}
              <a
                href={doc.fileUrl}
                download={doc.downloadName}
                className="font-medium text-brand-600 dark:text-brand-400 underline underline-offset-2"
              >
                download the full PDF ({doc.fileSize})
              </a>{' '}
              or{' '}
              <a
                href={doc.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 dark:text-brand-400 underline underline-offset-2"
              >
                open on Google Drive
              </a>
              .
            </p>
            <span className="font-mono text-[0.6875rem]">
              Corporate Reference: CPR/2011/57284
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
