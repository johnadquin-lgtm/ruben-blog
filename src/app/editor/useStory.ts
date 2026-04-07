'use client';

import { useState, useEffect } from 'react';

export interface StoryElement {
  id: string;
  type: string;
  content: string;
  link?: string;
  style: Record<string, string>;
}

export interface StoryPage {
  background: { type: string; value: string };
  elements: StoryElement[];
}

export interface Story {
  id: number;
  title: string;
  pages: StoryPage[];
  currentPage?: number;
}

export function useStory() {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStory({ ...data[0], currentPage: 0 });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!story) return;
    try {
      await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story),
      });
      alert('Story guardada!');
    } catch {
      alert('Error al guardar');
    }
  };

  return { story, setStory, save, loading };
}
