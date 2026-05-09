import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/lib/articles';
import AnimatedHeroBackground from '@/components/AnimatedHeroBackground';
import styles from './page.module.css';

export default function Home() {
  const topics = [
    { name: 'Biology', color: 'var(--bio-green)', desc: 'The study of life and living organisms.', icon: 'B' },
    { name: 'Chemistry', color: 'var(--chem-blue)', desc: 'Matter, its properties, and interactions.', icon: 'C' },
    { name: 'Medicine', color: 'var(--med-purple)', desc: 'The science of healing and healthcare.', icon: 'M' },
    { name: 'Dentistry', color: 'var(--dent-teal)', desc: 'Oral health and maxillofacial science.', icon: 'D' }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <AnimatedHeroBackground />
        
        <div className={styles.heroContent}>
          <div className={styles.badge}>A Passion Project</div>
          <h1 className={styles.title}>
            Where Science Meets <br />
            <span className={`gradient-text ${styles.heroGradient}`}>Clinical Practice</span>
          </h1>
          <p className={styles.subtitle}>
            Dive deep into the intricate molecular dances of biology and chemistry, 
            and discover how they shape modern medicine and dentistry.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="#topics" className={styles.primaryBtn}>Explore Topics</Link>
            <Link href="#articles" className={styles.secondaryBtn}>Read Latest</Link>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section id="topics" className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Disciplines</h2>
        <div className={styles.topicGrid}>
          {topics.map((topic) => (
            <div key={topic.name} className={`glass-panel ${styles.topicCard}`}>
              <div className={styles.topicIcon} style={{ color: topic.color }}>
                <div className={styles.iconCircle} style={{ borderColor: topic.color, boxShadow: `0 0 20px ${topic.color}40` }}>
                   <span className={styles.iconLetter}>{topic.icon}</span>
                </div>
              </div>
              <h3>{topic.name}</h3>
              <p>{topic.desc}</p>
              <Link href={`/${topic.name.toLowerCase()}`} className={styles.topicLink} style={{ color: topic.color }}>
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section id="articles" className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Featured Publications</h2>
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.slug} className={styles.articleCardWrapper}>
              <article className={styles.articleCard}>
                <div className={styles.articleImageContainer}>
                  <Image 
                    src={article.coverImage} 
                    alt={article.title}
                    fill
                    className={styles.articleImage}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleMeta}>
                    <span className={styles.tag} style={{ color: article.categoryColor }}>{article.category}</span>
                    <span className={styles.date}>{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
