import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug, articles } from '@/lib/articles';
import styles from './page.module.css';

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const MarkdownComponents = {
    // Custom paragraph renderer for drop caps and text formatting
    p: ({ children, node }) => {
      // Don't wrap images in <p> tags — check AST node children for img elements
      const hasImage = node?.children?.some(child => child.tagName === 'img');
      if (hasImage) {
        return <>{children}</>;
      }
      return <p className={styles.paragraph}>{children}</p>
    },
    // Custom blockquote for pull quotes
    blockquote: (quote) => {
      return (
        <blockquote className={styles.pullQuote}>
          {quote.children}
        </blockquote>
      )
    },
    // Custom image renderer
    img: (image) => {
      return (
        <figure className={styles.inlineFigure}>
          <div className={styles.inlineImageWrapper}>
            <Image
              src={image.src}
              alt={image.alt || 'Scientific illustration'}
              fill
              className={styles.inlineImage}
            />
          </div>
          {image.alt && <figcaption className={styles.caption}>{image.alt}</figcaption>}
        </figure>
      );
    }
  };

  return (
    <div className={styles.articleContainer}>
      <div className={styles.heroImageContainer}>
        <Image 
          src={article.coverImage} 
          alt={article.title}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
      </div>

      <article className={`container ${styles.contentWrapper}`}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>&larr; Back to Home</Link>
          <div className={styles.meta}>
            <span className={styles.tag} style={{ color: article.categoryColor }}>{article.category}</span>
            <span className={styles.date}>{article.date}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
        </header>

        <div className={styles.markdownBody}>
          <ReactMarkdown components={MarkdownComponents}>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
