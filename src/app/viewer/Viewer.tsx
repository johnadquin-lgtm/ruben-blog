'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Viewer.module.css';

interface StoryElement {
  id: string;
  type: string;
  content: string;
  link?: string;
  style: Record<string, string>;
}

interface StoryPage {
  background: { type: string; value: string };
  elements: StoryElement[];
}

interface Story {
  id: number;
  title: string;
  pages: StoryPage[];
}

export default function Viewer() {
  const [stories, setStories] = useState<Story[]>([]);
  const [storyIndex, setStoryIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStories(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentStory = stories[storyIndex];
  const currentPage = currentStory?.pages[pageIndex];

  const goNextPage = useCallback(() => {
    if (!currentStory) return;
    if (pageIndex < currentStory.pages.length - 1) {
      setPageIndex(prev => prev + 1);
    } else if (storyIndex < stories.length - 1) {
      setStoryIndex(prev => prev + 1);
      setPageIndex(0);
    }
  }, [currentStory, pageIndex, storyIndex, stories.length]);

  const goPrevPage = useCallback(() => {
    if (pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    } else if (storyIndex > 0) {
      setStoryIndex(prev => prev - 1);
      const prevStory = stories[storyIndex - 1];
      setPageIndex(prevStory.pages.length - 1);
    }
  }, [pageIndex, storyIndex, stories]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrevPage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNextPage, goPrevPage]);

  if (loading) return <div className={styles.loading}>Cargando historias…</div>;
  if (!currentStory || !currentPage) return <div className={styles.loading}>No hay historias disponibles.</div>;

  const bg = currentPage.background;

  return (
    <div className={styles.viewerContainer}>
      {/* Background */}
      {bg.type === 'image' ? (
        <div
          className={styles.slideBackground}
          style={{ backgroundImage: `url(${bg.value})` }}
        />
      ) : bg.type === 'gradient' ? (
        <div className={styles.slideBackground} style={{ background: bg.value }} />
      ) : (
        <div className={styles.slideBackground} style={{ background: bg.value || '#1a1a2e' }} />
      )}

      {/* Navigation bar */}
      <div className={styles.navBar}>
        <button
          disabled={storyIndex === 0 && pageIndex === 0}
          onClick={goPrevPage}
        >
          ← Story anterior
        </button>
        <span className={styles.storyTitle}>{currentStory.title}</span>
        <button
          disabled={storyIndex === stories.length - 1 && pageIndex === currentStory.pages.length - 1}
          onClick={goNextPage}
        >
          Story siguiente →
        </button>
      </div>

      {/* Overlay with elements */}
      <div className={styles.slideOverlay}>
        {currentPage.elements.map(el => {
          if (el.type === 'heading') {
            return (
              <h1 key={el.id} className={styles.slideHeading}>
                {el.content}
              </h1>
            );
          }
          if (el.type === 'text') {
            return (
              <p key={el.id} className={styles.slideText}>
                {el.content}
              </p>
            );
          }
          if (el.type === 'button') {
            return (
              <a
                key={el.id}
                href={el.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.slideButton}
              >
                {el.content}
              </a>
            );
          }
          return null;
        })}
      </div>

      {/* Tap areas */}
      <div className={`${styles.tapArea} ${styles.tapAreaLeft}`} onClick={goPrevPage}>
        <span className={styles.tapArrow}>‹</span>
      </div>
      <div className={`${styles.tapArea} ${styles.tapAreaRight}`} onClick={goNextPage}>
        <span className={styles.tapArrow}>›</span>
      </div>

      {/* Page indicators */}
      <div className={styles.pageIndicators}>
        {currentStory.pages.map((_, i) => (
          <div
            key={i}
            className={`${styles.indicator} ${i === pageIndex ? styles.active : ''}`}
          />
        ))}
      </div>

      {/* Story navigation buttons */}
      <div className={styles.storyNavButtons}>
        <button
          className={styles.navButtonPrev}
          disabled={storyIndex === 0 && pageIndex === 0}
          onClick={goPrevPage}
          title="Anterior"
        >
          <span className={styles.navArrow}>◀</span>
          <span className={styles.navLabel}>Anterior</span>
        </button>
        <button
          className={styles.navButtonNext}
          disabled={storyIndex === stories.length - 1 && pageIndex === currentStory.pages.length - 1}
          onClick={goNextPage}
          title="Siguiente"
        >
          <span className={styles.navLabel}>Siguiente</span>
          <span className={styles.navArrow}>▶</span>
        </button>
      </div>

      {/* Story thumbnails */}
      {stories.length > 1 && (
        <div className={styles.storySelector}>
          {stories.map((s, i) => {
            const firstImg = s.pages.find(p => p.background.type === 'image')?.background.value;
            return (
              <div
                key={s.id}
                className={`${styles.storyThumb} ${i === storyIndex ? styles.active : ''}`}
                onClick={() => { setStoryIndex(i); setPageIndex(0); }}
                title={s.title}
              >
                {firstImg ? (
                  <img src={firstImg} alt={s.title} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#333' }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
