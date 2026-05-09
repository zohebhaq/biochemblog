import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <div className={styles.info}>
          <h3>Synapse<span className={styles.highlight}>&amp;</span>Synthesis</h3>
          <p>Exploring the elegant intersections of life sciences and medicine.</p>
        </div>
        <div className={styles.links}>
          <span>© {new Date().getFullYear()} Synapse & Synthesis. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
