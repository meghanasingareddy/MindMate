import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Headphones, 
  Activity, 
  Moon, 
  Heart, 
  Sparkles,
  Clock,
  Users,
  Zap
} from "lucide-react";

export const WellnessResources = () => {
  const resources = [
    {
      category: "Meditation & Mindfulness",
      icon: <Moon className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-800",
      items: [
        {
          title: "5-Minute Breathing Space",
          description: "Quick mindful breathing to reset your day",
          duration: "5 min",
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: "Body Scan Meditation",
          description: "Release tension and find calm",
          duration: "10 min",
          icon: <Heart className="w-5 h-5" />
        },
        {
          title: "Sleep Stories",
          description: "Peaceful stories to help you drift off",
          duration: "15 min",
          icon: <Moon className="w-5 h-5" />
        }
      ]
    },
    {
      category: "Journaling & Reflection",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-800",
      items: [
        {
          title: "Daily Gratitude",
          description: "Find three things you're thankful for",
          duration: "3 min",
          icon: <Sparkles className="w-5 h-5" />
        },
        {
          title: "Emotion Check-in",
          description: "Explore and name your feelings",
          duration: "5 min",
          icon: <Heart className="w-5 h-5" />
        },
        {
          title: "Weekly Reflection",
          description: "Review your week and set intentions",
          duration: "10 min",
          icon: <Clock className="w-5 h-5" />
        }
      ]
    },
    {
      category: "Quick Mood Boosters",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-green-100 text-green-800",
      items: [
        {
          title: "Positive Affirmations",
          description: "Uplifting reminders of your worth",
          duration: "2 min",
          icon: <Sparkles className="w-5 h-5" />
        },
        {
          title: "Progressive Muscle Relaxation",
          description: "Release physical tension quickly",
          duration: "7 min",
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: "Upbeat Playlist",
          description: "Curated songs to lift your spirits",
          duration: "20 min",
          icon: <Headphones className="w-5 h-5" />
        }
      ]
    }
  ];

  const emergencyResources = [
    {
      title: "Crisis Text Line",
      description: "Text HOME to 741741",
      available: "24/7",
      type: "crisis"
    },
    {
      title: "National Suicide Prevention Lifeline",
      description: "Call 988",
      available: "24/7",
      type: "crisis"
    },
    {
      title: "Campus Counseling Center",
      description: "Free confidential support for students",
      available: "Mon-Fri 9AM-5PM",
      type: "support"
    },
    {
      title: "NAMI Support Groups",
      description: "Peer support meetings",
      available: "Weekly",
      type: "community"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Wellness Toolkit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover tools and resources to support your mental wellness journey. 
            Small steps lead to big changes.
          </p>
        </div>

        {/* Wellness Resources */}
        <div className="grid gap-8 mb-16">
          {resources.map((category, index) => (
            <Card key={index} className="p-8 shadow-soft border-0 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-calm rounded-xl">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{category.category}</h2>
                  <Badge className={category.color} variant="secondary">
                    <Users className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="p-6 hover:shadow-chat transition-gentle cursor-pointer group border border-border/50 hover:border-primary/30">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary-soft rounded-lg group-hover:bg-primary/20 transition-gentle">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-gentle">
                          {item.title}
                        </h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.duration}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <Button 
                      variant="ghost" 
                      className="w-full hover:bg-primary-soft/50 group-hover:text-primary transition-gentle"
                    >
                      Try Now
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency Resources */}
        <Card className="p-8 shadow-soft border-destructive/20 bg-destructive/5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Need Immediate Support?</h2>
            <p className="text-muted-foreground">
              If you're in crisis or need someone to talk to right now, these resources are here for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {emergencyResources.map((resource, index) => (
              <Card key={index} className="p-6 border-destructive/30 hover:shadow-soft transition-gentle">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-foreground">{resource.title}</h3>
                  <Badge 
                    variant={resource.type === 'crisis' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {resource.available}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <Button 
                  variant={resource.type === 'crisis' ? 'destructive' : 'outline'}
                  className="w-full"
                >
                  Access Resource
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-card rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Remember:</strong> MindMate is designed to support, not replace professional mental health care. 
              If you're experiencing thoughts of self-harm, please reach out to a crisis line or emergency services immediately.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};