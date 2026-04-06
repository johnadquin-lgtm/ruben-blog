'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  category: 'mentalidad' | 'desarrollo' | 'vida-activa';
  image: File | null;
  imagePreview: string;
}

export default function AdminNewPost() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    content: '',
    category: 'mentalidad',
    image: null,
    imagePreview: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validar campos requeridos
      if (!formData.title.trim()) {
        throw new Error('El título es obligatorio');
      }
      if (!formData.excerpt.trim()) {
        throw new Error('El excerpt es obligatorio');
      }
      if (!formData.content.trim()) {
        throw new Error('El contenido es obligatorio');
      }
      if (!formData.image) {
        throw new Error('La imagen es obligatoria');
      }

      // Crear FormData para enviar archivos
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('excerpt', formData.excerpt);
      submitFormData.append('content', formData.content);
      submitFormData.append('category', formData.category);
      submitFormData.append('image', formData.image);

      const response = await fetch('/api/admin/create-post', {
        method: 'POST',
        body: submitFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el post');
      }

      setMessage({
        type: 'success',
        text: `¡Post creado exitosamente! 🎉 Accede en: /blog/${data.slug}`,
      });

      // Limpiar formulario
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'mentalidad',
        image: null,
        imagePreview: '',
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crear Nuevo Post</h1>
          <p className="text-lg text-gray-600">
            Rellena el formulario para crear un nuevo artículo en tu blog
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
                Imagen *
              </label>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">JPG, PNG. Máx 5MB</p>
            </div>
          </div>

          {/* Image Preview */}
          {formData.imagePreview && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-3">Vista previa de imagen:</p>
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
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : '✨ Crear Post'}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Información útil</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ El post se publicará automáticamente después de crearlo</li>
            <li>✓ Necesita imagen para aparecer en las historias de la cabecera</li>
            <li>✓ Se asignará la fecha actual automáticamente</li>
            <li>✓ El URL se generará automáticamente del título</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
