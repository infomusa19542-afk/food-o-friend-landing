import Accordion from "@/components/common/Accordion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { SectionIds } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import type { FaqItem } from "@/models/site-content.model";

interface FaqSectionProps {
  items: readonly FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  if (items.length === 0) return null;
  const { faq } = AppStrings;

  return (
    <section id={SectionIds.faq} className="bg-charcoal text-white">
      <Container className="section-y grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <SectionTitle eyebrow={faq.eyebrow} title={faq.title} description={faq.description} />
        <Accordion
          items={items.map(({ id, question, answer }) => ({ id, title: question, content: answer }))}
        />
      </Container>
    </section>
  );
}
