import { useState, useEffect } from 'react';

// Simple keyword-based sentiment analysis for demo
// In production, you'd use @huggingface/transformers for real ML analysis
export const useSentimentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSentiment = async (text: string): Promise<{
    label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'CRISIS';
    score: number;
  }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const lowerText = text.toLowerCase();
    
    // Crisis keywords detection
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm',
      'want to die', 'no point living', 'can\'t go on', 'hopeless'
    ];
    
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      setIsLoading(false);
      return { label: 'CRISIS', score: 0.95 };
    }
    
    // Negative sentiment keywords
    const negativeKeywords = [
      'sad', 'depressed', 'anxious', 'worried', 'stressed', 'overwhelmed',
      'lonely', 'tired', 'exhausted', 'frustrated', 'angry', 'upset',
      'awful', 'terrible', 'horrible', 'bad', 'worst'
    ];
    
    // Positive sentiment keywords
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
  };

  return { analyzeSentiment, isLoading };
};