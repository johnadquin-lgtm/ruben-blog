'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/posts';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: File | null;
  imagePreview: string;
  removeImage: boolean;
}

export default function AdminEditPost() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    content: '',
    category: 'mentalidad',
    image: null,
    imagePreview: '',
    removeImage: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar datos del post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Post no encontrado');
        }
        const posts = await response.json();
        const post = posts.find((p: Post) => p.slug === slug);
        
        if (!post) {
          throw new Error('Post no encontrado');
        }

        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'mentalidad',
          image: null,
          imagePreview: '',
          removeImage: false,
        });
        setCurrentImage(post.image || null);
      } catch (error) {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Error al cargar el post',
        });
      } finally {
        setFetching(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
        removeImage: false,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: '',
      removeImage: true,
    }));
    setCurrentImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.title.trim()) {
        throw new Error('El título es obligatorio');
      }
      if (!formData.excerpt.trim()) {
        throw new Error('El resumen es obligatorio');
      }
      if (!formData.content.trim()) {
        throw new Error('El contenido es obligatorio');
      }

      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('excerpt', formData.excerpt);
      submitFormData.append('content', formData.content);
      submitFormData.append('category', formData.category);
      
      if (formData.image) {
        submitFormData.append('image', formData.image);
      }
      
      if (formData.removeImage) {
        submitFormData.append('removeImage', 'true');
      }

      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PUT',
        body: submitFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el post');
      }

      setMessage({
        type: 'success',
        text: '¡Post actualizado exitosamente! 🎉',
      });

      // Si el slug cambió, redirigir
      if (data.slug && data.slug !== slug) {
        setTimeout(() => {
          router.push(`/admin/editar/${data.slug}`);
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error desconocido',
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Editar Post</h1>
          <p className="text-lg text-gray-600">
            Modifica los campos que necesites actualizar
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
          >
            <p className="font-semibold">{message.text}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ej: El poder del hábito diario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Máximo 100 caracteres</p>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
              Resumen (Excerpt) *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Resumen corto de 1-2 líneas que aparecerá en el listado"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.excerpt.length}/150 caracteres
            </p>
          </div>

          {/* Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="mentalidad">Mentalidad</option>
                <option value="desarrollo">Desarrollo</option>
                <option value="vida-activa">Vida Activa</option>
              </select>
            </div>

            {/* Imagen */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-900 mb-2">
                Imagen (opcional)
              </label>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="mt-1 text-xs text-gray-500">JPG, PNG. Máx 5MB. Deja vacío para mantener la actual.</p>
            </div>
          </div>

          {/* Current Image */}
          {currentImage && !formData.removeImage && !formData.imagePreview && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Imagen actual:</p>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 font-semibold transition-colors"
                >
                  ✕ Eliminar imagen
                </button>
              </div>
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={currentImage}
                  alt="Imagen actual"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Image Preview (new image) */}
          {formData.imagePreview && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-3">Nueva imagen (vista previa):</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={formData.imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Contenido */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
              Contenido *
            </label>
            <p className="text-xs text-gray-600 mb-3">
              Usa Markdown: # Título, ## Subtítulo, **negrita**, *cursiva*, - listas, etc.
            </p>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder={`# Título del Post

Párrafo introductorio aquí.

## Subtítulo

Contenido principal con **negrita** y *cursiva*.

- Punto 1
- Punto 2
- Punto 3

## Conclusión

Párrafo de cierre...`}
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.content.length} caracteres
            </p>
          </div>

          {/* Markdown Guide */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-900 mb-2">📝 Guía Markdown rápida:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
              <div>
                <code className="bg-white px-2 py-1 rounded">**texto**</code> = negrita
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded">*texto*</code> = cursiva
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded"># Título</code> = h1
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded">## Subtítulo</code> = h2
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded">- punto</code> = lista
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded">[link](url)</code> = enlace
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link
              href="/admin"
              className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
