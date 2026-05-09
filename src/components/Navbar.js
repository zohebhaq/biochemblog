import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.navbar}`}>
        <Link href="/" className={styles.logo}>
          Synapse<span className={styles.highlight}>&amp;</span>Synthesis
        </Link>
        <nav className={styles.navLinks}>
          <Link href="/biology" className={styles.link}>Biology</Link>
          <Link href="/chemistry" className={styles.link}>Chemistry</Link>
          <Link href="/medicine" className={styles.link}>Medicine</Link>
          <Link href="/dentistry" className={styles.link}>Dentistry</Link>
        </nav>
      </div>
    </header>
  );
}
