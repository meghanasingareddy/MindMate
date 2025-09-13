import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Send, RotateCcw, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSentimentAnalysis } from "@/hooks/useSentimentAnalysis";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mindmate';
  timestamp: Date;
  mood?: string;
  sentiment?: {
    label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'CRISIS';
    score: number;
  };
}

export const ChatInterface = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm MindMate 🌟 I'm here to listen and support you. How are you feeling today?",
      sender: 'mindmate',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { analyzeSentiment } = useSentimentAnalysis();

  const moodOptions = [
    { emoji: "😊", label: "Great", color: "bg-green-100 text-green-800" },
    { emoji: "😌", label: "Okay", color: "bg-blue-100 text-blue-800" },
    { emoji: "😔", label: "Down", color: "bg-orange-100 text-orange-800" },
    { emoji: "😰", label: "Anxious", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "😢", label: "Sad", color: "bg-purple-100 text-purple-800" },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Analyze sentiment of user message
    const sentiment = await analyzeSentiment(inputValue);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      sentiment,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Generate AI response based on sentiment
    setTimeout(() => {
      let responses: string[] = [];
      
      if (sentiment.label === 'CRISIS') {
        responses = [
          "I'm really concerned about what you're going through. You don't have to face this alone. Please reach out to a crisis helpline immediately - they have trained professionals who can help you right now.",
          "Your safety is the most important thing. Please contact emergency services or a crisis hotline immediately. You matter, and there are people who want to help you through this.",
        ];
      } else if (sentiment.label === 'NEGATIVE') {
        responses = [
          "I hear you, and I can sense you're going through a tough time. That sounds really challenging. Can you tell me more about what's been weighing on your mind?",
          "Thank you for sharing something so difficult with me. It takes courage to open up about hard feelings. You're not alone in this.",
          "I'm sorry you're feeling this way. Your emotions are completely valid. What would feel most helpful for you right now?",
          "That sounds really hard to deal with. Remember, difficult feelings don't last forever. Would you like to try a quick breathing exercise together?",
        ];
      } else if (sentiment.label === 'POSITIVE') {
        responses = [
          "That's wonderful to hear! I love seeing you in such a positive space. What's been going well for you recently?",
          "Your positive energy is really uplifting! It sounds like things are looking up for you. Tell me more about what's making you feel good.",
          "I'm so glad you're feeling this way! Celebrating the good moments is so important. What's bringing you joy today?",
        ];
      } else {
        responses = [
          "I hear you. Sometimes okay is perfectly fine too. Is there anything specific you'd like to talk about today?",
          "Thanks for checking in. I'm here to listen to whatever is on your mind, big or small.",
          "I appreciate you sharing how you're feeling. What would be most helpful for our conversation today?",
        ];
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'mindmate',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleMoodSelect = (mood: string) => {
    const moodMessage: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${mood.toLowerCase()} today`,
      sender: 'user',
      timestamp: new Date(),
      mood: mood.toLowerCase(),
    };

    setMessages(prev => [...prev, moodMessage]);
    
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for sharing how you're feeling. ${mood === 'Great' ? 'That\'s wonderful to hear! What\'s been going well for you?' : mood === 'Okay' ? 'Sometimes okay is perfectly fine. Is there anything specific you\'d like to talk about?' : 'I\'m sorry you\'re having a tough time. I\'m here to support you through this. What\'s been weighing on your mind?'}`,
        sender: 'mindmate',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border/50 p-4 shadow-soft z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-primary-soft/50"
            >
              <RotateCcw className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-calm rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">MindMate</h1>
                <p className="text-sm text-muted-foreground">Always here to listen</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Help
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quick Mood Check */}
          <Card className="p-6 bg-gradient-calm border-0 shadow-soft">
            <h3 className="font-semibold mb-4 text-center">Quick Mood Check</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {moodOptions.map((mood) => (
                <Badge
                  key={mood.label}
                  variant="secondary"
                  className={`cursor-pointer hover:scale-105 transition-bounce px-4 py-2 ${mood.color} hover:shadow-chat`}
                  onClick={() => handleMoodSelect(mood.label)}
                >
                  {mood.emoji} {mood.label}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`max-w-lg p-4 shadow-chat ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.sentiment && message.sender === 'user' && (
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 text-xs ${
                        message.sentiment.label === 'CRISIS' ? 'bg-destructive/20 text-destructive' :
                        message.sentiment.label === 'NEGATIVE' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                        message.sentiment.label === 'POSITIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.sentiment.label.toLowerCase()} • {Math.round(message.sentiment.score * 100)}%
                    </Badge>
                  )}
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </Card>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <Card className="p-4 bg-card shadow-chat">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">MindMate is typing...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 p-4 shadow-soft">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share what's on your mind..."
              className="flex-1 border-primary/30 focus:border-primary rounded-xl px-4 py-3"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-gentle rounded-xl px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};