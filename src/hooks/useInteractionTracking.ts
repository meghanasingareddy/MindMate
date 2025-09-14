import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useInteractionTracking = () => {
  const sessionId = localStorage.getItem('mindmate-session-id') || (() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('mindmate-session-id', newSessionId);
    return newSessionId;
  })();

  const trackInteraction = useCallback(async (
    type: 'message' | 'mood_selection',
    content: string,
    sentiment?: {
      label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'CRISIS';
      score: number;
    },
    mood?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('user_interactions')
        .insert({
          user_id: user?.id || null,
          session_id: sessionId,
          interaction_type: type,
          content,
          sentiment_label: sentiment?.label || null,
          sentiment_score: sentiment?.score || null,
          mood_selected: mood || null,
        });

      if (error) {
        console.error('Error tracking interaction:', error);
      }
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }, [sessionId]);

  return { trackInteraction, sessionId };
};