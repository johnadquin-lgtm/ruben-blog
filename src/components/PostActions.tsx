'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostActionsProps {
  slug: string;
}

export default function PostActions({ slug }: PostActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al eliminar');
      }

      // Recargar la página
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al eliminar el post');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Link
        href={`/admin/editar/${slug}`}
        className="text-blue-700 hover:text-blue-900 font-medium"
      >
        Editar ✏️
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-red-700 hover:text-red-900 font-medium disabled:opacity-50"
      >
        {deleting ? 'Eliminando...' : 'Eliminar 🗑️'}
      </button>
    </div>
  );
}
