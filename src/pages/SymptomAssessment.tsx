import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, Clock, Thermometer, X } from "lucide-react";

const SymptomAssessment = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const commonSymptoms = [
    "Fever", "Headache", "Cough", "Sore throat", "Fatigue", "Nausea", 
    "Dizziness", "Chest pain", "Abdominal pain", "Joint pain", "Rash", "Shortness of breath"
  ];

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store assessment data in sessionStorage for the results page
    const assessmentData = {
      symptoms,
      age,
      duration,
      additionalInfo,
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem('assessmentData', JSON.stringify(assessmentData));
    navigate('/diagnosis-results');
  };

  return (
    <div className="min-h-screen bg-health-light">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 text-health-primary mr-4" />
              <h1 className="text-4xl font-bold text-health-primary">AI Symptom Assessment</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your symptoms and get personalized health insights powered by AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Symptoms Input */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Thermometer className="h-5 w-5 mr-2 text-health-primary" />
                    Current Symptoms
                  </CardTitle>
                  <CardDescription>
                    Add your symptoms one by one or select from common symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter a symptom..."
                      value={currentSymptom}
                      onChange={(e) => setCurrentSymptom(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptom(currentSymptom))}
                    />
                    <Button 
                      type="button" 
                      onClick={() => addSymptom(currentSymptom)}
                      className="bg-health-primary hover:bg-health-primary/90"
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Quick add common symptoms:</Label>
                    <div className="flex flex-wrap gap-2">
                      {commonSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="outline"
                          className="cursor-pointer hover:bg-health-primary hover:text-white transition-colors"
                          onClick={() => addSymptom(symptom)}
                        >
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {symptoms.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Your symptoms:</Label>
                      <div className="flex flex-wrap gap-2">
                        {symptoms.map((symptom) => (
                          <Badge key={symptom} className="bg-health-accent text-white">
                            {symptom}
                            <X 
                              className="h-3 w-3 ml-1 cursor-pointer" 
                              onClick={() => removeSymptom(symptom)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-health-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Help us provide more accurate results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="1"
                      max="120"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration of Symptoms</Label>
                    <Select value={duration} onValueChange={setDuration} required>
                      <SelectTrigger>
                        <SelectValue placeholder="How long have you had these symptoms?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">A few hours</SelectItem>
                        <SelectItem value="1-day">1 day</SelectItem>
                        <SelectItem value="2-3-days">2-3 days</SelectItem>
                        <SelectItem value="week">About a week</SelectItem>
                        <SelectItem value="weeks">Several weeks</SelectItem>
                        <SelectItem value="months">Several months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-health-primary" />
                  Additional Information
                </CardTitle>
                <CardDescription>
                  Any other details that might be relevant (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe any additional symptoms, recent activities, medications, or concerns..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                className="px-12 py-6 text-lg bg-gradient-primary hover:opacity-90 text-white shadow-hero"
                disabled={symptoms.length === 0 || !age || !duration}
              >
                <Brain className="h-5 w-5 mr-2" />
                Get AI Diagnosis
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                This is not a substitute for professional medical advice
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SymptomAssessment;