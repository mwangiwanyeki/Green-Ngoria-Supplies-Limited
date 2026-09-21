import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/page-hero';
import { Section, SectionIntro } from '@/components/marketing/section';
import { ScopeRegister } from '@/components/marketing/spec-panel';
import { Reveal } from '@/components/marketing/reveal';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { CompanyProfileDocumentSection } from '@/components/marketing/company-profile-document-section';
import { CertificationsShowcase } from '@/components/marketing/certifications-showcase';
import { company } from '@/config/company';

const title = 'Statutory Certifications & Compliance';
const description =
  'Official sovereign licences, Ministry of Mining mineral dealer processing licence, NEMA environmental impact assessment approvals, corporate incorporation, and KRA tax compliance for Green Ngoria Supplies Limited.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${company.legalName}`,
    description,
    type: 'website',
    url: '/certifications',
  },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        title="Statutory Certifications & Compliance"
        lead={[
          'Green Ngoria Supplies Limited operates under verified sovereign mining licences, environmental impact approvals, corporate registrations, and domestic tax compliance under the laws of the Republic of Kenya.',
          'All credentials below are authentic statutory documents held on official record. Full multi-page dossiers, our official corporate company profile, and certified true copies are provided for formal prequalification, mining partnerships, and client due diligence.',
        ]}
        primaryAction={{
          label: 'Company Profile (Google Drive)',
          href: company.profileDocument.googleDriveUrl,
        }}
        secondaryAction={{
          label: 'View Statutory Licences',
          href: '#statutory-certificates',
        }}
        facts={[
          {
            term: 'Company Profile',
            value: '32-Page Dossier (Google Drive)',
          },
          {
            term: 'Mineral Licence',
            value: 'DPL/2025/2843 (Gold Export)',
          },
          {
            term: 'NEMA Licence',
            value: 'LIC-5448 (Siaya County)',
          },
          {
            term: 'Company Reg',
            value: company.registration.companyNumber,
          },
        ]}
      />

      {/* Featured Company Profile Dossier Showcase & Interactive Viewer */}
      <CompanyProfileDocumentSection id="company-profile" />

      {/* Interactive Official Certifications, Licences Showcase & Compliance Register */}
      <CertificationsShowcase />

      {/* Policy commitments */}
      <Section rule labelledBy="policy-heading">
        <SectionIntro
          id="policy-heading"
          title="Operational and Environmental Policy Commitments"
          lead="Our compliance protocols align directly with the Environmental Management and Coordination Act (EMCA Cap 387) and the Kenya Mining Act No. 12 of 2016."
          align="stack"
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal kind="wipe">
            <h3 className="tech-label">
              Quality assurance & metallurgical control
            </h3>
            <p className="measure mt-4 text-sm leading-7 text-muted-foreground">
              {company.qualityAssurance.summary}
            </p>
            <ScopeRegister
              items={company.qualityAssurance.points}
              columns={1}
              className="mt-6"
            />
          </Reveal>
          <Reveal kind="wipe" delay={0.06}>
            <h3 className="tech-label">
              Health, safety, tailings & environment
            </h3>
            <p className="measure mt-4 text-sm leading-7 text-muted-foreground">
              {company.hse.summary}
            </p>
            <ScopeRegister
              items={company.hse.points}
              columns={1}
              className="mt-6"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        title="Prequalifying Green Ngoria?"
        body="Tell us which documents your process requires — Mineral Dealer’s Processing Licence, NEMA Environmental Licence, Certificate of Incorporation, KRA PIN, or CR12 search — and our compliance team will supply verified certified dossiers."
        primary={{ label: 'Request the documents', href: '/contact' }}
        secondary={{ label: 'See completed projects', href: '/projects' }}
      />
    </>
  );
}
