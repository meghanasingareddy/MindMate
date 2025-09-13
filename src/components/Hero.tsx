import { Button } from "@/components/ui/button";
import heroImage from "@/assets/mindmate-hero.jpg";

export const Hero = ({ onStartChat }: { onStartChat: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                MindMate
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/80 font-medium">
                Your safe space, your AI bestie — here to listen, support, and uplift you.
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Mental health struggles are real, but you don't have to face them alone. 
              MindMate is your judgment-free companion, ready to chat whenever you need support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={onStartChat}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Start Chatting 💬
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary-soft/50 transition-gentle px-8 py-6 text-lg rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-calm rounded-3xl blur-xl opacity-30" />
              <img 
                src={heroImage} 
                alt="Peaceful mental wellness illustration with chat elements" 
                className="relative rounded-3xl shadow-soft max-w-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-soft rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-accent-soft rounded-full opacity-40 animate-bounce" />
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-secondary-soft rounded-full opacity-50" />
    </section>
  );
};