'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

export default function StoriesHeader() {
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

  if (loading || stories.length === 0) return null;

  // Mostrar solo las primeras 8 stories en la cabecera
  const headerStories = stories.slice(0, 8);

  return (
    <section className="bg-gradient-to-b from-amber-50 to-transparent py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Historias</h2>
          <Link 
            href="/stories" 
            className="text-amber-700 hover:text-amber-900 text-sm font-medium transition-colors"
          >
            Ver todas
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {headerStories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="flex flex-col items-center gap-3 flex-shrink-0 group"
            >
              {/* Story Circle Image */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-colors shadow-md flex-shrink-0">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Story Title */}
              <p className="text-sm text-gray-700 text-center line-clamp-2 max-w-[100px] group-hover:text-amber-700 transition-colors">
                {story.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
