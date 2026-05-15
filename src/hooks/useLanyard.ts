/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LanyardData } from '../types';

export function useLanyard(userId: string) {
  const [presence, setPresence] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchPresence() {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json = await response.json();
        
        if (json.success) {
          setPresence(json.data);
        } else {
          setError(new Error(json.error?.message || 'Failed to fetch presence'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchPresence();
    const interval = setInterval(fetchPresence, 30000); // Poll every 30s

    return () => clearInterval(interval);
  }, [userId]);

  return { presence, loading, error };
}
