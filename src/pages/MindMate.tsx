import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ChatInterface } from "@/components/ChatInterface";
import { WellnessResources } from "@/components/WellnessResources";

type AppState = 'home' | 'chat' | 'wellness';

const MindMate = () => {
  const [currentView, setCurrentView] = useState<AppState>('home');

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  const handleBackHome = () => {
    setCurrentView('home');
  };

  const handleViewWellness = () => {
    setCurrentView('wellness');
  };

  if (currentView === 'chat') {
    return <ChatInterface onBack={handleBackHome} />;
  }

  if (currentView === 'wellness') {
    return <WellnessResources />;
  }

  return (
    <div className="min-h-screen">
      <Hero onStartChat={handleStartChat} />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Students Choose MindMate
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Break the silence around mental health with a judgment-free companion that's always there for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Daily Check-ins",
                description: "Quick mood tracking to understand your patterns",
                icon: "💝",
                color: "bg-pink-50 border-pink-200"
              },
              {
                title: "AI Understanding",
                description: "Sentiment analysis that responds with genuine care",
                icon: "🧠",
                color: "bg-blue-50 border-blue-200"
              },
              {
                title: "Wellness Tools",
                description: "Meditation, journaling, and calming exercises",
                icon: "🌱",
                color: "bg-green-50 border-green-200"
              },
              {
                title: "Crisis Support",
                description: "Immediate access to helplines when you need them most",
                icon: "🆘",
                color: "bg-red-50 border-red-200"
              }
            ].map((feature, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 ${feature.color} hover:shadow-soft transition-gentle group cursor-pointer`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-bounce">{feature.icon}</div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-gentle">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-calm">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            You're Not Alone in This Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Always available when you need support</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-secondary mb-2">0%</div>
              <p className="text-muted-foreground">Judgment - just compassionate listening</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground">Confidential and private conversations</p>
            </div>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-soft">
            <blockquote className="text-lg italic text-foreground mb-4">
              "MindMate helped me realize I wasn't alone. Sometimes you just need someone to listen, 
              and it was there for me at 2 AM when I couldn't sleep because of anxiety."
            </blockquote>
            <cite className="text-muted-foreground">- Sarah, College Student</cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health. MindMate is here to support you, 
            one conversation at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartChat}
              className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Start Your First Chat 💬
            </button>
            <button 
              onClick={handleViewWellness}
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary-soft/50 transition-gentle px-8 py-4 text-lg rounded-xl text-foreground"
            >
              Explore Wellness Tools 🌟
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MindMate;