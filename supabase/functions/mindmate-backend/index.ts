import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (action) {
      case 'get_interactions':
        const { data: interactions, error: fetchError } = await supabase
          .from('user_interactions')
          .select('*')
          .eq('session_id', data.sessionId)
          .order('created_at', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        return new Response(
          JSON.stringify({ success: true, interactions }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'get_analytics':
        const { data: analytics, error: analyticsError } = await supabase
          .from('user_interactions')
          .select(`
            sentiment_label,
            mood_selected,
            interaction_type,
            created_at
          `)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

        if (analyticsError) {
          throw analyticsError;
        }

        // Process analytics data
        const sentimentCounts = analytics.reduce((acc, item) => {
          if (item.sentiment_label) {
            acc[item.sentiment_label] = (acc[item.sentiment_label] || 0) + 1;
          }
          return acc;
        }, {});

        const moodCounts = analytics.reduce((acc, item) => {
          if (item.mood_selected) {
            acc[item.mood_selected] = (acc[item.mood_selected] || 0) + 1;
          }
          return acc;
        }, {});

        return new Response(
          JSON.stringify({ 
            success: true, 
            analytics: {
              sentimentDistribution: sentimentCounts,
              moodDistribution: moodCounts,
              totalInteractions: analytics.length,
              weeklyData: analytics
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'generate_response':
        // Simulate AI response generation based on sentiment
        const { sentiment, message } = data;
        let responses = [];
        
        if (sentiment?.label === 'CRISIS') {
          responses = [
            "I'm really concerned about what you're going through. You don't have to face this alone. Please reach out to a crisis helpline immediately.",
            "Your safety is the most important thing. Please contact emergency services or a crisis hotline immediately. You matter, and there are people who want to help you.",
          ];
        } else if (sentiment?.label === 'NEGATIVE') {
          responses = [
            "I hear you, and I can sense you're going through a tough time. That sounds really challenging.",
            "Thank you for sharing something so difficult with me. It takes courage to open up about hard feelings.",
            "I'm sorry you're feeling this way. Your emotions are completely valid.",
          ];
        } else if (sentiment?.label === 'POSITIVE') {
          responses = [
            "That's wonderful to hear! I love seeing you in such a positive space.",
            "Your positive energy is really uplifting! It sounds like things are looking up for you.",
            "I'm so glad you're feeling this way! Celebrating the good moments is so important.",
          ];
        } else {
          responses = [
            "I hear you. Sometimes okay is perfectly fine too. Is there anything specific you'd like to talk about today?",
            "Thanks for checking in. I'm here to listen to whatever is on your mind.",
            "I appreciate you sharing how you're feeling. What would be most helpful for our conversation today?",
          ];
        }

        const selectedResponse = responses[Math.floor(Math.random() * responses.length)];

        return new Response(
          JSON.stringify({ success: true, response: selectedResponse }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Unknown action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in mindmate-backend:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});