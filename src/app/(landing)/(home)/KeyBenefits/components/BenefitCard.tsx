import styles from "@/components/ui/KeyBenefits.module.css";
import BenefitIcon from "./BenefitIcon";

export interface Benefit {
  number: string;
  icon: "payment" | "chart" | "box" | "check" | "dashboard";
  title: string;
  description: string;
  wide?: boolean;
}

interface BenefitCardProps {
  benefit: Benefit;
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  const { number, icon, title, description, wide } = benefit;

  return (
    <article className={`${styles.card} ${wide ? styles.cardWide : ""}`}>
      <div className={styles.iconRow}>
        <div className={styles.iconWrap}>
          <BenefitIcon name={icon} />
        </div>
        <span className={styles.number}>{number}</span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDesc}>{description}</p>
      </div>

      {wide && (
        <div className={styles.arrow} aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </article>
  );
}
