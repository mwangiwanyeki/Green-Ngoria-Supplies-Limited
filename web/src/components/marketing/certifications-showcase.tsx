'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Download,
  Eye,
  ShieldCheck,
  Layers,
  FileCheck,
  Building,
  Scale,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/marketing/reveal';
import { Section, SectionIntro } from '@/components/marketing/section';
import {
  CertificationsDocumentModal,
  OfficialDocumentItem,
} from '@/components/marketing/certifications-document-modal';

export const verifiedDocuments: OfficialDocumentItem[] = [
  {
    id: 'mineral-dealers-licence',
    title: "Mineral Dealer's (Processing) Licence",
    category: 'Mining & Sovereign Rights',
    authority: 'Ministry of Mining, Republic of Kenya',
    ref: 'MDL/P: DPL/2025/2843 (Stamp: MDPL/PM/2026/2843)',
    statute: 'The Mining Act No. 12 of 2016 (Form DPL-2, r.8)',
    date: '15 January 2026',
    validity: 'Valid through 31st December 2026',
    status: 'Active & Endorsed',
    src: '/images/certifications/mineral-dealers-licence.webp',
    pdfUrl: '/documents/certifications/mineral-dealers-processing-licence.pdf',
    pages: [
      '/images/certifications/mineral-dealers-licence-p1.webp',
      '/images/certifications/mineral-dealers-licence-p2.webp',
      '/images/certifications/mineral-dealers-licence-p3.webp',
      '/images/certifications/mineral-dealers-licence-p4.webp',
      '/images/certifications/mineral-dealers-licence-p5.webp',
    ],
    pageLabels: [
      'Page 1: Licence Certificate & Sovereign Export Rights',
      'Page 2: Terms & Conditions (Form DTL-2)',
      'Page 3: Pricing & EMCA Compliance Rules',
      'Page 4: State Dept for Mining KES 500,050 Fee Receipt',
      'Page 5: Ardhisasa Stamp Duty Confirmation',
    ],
    description:
      'Official statutory mineral dealer processing licence issued by the Cabinet Secretary for Mining granting Green Ngoria Supplies Limited the sovereign right to buy, sell, process, and export GOLD under the laws of Kenya.',
    highlights: [
      {
        label: 'Rights Granted',
        value: 'Buy, sell, process and EXPORT of GOLD',
      },
      {
        label: 'Place of Business',
        value: 'Land L.R. No. Siaya/Nyangoma/1380, Kisian - Bondo Road',
      },
      {
        label: 'GPS Coordinates',
        value: '0° 06\' 07.9" S, 34° 16\' 45.9" E (Bondo, Siaya County)',
      },
      {
        label: 'Signatories',
        value:
          'Hon. Hassan Ali Joho (Cabinet Secretary) & Thomas Mutwiwa (Secretary Mines)',
      },
      {
        label: 'Licence Fee Paid',
        value: 'KES 500,050.00 (State Dept for Mining receipt #UBM11GZZ)',
      },
      {
        label: 'Stamp Duty',
        value: 'Paid & Certified via Ardhisasa (Serial No. 9XXV630EH9)',
      },
    ],
  },
  {
    id: 'nema-eia-license',
    title: 'NEMA Environmental Impact Assessment License',
    category: 'Environmental Authorization',
    authority: 'National Environment Management Authority (NEMA)',
    ref: 'NEMA/ENVIS/CPR/LIC-5448 (App: NEMA/ENVIS/CPR/12074)',
    statute: 'Environmental Management and Coordination Act (EMCA Cap 387)',
    date: '25th August 2026',
    validity: 'Valid 24 Months from Issue',
    status: 'Statutory Approval',
    src: '/images/certifications/nema-eia-license.webp',
    pdfUrl:
      '/documents/certifications/nema-environmental-impact-assessment-license.pdf',
    pages: [
      '/images/certifications/nema-eia-license-p1.webp',
      '/images/certifications/nema-eia-license-p2.webp',
      '/images/certifications/nema-eia-license-p3.webp',
      '/images/certifications/nema-eia-license-p4.webp',
    ],
    pageLabels: [
      'Page 1: EIA License Certificate (CPR/LIC-5448)',
      'Page 2: General & Construction Conditions',
      'Page 3: Operational & Tailings Containment Standards',
      'Page 4: Environmental Monitoring & Decommissioning Conditions',
    ],
    description:
      'Comprehensive Project Report EIA license approving artisanal gold ore mining in Siaya County to provide gold-bearing ore for pure gold extraction, governed by rigorous Environmental Management Plans (EMP).',
    highlights: [
      {
        label: 'Approved Project',
        value: 'Proposed Artisanal Gold Ore Mining',
      },
      {
        label: 'Site Location',
        value: 'Plot No. Siaya/Masala/3170, Seje Village, Rarieda Sub-County',
      },
      {
        label: 'GPS Coordinates',
        value: 'Latitude: -0.0211220 S, Longitude: 34.286321 E',
      },
      {
        label: 'Objective',
        value: 'Extraction of pure gold with zero environmental pollution',
      },
      {
        label: 'Tailings & Water Protocols',
        value:
          'Tailings containment & Water Quality Regulations 2024 compliance',
      },
      {
        label: 'Issuing Officer',
        value: 'Roph Kipkoech Kipkoech, for Director General NEMA',
      },
    ],
  },
  {
    id: 'certificate-of-incorporation',
    title: 'Certificate of Incorporation',
    category: 'Corporate Legal Identity',
    authority: 'Registrar of Companies, Republic of Kenya',
    ref: 'No. CPR/2011/57284',
    statute: 'Companies Act (Cap. 486)',
    date: '27th September 2011',
    validity: 'Perpetual Corporate Entity',
    status: 'Fully Incorporated',
    src: '/images/certifications/certificate-of-incorporation.webp',
    pdfUrl: '/documents/certifications/certificate-of-incorporation.pdf',
    pages: ['/images/certifications/certificate-of-incorporation-p1.webp'],
    pageLabels: ['Page 1: Official Certificate of Incorporation'],
    description:
      'Foundational certificate issued by the Registrar of Companies certifying that Green Ngoria Supplies Limited was incorporated on 27 September 2011 as a Limited Liability Company.',
    highlights: [
      { label: 'Company Name', value: 'GREEN NGORIA SUPPLIES LIMITED' },
      { label: 'Company Number', value: 'CPR/2011/57284' },
      { label: 'Date of Incorporation', value: '27 September 2011' },
      { label: 'Corporate Form', value: 'Private Limited Company' },
      { label: 'Registry City', value: 'Nairobi, Republic of Kenya' },
    ],
  },
  {
    id: 'kra-pin-certificate',
    title: 'KRA PIN & Tax Obligation Certificate',
    category: 'Tax & Revenue Compliance',
    authority: 'Kenya Revenue Authority (KRA)',
    ref: 'PIN: P051642021R',
    statute: 'Tax Procedures Act & Income Tax Act',
    date: '11 April 2017',
    validity: 'Active Statutory Obligation',
    status: 'Active Taxpayer',
    src: '/images/certifications/kra-pin-certificate.webp',
    pdfUrl: '/documents/certifications/kra-pin-certificate.pdf',
    pages: ['/images/certifications/kra-pin-certificate-p1.webp'],
    pageLabels: ['Page 1: KRA PIN Certificate & Tax Obligation Register'],
    description:
      'Official Kenya Revenue Authority registration certifying taxpayer identity P051642021R and active Income Tax – Company statutory obligations for corporate invoicing and procurement compliance.',
    highlights: [
      { label: 'Taxpayer Name', value: 'GREEN NGORIA SUPPLIES LIMITED' },
      { label: 'Tax Obligation', value: 'Income Tax - Company (Active)' },
      { label: 'Effective From', value: '16 December 2016' },
      {
        label: 'Tax Station',
        value: 'North of Nairobi, Starehe District, CBD',
      },
      {
        label: 'Registered Address',
        value: 'Rehema House, Standard Street, Nairobi',
      },
    ],
  },
  {
    id: 'business-registration-cr12',
    title: 'Business Registration Service (BRS) CR12',
    category: 'Corporate Governance',
    authority: 'Business Registration Service (BRS)',
    ref: 'OSPVT-9WIQJLRD (Company No: CPR/2011/57284)',
    statute: 'The Companies Act, 2015',
    date: '04 August 2026',
    validity: 'Official Search Record',
    status: 'Active & Verified',
    src: '/images/certifications/business-registration-cr12.webp',
    pdfUrl: '/documents/certifications/business-registration-cr12.pdf',
    pages: ['/images/certifications/business-registration-cr12-p1.webp'],
    pageLabels: ['Page 1: Official Companies Registry Search & Directorship'],
    description:
      'Official registry search certifying company particulars, registered offices at Rehema House, share capital structure, and current directors and beneficial shareholders.',
    highlights: [
      {
        label: 'Share Capital',
        value: 'KES 100,000.00 (1,000 Ordinary Shares @ KES 100)',
      },
      {
        label: 'Director & Shareholder',
        value: 'Davis Mragha Ngoo (500 Shares / 50%)',
      },
      {
        label: 'Director & Shareholder',
        value: 'Raymond Nyange Ngoo (250 Shares / 25%)',
      },
      {
        label: 'Director & Shareholder',
        value: 'Kenneth Madete Namboga (250 Shares / 25%)',
      },
      {
        label: 'Registered Office',
        value: 'Rehema House, Standard Street, Wundanyi, Taita Taveta',
      },
    ],
  },
  {
    id: 'company-profile-dossier',
    title: 'Corporate Company Profile & Capabilities',
    category: 'Corporate Profile & Dossier',
    authority: 'Green Ngoria Supplies Limited',
    ref: 'CPR/2011/57284 (32-Page Dossier)',
    statute: 'Official Prequalification & Technical Specifications Dossier',
    date: '2026 Corporate Edition',
    validity: 'Active & Verified (14.8 MB)',
    status: 'Official Dossier',
    src: '/images/company-profile-cover.webp',
    pdfUrl: '/documents/green-ngoria-supplies-company-profile.pdf',
    googleDriveUrl:
      'https://drive.google.com/file/d/1XMzyeOJpcE51KvhuB-aqhD-o6_TEORv1/view?usp=sharing',
    pages: ['/images/company-profile-cover.webp'],
    pageLabels: ['Page 1: Corporate Profile Cover & Executive Summary'],
    description:
      'Official 32-page corporate company profile detailing gold CIP/CIL processing plants, statutory licences, civil works, and regional delivery track record across Kenya and East Africa.',
    highlights: [
      { label: 'Document Size', value: '32 Pages • 14.8 MB PDF' },
      { label: 'Cloud Access', value: 'Google Drive & PDF Download' },
      {
        label: 'Engineering Scope',
        value: 'Gold CIP/CIL, Civil & Mechanical Works',
      },
      {
        label: 'Governance',
        value: 'Registered Directors & Statutory Prequalification',
      },
      {
        label: 'Place of Business',
        value: 'Rehema House, Standard Street, Nairobi',
      },
    ],
  },
];

