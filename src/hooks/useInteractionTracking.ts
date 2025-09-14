import { useCallback } from 'react';

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
      // For now, just log interactions locally
      console.log('Tracking interaction:', {
        type,
        content,
        sentiment,
        mood,
        sessionId,
        timestamp: new Date().toISOString()
      });
      
      // Store in localStorage for demo purposes
      const interactions = JSON.parse(localStorage.getItem('mindmate-interactions') || '[]');
      interactions.push({
        id: Date.now(),
        session_id: sessionId,
        interaction_type: type,
        content,
        sentiment_label: sentiment?.label || null,
        sentiment_score: sentiment?.score || null,
        mood_selected: mood || null,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('mindmate-interactions', JSON.stringify(interactions));
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }, [sessionId]);

  return { trackInteraction, sessionId };
};