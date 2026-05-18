import styles from "@/components/ui/KeyBenefits.module.css";
import SectionHeader from "../../../../components/ui/SectionHeader";
import BenefitCard, { type Benefit } from "./components/BenefitCard";

const BENEFITS: Benefit[] = [
  {
    number: "01",
    icon: "payment",
    title: "Automatic payment tracking",
    description:
      "Every payment captured automatically from your connected providers. No manual recording needed.",
  },
  {
    number: "02",
    icon: "chart",
    title: "Real-time sales & profit visibility",
    description:
      "Instant insights into your business performance with live dashboard updates.",
  },
  {
    number: "03",
    icon: "box",
    title: "Accurate stock tracking",
    description:
      "Never run out of stock or oversell. Know exactly what you have at all times.",
  },
  {
    number: "04",
    icon: "check",
    title: "Reduced errors & guesswork",
    description:
      "Eliminate manual calculation mistakes and always know your true numbers.",
  },
  {
    number: "05",
    icon: "dashboard",
    title: "Simple dashboard designed for business owners",
    description:
      "No accounting degree required. Built for entrepreneurs, not accountants — everything in one place.",
    wide: true,
  },
];

export default function KeyBenefits() {
  return (
    <section className={styles.section}>
      <SectionHeader
        eyebrow="Why Monssel"
        title="Key benefits"
        subtitle="Simplifies daily business management so you can focus on growth instead of spreadsheets."
      />

      <div className={styles.grid}>
        {BENEFITS.map((benefit) => (
          <BenefitCard key={benefit.number} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}
