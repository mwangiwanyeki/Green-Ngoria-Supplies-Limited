'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ZoomIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export interface OfficialDocumentItem {
  id: string;
  title: string;
  category: string;
  authority: string;
  ref: string;
  statute: string;
  date: string;
  validity: string;
  status: string;
  src: string;
  pdfUrl: string;
  googleDriveUrl?: string;
  pages: string[];
  pageLabels?: string[];
  description: string;
  highlights: { label: string; value: string }[];
}

interface CertificationsDocumentModalProps {
  document: OfficialDocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificationsDocumentModal({
  document,
  isOpen,
  onClose,
}: CertificationsDocumentModalProps) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);

  // Reset page when document changes
  React.useEffect(() => {
    setCurrentPage(0);
    setIsZoomed(false);
  }, [document?.id]);

  if (!document) return null;

  const totalPages = document.pages.length;
  const currentImageSrc = document.pages[currentPage] || document.src;
  const currentPageLabel =
    document.pageLabels?.[currentPage] ||
    `Page ${currentPage + 1} of ${totalPages}`;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-6xl w-[calc(100vw-1.5rem)] sm:w-[96vw] flex flex-col p-0 overflow-hidden border border-hairline bg-card shadow-2xl sm:rounded-2xl">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline bg-muted/40 p-3.5 sm:px-6 sm:py-4">
          <div className="space-y-1 pr-6 sm:pr-8">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[0.625rem] sm:text-[0.6875rem] font-semibold tracking-wide text-brand-700 dark:bg-brand-400/15 dark:text-brand-300">
                <ShieldCheck className="h-3 w-3 shrink-0" />
                {document.category}
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] sm:text-[0.6875rem] font-medium text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                {document.status}
              </span>
            </div>
            <DialogTitle className="font-display text-base font-bold sm:text-xl text-foreground line-clamp-2">
              {document.title}
            </DialogTitle>
            <DialogDescription className="text-[0.6875rem] sm:text-xs text-muted-foreground truncate">
              {document.authority} •{' '}
              <span className="font-mono">{document.ref}</span>
            </DialogDescription>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {document.googleDriveUrl && (
              <Button
                variant="brand"
                size="sm"
                asChild
                className="h-8 gap-1.5 px-2.5 sm:px-3 text-xs font-semibold shadow-sm flex-1 sm:flex-none"
              >
                <a
                  href={document.googleDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open source file on Google Drive"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  <span>Google Drive</span>
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-8 gap-1.5 px-2.5 sm:px-3 text-xs font-medium flex-1 sm:flex-none"
            >
              <a
                href={document.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                <span>PDF</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 gap-1.5 px-2.5 sm:px-3 text-xs font-medium flex-1 sm:flex-none"
            >
              <a
                href={document.googleDriveUrl || document.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span>Open File</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Modal Body: Split view (Image canvas + Metadata) */}
        <div className="grid flex-1 overflow-y-auto lg:grid-cols-12 min-h-0">
          {/* Main Visual Canvas (Col 8) */}
          <div className="relative flex flex-col items-center justify-between border-b border-hairline bg-neutral-900/95 p-4 lg:col-span-8 lg:border-b-0 lg:border-r">
            {/* Top Toolbar */}
            <div className="mb-2 flex w-full items-center justify-between gap-2 px-1 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="rounded bg-white/10 px-2 py-0.5 font-medium truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs text-[0.6875rem] sm:text-xs">
                  {currentPageLabel}
                </span>
                {totalPages > 1 && (
                  <span className="text-[0.625rem] text-neutral-400 shrink-0">
                    ({currentPage + 1}/{totalPages})
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs text-neutral-200 transition-colors hover:bg-white/20 shrink-0"
                title="Toggle Zoom"
              >
                <ZoomIn className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">
                  {isZoomed ? 'Reset View' : 'Zoom In'}
                </span>
              </button>
            </div>

            {/* Document Image Viewport */}
            <div
              className={`relative flex w-full items-center justify-center overflow-auto rounded-lg transition-all ${
                isZoomed ? 'max-h-[70vh]' : 'max-h-[44vh] sm:max-h-[66vh]'
              }`}
            >
              <div
                className={`relative transition-transform duration-300 ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={currentImageSrc}
                  alt={`${document.title} - Page ${currentPage + 1}`}
                  width={900}
                  height={1270}
                  className="rounded-md border border-white/20 shadow-2xl object-contain max-h-[44vh] sm:max-h-[66vh] w-auto mx-auto"
                  priority
                />
              </div>
            </div>

            {/* Pagination Controls (for multi-page documents) */}
            {totalPages > 1 ? (
              <div className="mt-3 sm:mt-4 flex w-full flex-wrap items-center justify-between gap-2 sm:gap-3 border-t border-white/10 pt-2.5 sm:pt-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="h-7 sm:h-8 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white px-2.5 sm:px-3 text-xs"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 mr-0.5 sm:mr-1" />
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    className="h-7 sm:h-8 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white px-2.5 sm:px-3 text-xs"
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5 ml-0.5 sm:ml-1" />
                  </Button>
                </div>

                {/* Thumbnail dots / buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {document.pages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`h-7 px-2.5 rounded text-xs font-semibold transition-all ${
                        currentPage === idx
                          ? 'bg-brand-500 text-white shadow'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                      }`}
                    >
                      P{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-3 text-center text-[0.6875rem] text-neutral-400">
                Official single-page statutory certificate on government record
              </div>
            )}
          </div>

          {/* Right Column: Detailed Document Dossier & Context (Col 4) */}
          <div className="flex flex-col justify-between bg-card p-5 sm:p-6 lg:col-span-4 overflow-y-auto">
            <div className="space-y-5">
              <div>
                <h4 className="tech-label text-brand-700 dark:text-brand-400">
                  Legal Scope & Authority
                </h4>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {document.description}
                </p>
              </div>

              {/* Highlights & Parameters */}
              <div className="rounded-xl border border-hairline bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Statute</span>
                  <span className="font-medium text-foreground text-right">
                    {document.statute}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Registration / Ref
                  </span>
                  <span className="font-mono font-medium text-brand-700 dark:text-brand-400 text-right">
                    {document.ref}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Date of Issue</span>
                  <span className="font-medium text-foreground text-right">
                    {document.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Validity Period</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400 text-right">
                    {document.validity}
                  </span>
                </div>
              </div>

              {document.googleDriveUrl && (
                <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Google Drive Source
                    </span>
                    <a
                      href={document.googleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Open Link →
                    </a>
                  </div>
                  <p className="mt-1 text-[0.6875rem] text-muted-foreground break-all">
                    {document.googleDriveUrl}
                  </p>
                </div>
              )}

              {/* Key Document Specific Highlights */}
              <div className="space-y-2">
                <h5 className="text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Statutory Records & Findings
                </h5>
                <dl className="divide-y divide-hairline rounded-lg border border-hairline bg-background text-xs">
                  {document.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-0.5 px-3 py-2.5 sm:flex-row sm:justify-between"
                    >
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="font-medium text-foreground text-left sm:text-right">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-6 border-t border-hairline pt-4 text-[0.6875rem] leading-relaxed text-muted-foreground">
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                <span>
                  Official public record document held on file by Green Ngoria
                  Supplies Limited. Certified true copies are made available
                  during formal prequalification and tender submissions.
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
