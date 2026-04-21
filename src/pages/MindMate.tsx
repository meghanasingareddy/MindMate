import { useState } from "react";
import { Shield, Sparkles, HeartPulse, MessagesSquare } from "lucide-react";
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
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Why Students Choose MindMate
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Break the silence around mental health with a judgment-free companion that's always there for you, offering intelligent insights and genuine care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Always-On Support",
                description: "Access a judgment-free listener 24/7. MindMate is available through the hardest nights and the busiest days, offering steady, reliable support during exam seasons.",
                icon: MessagesSquare,
                color: "from-blue-500/20 to-transparent",
                iconColor: "text-blue-500",
                bg: "bg-blue-50 dark:bg-blue-950/20"
              },
              {
                title: "Emotional Intelligence",
                description: "Driven by advanced sentiment analysis, MindMate actively adapts to your feelings, responding with the exact type of empathy and care you need.",
                icon: Sparkles,
                color: "from-purple-500/20 to-transparent",
                iconColor: "text-purple-500",
                bg: "bg-purple-50 dark:bg-purple-950/20"
              },
              {
                title: "Holistic Wellness Toolkit",
                description: "Beyond just chatting, get direct access to breathing exercises, guided meditations, and journaling prompts tailored specifically for student stress.",
                icon: HeartPulse,
                color: "from-emerald-500/20 to-transparent",
                iconColor: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-950/20"
              },
              {
                title: "Absolute Privacy & Security",
                description: "Your mental health journey is entirely your own. End-to-end encryption ensures that your check-ins and conversations remain completely confidential.",
                icon: Shield,
                color: "from-rose-500/20 to-transparent",
                iconColor: "text-rose-500",
                bg: "bg-rose-50 dark:bg-rose-950/20"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-soft transition-all duration-500 cursor-default"
              >
                {/* Glow effect on hover */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bg} group-hover:scale-[1.05] transition-transform duration-500 border border-border/50`}>
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
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
              Start Your First Chat
            </button>
            <button 
              onClick={handleViewWellness}
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary-soft/50 transition-gentle px-8 py-4 text-lg rounded-xl text-foreground"
            >
              Explore Wellness Tools
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MindMate;