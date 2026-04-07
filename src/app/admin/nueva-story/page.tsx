'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface StoryPage {
  id: number;
  heading: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  image: File | null;
  imagePreview: string;
}

interface FormData {
  title: string;
  pages: StoryPage[];
}

export default function AdminNewStory() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    pages: [
      { id: 1, heading: '', text: '', buttonText: 'Leer más', buttonLink: '', image: null, imagePreview: '' },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
  };

  const handlePageChange = (pageIndex: number, field: keyof StoryPage, value: string) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.map((page, i) => (i === pageIndex ? { ...page, [field]: value } : page)),
    }));
  };

  const handleImageChange = (pageIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        pages: prev.pages.map((page, i) =>
          i === pageIndex
            ? { ...page, image: file, imagePreview: URL.createObjectURL(file) }
            : page
        ),
      }));
    }
  };

  const addPage = () => {
    setFormData(prev => ({
      ...prev,
      pages: [
        ...prev.pages,
        {
          id: prev.pages.length + 1,
          heading: '',
          text: '',
          buttonText: 'Leer más',
          buttonLink: '',
          image: null,
          imagePreview: '',
        },
      ],
    }));
  };

  const removePage = (pageIndex: number) => {
    if (formData.pages.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== pageIndex).map((page, i) => ({ ...page, id: i + 1 })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.title.trim()) {
        throw new Error('El título es obligatorio');
      }

      for (let i = 0; i < formData.pages.length; i++) {
        const page = formData.pages[i];
        if (!page.heading.trim()) throw new Error(`Página ${i + 1}: El título es obligatorio`);
        if (!page.text.trim()) throw new Error(`Página ${i + 1}: El texto es obligatorio`);
        if (!page.image) throw new Error(`Página ${i + 1}: La imagen es obligatoria`);
      }

      // Subir imágenes y construir story
      const pages = await Promise.all(
        formData.pages.map(async (page, idx) => {
          const imageFormData = new FormData();
          imageFormData.append('image', page.image!);

          const uploadRes = await fetch('/api/admin/upload-story-image', {
            method: 'POST',
            body: imageFormData,
          });

          if (!uploadRes.ok) {
            const err = await uploadRes.json();
            throw new Error(`Error subiendo imagen página ${idx + 1}: ${err.error}`);
          }

          const uploadData = await uploadRes.json();
          const imageUrl = uploadData.url;

          return {
            background: { type: 'image', value: imageUrl },
            elements: [
              {
                id: `h-${idx + 1}`,
                type: 'heading',
                content: page.heading,
                style: {
                  left: '50%',
                  top: '20%',
                  width: '80%',
                  transform: 'translate(-50%,-50%)',
                  fontSize: '2rem',
                  color: '#fff',
                  textAlign: 'center',
                },
              },
              {
                id: `t-${idx + 1}`,
                type: 'text',
                content: page.text,
                style: {
                  left: '50%',
                  top: '45%',
                  width: '80%',
                  transform: 'translate(-50%,-50%)',
                  fontSize: '1rem',
                  color: '#fff',
                  textAlign: 'center',
                },
              },
              {
                id: `b-${idx + 1}`,
                type: 'button',
                content: page.buttonText || 'Leer más',
                link: page.buttonLink || '#',
                style: {
                  left: '50%',
                  top: '75%',
                  transform: 'translate(-50%,-50%)',
                  background: '#667eea',
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '0.4rem 0.8rem',
                },
              },
            ],
          };
        })
      );

      // Obtener el siguiente ID
      const storiesRes = await fetch('/api/stories');
      const existingStories = await storiesRes.json();
      const nextId = existingStories.length > 0
        ? Math.max(...existingStories.map((s: any) => s.id)) + 1
        : 1;

      const story = {
        id: nextId,
        title: formData.title,
        pages,
      };

      const saveRes = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story),
      });

      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.error || 'Error al guardar la story');
      }

      setMessage({
        type: 'success',
        text: `¡Story creada exitosamente! 🎉`,
      });

      // Limpiar formulario
      setFormData({
        title: '',
        pages: [
          { id: 1, heading: '', text: '', buttonText: 'Leer más', buttonLink: '', image: null, imagePreview: '' },
        ],
      });
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📖 Crear Nueva Story</h1>
          <p className="text-lg text-gray-600">
            Crea una historia visual con múltiples páginas
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
          {/* Título de la Story */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Título de la Story *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Ej: Pilares Deportivos Invisibles"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Páginas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Páginas</h2>
              <button
                type="button"
                onClick={addPage}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-semibold text-sm"
              >
                + Añadir página
              </button>
            </div>

            {formData.pages.map((page, pageIndex) => (
              <div key={page.id} className="mb-8 p-6 border-2 border-gray-200 rounded-lg relative">
                {/* Page header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Página {page.id}</h3>
                  {formData.pages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePage(pageIndex)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      🗑️ Eliminar
                    </button>
                  )}
                </div>

                {/* Heading */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Título de la página *
                  </label>
                  <input
                    type="text"
                    value={page.heading}
                    onChange={(e) => handlePageChange(pageIndex, 'heading', e.target.value)}
                    placeholder="Título que aparecerá en la story"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Text */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Texto *
                  </label>
                  <textarea
                    value={page.text}
                    onChange={(e) => handlePageChange(pageIndex, 'text', e.target.value)}
                    placeholder="Texto descriptivo de la página (máx ~200 caracteres)"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">{page.text.length}/200 caracteres</p>
                </div>

                {/* Button text and link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Texto del botón
                    </label>
                    <input
                      type="text"
                      value={page.buttonText}
                      onChange={(e) => handlePageChange(pageIndex, 'buttonText', e.target.value)}
                      placeholder="Leer más"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      URL del enlace
                    </label>
                    <input
                      type="url"
                      value={page.buttonLink}
                      onChange={(e) => handlePageChange(pageIndex, 'buttonLink', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Imagen de fondo *
                  </label>
                  <input
                    type="file"
                    ref={(el) => { fileInputRefs.current[pageIndex] = el; }}
                    onChange={(e) => handleImageChange(pageIndex, e)}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG. Máx 5MB</p>
                </div>

                {/* Image Preview */}
                {page.imagePreview && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Vista previa:</p>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={page.imagePreview}
                        alt={`Preview página ${page.id}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
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
              {loading ? 'Creando...' : '📖 Crear Story'}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Información útil</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ La story se publicará automáticamente después de crearla</li>
            <li>✓ Puedes añadir múltiples páginas a una story</li>
            <li>✓ Cada página necesita una imagen de fondo</li>
            <li>✓ Aparecerá en la galería de /stories y en el visor /viewer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