const statutoryFrameworks = [
  {
    title: 'The Mining Act No. 12 of 2016',
    subtitle: 'Mineral Dealer & Processing Regulations',
    description:
      'Mandates statutory dealer licensing, mineral reporting registers, transparent electronic pricing mechanisms, and sovereign export oversight under the Cabinet Secretary for Mining.',
    icon: Scale,
  },
  {
    title: 'EMCA Cap 387 & Regulations',
    subtitle: 'Environmental & Tailings Protection',
    description:
      'Sets mandatory Environmental Impact Assessments, tailings dam design, zero chemical discharge, and Water Quality Regulations 2024 compliance monitored by NEMA inspectors.',
    icon: ShieldCheck,
  },
  {
    title: 'Occupational Safety & Health Act (OSHA 2007)',
    subtitle: 'Underground & Plant Safety',
    description:
      'Requires strict Personal Protective Equipment (PPE), certified blaster supervision, noise pollution mitigation, and comprehensive workplace safety protocols.',
    icon: Building,
  },
  {
    title: 'The Companies Act, 2015',
    subtitle: 'Corporate Governance & Transparency',
    description:
      'Enforces formal annual returns, verifiable beneficial ownership declarations, registered office maintenance, and statutory board oversight via the BRS register.',
    icon: FileCheck,
  },
];

