import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import { AppConfig } from "@/constants/app_config";
import type { LegalDocumentCopy } from "@/constants/app_legal_strings";
import { AppStrings } from "@/constants/app_strings";

const { legal } = AppStrings;
const { company } = AppConfig;

/** Renders a Privacy/Terms document from structured copy. */
export default function LegalDocument({ copy }: { copy: LegalDocumentCopy }) {
  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.intro} />
      <section className="bg-cream text-text-dark">
        <Container className="section-y">
          <article className="mx-auto flex max-w-3xl flex-col gap-10 leading-relaxed">
            <p className="text-sm text-text-soft">
              {legal.lastUpdated}: {company.legalLastUpdated}
            </p>

            {copy.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-xl font-bold sm:text-2xl">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-text-soft">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="flex list-disc flex-col gap-2 pl-5 text-text-soft marker:text-brand">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="flex flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <h2 className="text-xl font-bold sm:text-2xl">{legal.contact.heading}</h2>
              <p className="text-text-soft">
                {legal.providedBy} {company.legalEntityName ?? company.displayName}.
              </p>
              {company.contactEmail ? (
                <p className="text-text-soft">
                  {legal.contact.withEmail}{" "}
                  <a
                    href={`mailto:${company.contactEmail}`}
                    className="font-semibold text-brand underline underline-offset-2 break-all"
                  >
                    {company.contactEmail}
                  </a>
                  .
                </p>
              ) : (
                <p className="text-text-soft">{legal.contact.pending}</p>
              )}
            </section>
          </article>
        </Container>
      </section>
    </>
  );
}
