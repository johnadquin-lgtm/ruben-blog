'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function StoriesGallery() {
  const [stories, setStories] = useState<WebStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/web-stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStories(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Cargando historias…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Todas las Historias</h1>
          <p className="text-amber-100 text-lg">
            Reflexiones breves sobre mentalidad deportiva y desarrollo personal
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Story Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm line-clamp-3 whitespace-pre-line">
                    {story.pages[0]?.text}
                  </p>
                </div>
              </div>

              {/* Story Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {story.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