function getShortStatus(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('endorsed')) return 'Active';
  if (s.includes('approval') || s.includes('approved')) return 'Approved';
  if (s.includes('incorporated')) return 'Incorporated';
  if (s.includes('taxpayer')) return 'Active Tax';
  if (s.includes('dossier') || s.includes('profile')) return 'Official';
  return status.length > 14 ? status.slice(0, 12) + '…' : status;
}

export function CertificationsShowcase() {
  const [selectedDoc, setSelectedDoc] =
    React.useState<OfficialDocumentItem | null>(null);
  const [filterCategory, setFilterCategory] = React.useState<
    'all' | 'mining' | 'corporate'
  >('all');

  const filteredDocs = React.useMemo(() => {
    if (filterCategory === 'mining') {
      return verifiedDocuments.filter((d) =>
        ['mineral-dealers-licence', 'nema-eia-license'].includes(d.id),
      );
    }
    if (filterCategory === 'corporate') {
      return verifiedDocuments.filter((d) =>
        [
          'company-profile-dossier',
          'certificate-of-incorporation',
          'kra-pin-certificate',
          'business-registration-cr12',
        ].includes(d.id),
      );
    }
    return verifiedDocuments;
  }, [filterCategory]);

  return (
    <>
      {/* Official Certificate Visual Showcase */}
      <Section id="statutory-certificates" labelledBy="official-docs-heading">
        <SectionIntro
          id="official-docs-heading"
          title="Verified Statutory Licences & Certifications"
          lead="Direct government registrations, sovereign mineral processing rights, environmental impact approvals, corporate dossiers, and verified tax records."
          align="stack"
        />

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold transition-all ${
              filterCategory === 'all'
                ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
                : 'border border-hairline bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="sm:hidden">All ({verifiedDocuments.length})</span>
            <span className="hidden sm:inline">
              All Official Documents ({verifiedDocuments.length})
            </span>
          </button>
          <button
            onClick={() => setFilterCategory('mining')}
            className={`rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold transition-all ${
              filterCategory === 'mining'
                ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
                : 'border border-hairline bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="sm:hidden">Mining & EIA (2)</span>
            <span className="hidden sm:inline">
              Mining & Environmental Licences (2)
            </span>
          </button>
          <button
            onClick={() => setFilterCategory('corporate')}
            className={`rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold transition-all ${
              filterCategory === 'corporate'
                ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
                : 'border border-hairline bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="sm:hidden">Corporate & Profile (4)</span>
            <span className="hidden sm:inline">
              Corporate, Profile & Tax (4)
            </span>
          </button>
        </div>

        {/* Document Cards Grid */}
        <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc, idx) => (
            <Reveal
              key={doc.id}
              kind="rise"
              delay={idx * 0.05}
              className="h-full flex flex-col"
            >
              <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-card shadow-card transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl">
                {/* Visual Preview Thumbnail Container */}
                <div
                  onClick={() => setSelectedDoc(doc)}
                  className="group/preview relative aspect-[1/1.08] xs:aspect-[1/1.16] sm:aspect-[1/1.28] max-h-[340px] sm:max-h-none w-full shrink-0 cursor-pointer overflow-hidden border-b border-hairline bg-gradient-to-b from-stone-100 via-neutral-100/90 to-stone-200/80 p-3.5 sm:p-4 dark:from-neutral-900/90 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDoc(doc);
                    }
                  }}
                  aria-label={`Preview ${doc.title}`}
                >
                  {/* Authentic Physical Document Paper Sheet Simulation */}
                  <div className="relative h-full w-auto aspect-[1/1.414] rounded-md shadow-lg shadow-black/15 border border-black/10 dark:border-white/10 overflow-hidden bg-white transition-transform duration-500 group-hover/preview:scale-[1.03]">
                    <Image
                      src={doc.src}
                      alt={doc.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 260px, (max-width: 1024px) 380px, 420px"
                      priority={idx < 2}
                    />
                    {/* Subtle paper top sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10 dark:from-white/5 dark:to-black/30" />
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 z-10 max-w-[60%]">
                    <span className="inline-block truncate rounded-md border border-white/20 bg-black/80 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-white backdrop-blur-md shadow-sm">
                      {doc.category}
                    </span>
                  </div>

                  {/* Top Right Status Badge - Compact and Guaranteed Not to Overflow */}
                  <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-600/95 dark:bg-emerald-500/95 px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-white shadow-sm backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse shrink-0" />
                      <span>{getShortStatus(doc.status)}</span>
                    </span>
                  </div>

                  {/* Page Count Badge */}
                  {doc.pages.length > 1 && (
                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 flex items-center gap-1.5 rounded-md bg-black/85 px-2.5 py-1 text-[0.6875rem] font-medium text-white shadow-sm backdrop-blur-md">
                      <Layers className="h-3 w-3 text-brand-400 shrink-0" />
                      <span>{doc.pages.length} Pages</span>
                    </div>
                  )}

                  {/* Hover / Tap Prompt */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/preview:opacity-100">
                    <div className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white shadow-xl">
                      <Eye className="h-4 w-4 shrink-0" />
                      <span>Inspect Document</span>
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                  <div className="flex flex-1 flex-col">
                    {/* Authority Eyebrow */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-600 dark:text-brand-400" />
                      <span className="font-semibold text-foreground truncate">
                        {doc.authority}
                      </span>
                    </div>

                    {/* Document Title */}
                    <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold tracking-tight text-foreground leading-snug sm:min-h-[3rem] line-clamp-2">
                      {doc.title}
                    </h3>

                    {/* Sovereign Reference Chip */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-brand-500/10 dark:bg-brand-400/10 px-2.5 py-1 font-mono text-[0.6875rem] font-semibold text-brand-700 dark:text-brand-300 border border-brand-500/20 break-all leading-tight">
                        <FileCheck className="h-3 w-3 shrink-0" />
                        Ref: {doc.ref}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:min-h-[3.75rem]">
                      {doc.description}
                    </p>

                    {/* Highlights Specification Box - No Truncation, Stacked Key-Value */}
                    <div className="mt-3.5 rounded-xl border border-hairline bg-muted/40 p-3 space-y-2 sm:min-h-[4.5rem]">
                      {doc.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="text-xs">
                          <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                            {h.label}
                          </span>
                          <span className="text-xs font-semibold text-foreground block mt-0.5 leading-snug break-words">
                            {h.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-4 border-t border-hairline pt-3.5">
                    {doc.googleDriveUrl ? (
                      <div className="space-y-2 w-full">
                        <Button
                          variant="brand"
                          size="sm"
                          asChild
                          className="w-full h-10 gap-2 px-3 text-xs font-semibold shadow-sm rounded-xl"
                        >
                          <a
                            href={doc.googleDriveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open complete dossier on Google Drive"
                          >
                            <ExternalLink className="h-4 w-4 shrink-0" />
                            <span>Open on Google Drive ↗</span>
                          </a>
                        </Button>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setSelectedDoc(doc)}
                            className="h-10 gap-1.5 px-3 text-xs font-semibold rounded-xl shadow-sm"
                          >
                            <Eye className="h-4 w-4 shrink-0" />
                            <span>Inspect</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-10 gap-1.5 px-3 text-xs font-medium rounded-xl border-hairline hover:bg-muted/60"
                          >
                            <a
                              href={doc.pdfUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4 shrink-0" />
                              <span>PDF Copy</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedDoc(doc)}
                          className="h-10 gap-2 px-3 text-xs font-semibold rounded-xl shadow-sm"
                        >
                          <Eye className="h-4 w-4 shrink-0" />
                          <span>Inspect</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-10 gap-2 px-3 text-xs font-medium rounded-xl border-hairline hover:bg-muted/60"
                        >
                          <a
                            href={doc.pdfUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 shrink-0" />
                            <span>PDF Copy</span>
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Statutory Compliance Register */}
      <Section tone="sunken" rule labelledBy="compliance-register-heading">
        <SectionIntro
          id="compliance-register-heading"
          title="Official Statutory Compliance Register"
          lead="Auditable records maintained with sovereign ministries, regulatory boards, and legal registries in Kenya."
          align="stack"
        />

        <div className="mt-10 w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-hairline bg-card shadow-card">
          {/* Mobile View: High-clarity responsive cards (100% fluid width, adapts dynamically to any phone width) */}
          <div className="block sm:hidden divide-y divide-hairline">
            {verifiedDocuments.map((doc) => (
              <div key={doc.id} className="p-4 space-y-3 bg-card">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <FileCheck className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground leading-tight">
                        {doc.title}
                      </h4>
                      <span className="text-[0.6875rem] text-muted-foreground block mt-0.5">
                        {doc.statute}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    {getShortStatus(doc.status)}
                  </span>
                </div>

                <div className="space-y-2 text-xs rounded-xl bg-muted/40 p-3">
                  <div>
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Authority:
                    </span>
                    <span className="font-medium text-foreground text-xs block mt-0.5">
                      {doc.authority}
                    </span>
                  </div>
                  <div>
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Statutory Reference:
                    </span>
                    <span className="font-mono font-semibold text-brand-700 dark:text-brand-400 text-xs block mt-0.5 break-all">
                      {doc.ref}
                    </span>
                  </div>
                  <div>
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Validity &amp; Term:
                    </span>
                    <span className="font-medium text-foreground text-xs block mt-0.5">
                      {doc.validity}
                    </span>
                  </div>
                </div>

                <div className="pt-1 space-y-2">
                  {doc.googleDriveUrl && (
                    <Button
                      variant="brand"
                      size="sm"
                      asChild
                      className="w-full h-10 px-3 text-xs font-semibold shadow-sm rounded-xl"
                    >
                      <a
                        href={doc.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1.5 shrink-0" />
                        <span>Open on Google Drive ↗</span>
                      </a>
                    </Button>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setSelectedDoc(doc)}
                      className="h-10 px-2.5 text-xs font-semibold rounded-xl"
                    >
                      <Eye className="h-4 w-4 mr-1.5 shrink-0" />
                      <span>Inspect</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-10 px-2.5 text-xs font-medium rounded-xl border-hairline hover:bg-muted/60"
                    >
                      <a href={doc.pdfUrl} download>
                        <Download className="h-4 w-4 mr-1.5 shrink-0" />
                        <span>PDF Copy</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop & Tablet View: Comprehensive multi-column data table */}
          <div className="hidden sm:block w-full max-w-full min-w-0 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead className="border-b border-hairline bg-muted/50 font-display text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5 sm:px-6">
                    Document &amp; Credential
                  </th>
                  <th className="px-4 py-3.5">Issuing Authority</th>
                  <th className="px-4 py-3.5">Statutory Reference</th>
                  <th className="px-4 py-3.5">Jurisdiction / Location</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right sm:px-6">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline text-muted-foreground">
                {verifiedDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="transition-colors hover:bg-muted/20"
                  >
                    <td className="px-5 py-4 font-semibold text-foreground sm:px-6">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                        <span>{doc.title}</span>
                      </div>
                      <span className="mt-0.5 block text-[0.6875rem] font-normal text-muted-foreground">
                        {doc.statute}
                      </span>
                    </td>
                    <td className="px-4 py-4">{doc.authority}</td>
                    <td className="px-4 py-4 font-mono font-medium text-foreground">
                      {doc.ref}
                    </td>
                    <td className="px-4 py-4">
                      {doc.highlights.find(
                        (h) =>
                          h.label.includes('Location') ||
                          h.label.includes('Place'),
                      )?.value || 'National / Republic of Kenya'}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                        {doc.validity}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right sm:px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {doc.googleDriveUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-7 px-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-500/10"
                          >
                            <a
                              href={doc.googleDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open on Google Drive"
                            >
                              Drive ↗
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDoc(doc)}
                          className="h-7 px-2 text-xs font-semibold text-brand-600 dark:text-brand-400"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-7 px-2 text-xs"
                        >
                          <a href={doc.pdfUrl} download>
                            <Download className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Statutory Frameworks Under Which We Operate */}
      <Section rule labelledBy="frameworks-heading">
        <SectionIntro
          id="frameworks-heading"
          title="Governing Regulatory Frameworks"
          lead="Every mineral processing plant, mining extraction shaft, and engineering construction contract strictly adheres to the statutory codes of Kenya."
          align="stack"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statutoryFrameworks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} kind="rise" delay={idx * 0.05}>
                <div className="h-full rounded-xl border border-hairline bg-card p-6 shadow-card transition-all hover:border-brand-500/30 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-700 dark:bg-brand-400/15 dark:text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Interactive Modal */}
      <CertificationsDocumentModal
        document={selectedDoc}
        isOpen={Boolean(selectedDoc)}
        onClose={() => setSelectedDoc(null)}
      />
    </>
  );
}
