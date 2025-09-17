import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Brain, 
  Heart, 
  Shield, 
  Users,
  ArrowRight,
  TrendingUp,
  Stethoscope
} from "lucide-react";

// Import images
import heroImage from "@/assets/hero-healthcare.jpg";
import telemedicineImage from "@/assets/article-telemedicine.jpg";
import aiHealthcareImage from "@/assets/article-ai-healthcare.jpg";
import mentalHealthImage from "@/assets/article-mental-health.jpg";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const articles = [
    {
      id: 1,
      title: "The Telemedicine Revolution: Healthcare at Your Fingertips",
      excerpt: "Discover how digital health consultations are transforming patient care and making healthcare more accessible than ever.",
      category: "Digital Health",
      readTime: "5 min read",
      date: "2024-01-15",
      image: telemedicineImage,
      trending: true
    },
    {
      id: 2,
      title: "AI in Healthcare: Transforming Diagnosis and Treatment",
      excerpt: "Explore how artificial intelligence is revolutionizing medical diagnosis, drug discovery, and personalized treatment plans.",
      category: "AI & Medicine",
      readTime: "7 min read",
      date: "2024-01-12",
      image: aiHealthcareImage,
      trending: true
    },
    {
      id: 3,
      title: "Mental Health Matters: A Comprehensive Guide to Wellness",
      excerpt: "Understanding the importance of mental health and practical strategies for maintaining psychological well-being.",
      category: "Mental Health",
      readTime: "6 min read",
      date: "2024-01-10",
      image: mentalHealthImage,
      trending: false
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Get instant health insights using our advanced AI symptom checker"
    },
    {
      icon: Stethoscope,
      title: "Expert Consultation",
      description: "Connect with certified healthcare professionals worldwide"
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description: "Stay ahead with personalized health recommendations"
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Track your health metrics and progress over time"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Healthcare professionals with digital technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-health-primary/90 to-health-primary/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Latest in Healthcare
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Stay informed with the latest medical insights, research breakthroughs, 
              and healthcare innovations. Your journey to better health starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/symptom-assessment">
                <Button size="lg" className="bg-health-accent hover:bg-health-accent/90 text-white shadow-hero">
                  <Brain className="h-5 w-5 mr-2" />
                  Check Your Symptoms
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-health-primary">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Health Insights
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Articles Carousel */}
      <section className="py-16 bg-health-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-health-primary mb-4">Trending Health Articles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest trends and breakthroughs in healthcare and medical research
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-elevated">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {articles.map((article) => (
                  <div key={article.id} className="w-full flex-shrink-0">
                    <Card className="h-96 relative overflow-hidden border-none">
                      <div className="absolute inset-0">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>
                      
                      <CardContent className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-health-accent text-white">
                            {article.category}
                          </Badge>
                          {article.trending && (
                            <Badge variant="outline" className="border-white text-white">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-white/90 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-white/80 text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur border-white hover:bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur border-white hover:bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-health-primary' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-health-primary mb-4">Why Choose Cura Gennie?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted health companion powered by advanced AI and medical expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-health-light rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-health-primary" />
                  </div>
                  <CardTitle className="text-xl text-health-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Users className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of users who trust Cura Gennie for their healthcare needs. 
            Get personalized health insights and connect with medical professionals today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/symptom-assessment">
              <Button size="lg" className="bg-white text-health-primary hover:bg-white/90 shadow-hero">
                <Brain className="h-5 w-5 mr-2" />
                Start Symptom Assessment
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-health-primary">
              <Heart className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-health-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 mr-2" />
              <div>
                <span className="text-2xl font-bold">Cura Gennie</span>
                <div className="text-sm text-white/80">Your Health Buddy</div>
              </div>
            </div>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Empowering individuals with AI-driven health insights and connecting them with healthcare professionals worldwide.
            </p>
            <div className="text-sm text-white/60">
              © 2024 Cura Gennie. All rights reserved. | This platform is for informational purposes only and should not replace professional medical advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;