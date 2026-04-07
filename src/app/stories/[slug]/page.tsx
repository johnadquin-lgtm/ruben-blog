'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import styles from './StoryViewer.module.css';

interface StoryPage {
  image: string;
  text: string;
}

interface WebStory {
  id: number;
  title: string;
  slug: string;
  image: string;
  url: string;
  pages: StoryPage[];
}

const AUTO_ADVANCE_MS = 8000;

export default function StoryViewer() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [stories, setStories] = useState<WebStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    fetch('/api/web-stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStories(data);
          const idx = data.findIndex((s: WebStory) => s.slug === slug);
          if (idx >= 0) setCurrentIndex(idx);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getBgColor = (imageUrl: string): string => {
    if (imageUrl.includes('PRODUCTIVIDAD')) return '#1a1a2e';
    if (imageUrl.includes('pexels-pixabay-416717')) return '#1e3a2f';
    if (imageUrl.includes('pexels-pixabay-47730')) return '#2d1b3d';
    if (imageUrl.includes('pexels-pixabay-159577')) return '#1a2a3a';
    if (imageUrl.includes('pexels-maumascaro')) return '#2a1a1a';
    if (imageUrl.includes('pexels-betosval')) return '#1a2a1a';
    if (imageUrl.includes('pexels-jesuszecuaphoto')) return '#1a1a2e';
    if (imageUrl.includes('pexels-todd-trapani')) return '#2a2a1a';
    return '#111118';
  };

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    startTimeRef.current = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(100, (elapsed / AUTO_ADVANCE_MS) * 100));
    }, 50);
    timerRef.current = setTimeout(() => {
      goNext();
    }, AUTO_ADVANCE_MS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, stories.length]);

  const goNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, stories.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(stories.length - 1);
    }
  }, [currentIndex, stories.length]);

  useEffect(() => {
    if (stories.length > 0) {
      resetTimer();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, stories.length, resetTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        router.push('/stories');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, router]);

  if (loading) {
    return <div className={styles.loading}>Cargando historia…</div>;
  }

  if (stories.length === 0) {
    return <div className={styles.loading}>No hay historias disponibles.</div>;
  }

  const story = stories[currentIndex];
  const page = story.pages[0];
  const bgColor = getBgColor(page.image);

  return (
    <div className={styles.viewerContainer} style={{ backgroundColor: bgColor }}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button onClick={goPrev}>← Anterior</button>
        <span className={styles.storyTitle}>{story.title}</span>
        <Link href="/stories" className={styles.galleryLink}>Galería</Link>
        <button onClick={goNext}>Siguiente →</button>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* Story card - vertical, centered */}
      <div className={styles.storyCard}>
        <Image
          src={page.image}
          alt={story.title}
          fill
          className={styles.storyImage}
          priority
          sizes="(max-width: 420px) 90vw, 420px"
        />
        <div className={styles.storyOverlay}>
          <p className={styles.storyText}>{page.text}</p>
        </div>

        {/* Tap areas */}
        <div className={`${styles.tapArea} ${styles.tapAreaLeft}`} onClick={goPrev}>
          <span className={styles.tapArrow}>‹</span>
        </div>
        <div className={`${styles.tapArea} ${styles.tapAreaRight}`} onClick={goNext}>
          <span className={styles.tapArrow}>›</span>
        </div>
      </div>

      {/* Bottom indicators */}
      <div className={styles.indicators}>
        {stories.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
