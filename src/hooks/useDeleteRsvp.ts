import { useState } from 'react';
import type { RsvpRecord } from '../pages/AdminPage';

export function useDeleteRsvp(onSuccess?: (id: number) => void) {
  const [target, setTarget] = useState<RsvpRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLocal = window.location.hostname === 'localhost';

  const handleDelete = (rsvp: RsvpRecord) => {
    setTarget(rsvp);
    setError(null);
  };

  const cancelDelete = () => {
    setTarget(null);
  };

  const confirmDelete = async () => {
    if (!target) return;

    try {
      setLoading(true);

      if (isLocal) {
        onSuccess?.(target.id);
        setTarget(null);
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/rsvp/${target.id}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error('Failed to delete RSVP');
        }

        onSuccess?.(target.id);
        setTarget(null);
      }
    } catch (err) {
      console.error(err);
      setError('Could not delete RSVP.');
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteTarget: target,
    loading,
    error,
    handleDelete,
    cancelDelete,
    confirmDelete,
  };
}
