import styles from "../KeyBenefits.module.css";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}
