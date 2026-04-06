'use client';

import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface MarkdownProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownProps) {
  return (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="text-gray-700 mb-4 leading-7">{children}</p>,
          h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-3 mt-4">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-bold text-gray-700 mb-2 mt-3">{children}</h4>,
          h5: ({ children }) => <h5 className="font-bold text-gray-700 mb-2 mt-2">{children}</h5>,
          h6: ({ children }) => <h6 className="font-bold text-gray-600 mb-2 mt-2">{children}</h6>,
          ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-gray-700">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-600 pl-4 py-2 my-4 text-gray-600 italic bg-amber-50 rounded">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                <code className="font-mono text-sm">{children}</code>
              </pre>
            );
          },
          pre: ({ children }) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <div className="relative w-full h-full my-6 rounded-lg overflow-hidden">
                {typeof src === 'string' ? (
                  <Image
                    src={src}
                    alt={alt || 'Imagen del artículo'}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                ) : (
                  <img
                    src={src as any}
                    alt={alt || 'Imagen del artículo'}
                    className="w-full h-auto"
                  />
                )}
              </div>
            );
          },
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-amber-700 hover:text-amber-900 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
          hr: () => <hr className="my-8 border-gray-300" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
