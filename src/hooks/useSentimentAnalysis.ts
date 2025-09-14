import { useState } from 'react';
import { pipeline } from '@huggingface/transformers';

export const useSentimentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classifier, setClassifier] = useState<any>(null);

  const initializeModel = async () => {
    if (!classifier) {
      try {
        const sentimentPipeline = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        setClassifier(sentimentPipeline);
        return sentimentPipeline;
      } catch (error) {
        console.error('Failed to initialize sentiment model:', error);
        // Fallback to keyword-based analysis
        return null;
      }
    }
    return classifier;
  };

  const analyzeSentiment = async (text: string): Promise<{
    label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'CRISIS';
    score: number;
  }> => {
    setIsLoading(true);
    
    try {
      const lowerText = text.toLowerCase();
      
      // Crisis keywords detection (always check first)
      const crisisKeywords = [
        'suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm',
        'want to die', 'no point living', 'can\'t go on', 'hopeless',
        'suicidal', 'harm myself', 'not worth living'
      ];
      
      if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
        setIsLoading(false);
        return { label: 'CRISIS', score: 0.95 };
      }

      // Try to use Hugging Face model
      const model = await initializeModel();
      if (model) {
        const result = await model(text);
        const prediction = Array.isArray(result) ? result[0] : result;
        
        let label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' = 'NEUTRAL';
        let score = prediction.score;

        if (prediction.label === 'POSITIVE' && score > 0.6) {
          label = 'POSITIVE';
        } else if (prediction.label === 'NEGATIVE' && score > 0.6) {
          label = 'NEGATIVE';
        } else {
          label = 'NEUTRAL';
          score = 0.5;
        }
        
        setIsLoading(false);
        return { label, score };
      }

      // Fallback to keyword-based analysis
      const negativeKeywords = [
        'sad', 'depressed', 'anxious', 'worried', 'stressed', 'overwhelmed',
        'lonely', 'tired', 'exhausted', 'frustrated', 'angry', 'upset',
        'awful', 'terrible', 'horrible', 'bad', 'worst'
      ];
      
      const positiveKeywords = [
        'happy', 'great', 'wonderful', 'amazing', 'good', 'better',
        'excited', 'proud', 'grateful', 'thankful', 'love', 'excellent',
        'fantastic', 'awesome', 'brilliant', 'perfect'
      ];
      
      const negativeCount = negativeKeywords.filter(keyword => lowerText.includes(keyword)).length;
      const positiveCount = positiveKeywords.filter(keyword => lowerText.includes(keyword)).length;
      
      setIsLoading(false);
      
      if (positiveCount > negativeCount) {
        return { label: 'POSITIVE', score: Math.min(0.6 + (positiveCount * 0.1), 0.95) };
      } else if (negativeCount > positiveCount) {
        return { label: 'NEGATIVE', score: Math.min(0.6 + (negativeCount * 0.1), 0.95) };
      } else {
        return { label: 'NEUTRAL', score: 0.5 };
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setIsLoading(false);
      return { label: 'NEUTRAL', score: 0.5 };
    }
  };

  return { analyzeSentiment, isLoading };
};