import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  AlertTriangle, 
  User, 
  Calendar, 
  Pill, 
  Heart, 
  Home, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

interface AssessmentData {
  symptoms: string[];
  age: string;
  duration: string;
  additionalInfo: string;
  timestamp: string;
}

interface Diagnosis {
  condition: string;
  probability: number;
  severity: "Low" | "Medium" | "High";
  description: string;
}

const DiagnosisResults = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock AI diagnosis results based on symptoms
  const generateDiagnosis = (symptoms: string[]): Diagnosis[] => {
    const hasRespiratory = symptoms.some(s => ['cough', 'sore throat', 'shortness of breath'].includes(s.toLowerCase()));
    const hasFever = symptoms.some(s => s.toLowerCase().includes('fever'));
    const hasHeadache = symptoms.some(s => s.toLowerCase().includes('headache'));
    const hasFatigue = symptoms.some(s => s.toLowerCase().includes('fatigue'));

    if (hasRespiratory && hasFever) {
      return [
        { condition: "Upper Respiratory Infection", probability: 75, severity: "Medium", description: "Common viral infection affecting nose, throat, and sinuses" },
        { condition: "Common Cold", probability: 60, severity: "Low", description: "Mild viral infection of the upper respiratory tract" },
        { condition: "Flu (Influenza)", probability: 45, severity: "Medium", description: "Viral infection that attacks respiratory system" }
      ];
    } else if (hasHeadache && hasFatigue) {
      return [
        { condition: "Tension Headache", probability: 70, severity: "Low", description: "Most common type of headache caused by stress or muscle tension" },
        { condition: "Migraine", probability: 55, severity: "Medium", description: "Severe headache often accompanied by other symptoms" },
        { condition: "Dehydration", probability: 40, severity: "Low", description: "Insufficient fluid levels in the body" }
      ];
    } else {
      return [
        { condition: "Viral Syndrome", probability: 65, severity: "Low", description: "General viral infection with various symptoms" },
        { condition: "Stress Response", probability: 50, severity: "Low", description: "Physical symptoms related to psychological stress" },
        { condition: "Sleep Deprivation", probability: 35, severity: "Low", description: "Physical effects of insufficient sleep" }
      ];
    }
  };

  const medicines = [
    { name: "Paracetamol", dosage: "500mg every 6 hours", purpose: "Pain relief and fever reduction" },
    { name: "Ibuprofen", dosage: "400mg every 8 hours", purpose: "Anti-inflammatory and pain relief" },
    { name: "Throat Lozenges", dosage: "As needed", purpose: "Soothe throat irritation" }
  ];

  const homeRemedies = [
    "Drink plenty of warm fluids like herbal tea or warm water with honey",
    "Get adequate rest - aim for 7-8 hours of sleep",
    "Eat light, easily digestible foods like curd rice or coconut water",
    "Use a humidifier or breathe steam from hot water",
    "Gargle with warm salt water for throat relief"
  ];

  const lifestyleAdvice = [
    { icon: Clock, title: "Rest Required", description: "Take time off work/school for 2-3 days" },
    { icon: Home, title: "Stay Indoors", description: "Avoid outdoor activities until symptoms improve" },
    { icon: Users, title: "Limit Social Contact", description: "Minimize contact with others to prevent spread" },
    { icon: Heart, title: "Monitor Symptoms", description: "Track your symptoms and seek help if they worsen" }
  ];

  useEffect(() => {
    const storedData = sessionStorage.getItem('assessmentData');
    if (!storedData) {
      navigate('/symptom-assessment');
      return;
    }
    
    setAssessmentData(JSON.parse(storedData));
    // Simulate AI processing time
    setTimeout(() => setLoading(false), 2000);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-health-light">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Brain className="h-16 w-16 text-health-primary mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-health-primary mb-2">Analyzing Your Symptoms</h2>
            <p className="text-muted-foreground">Our AI is processing your information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentData) return null;

  const diagnoses = generateDiagnosis(assessmentData.symptoms);
  const primaryDiagnosis = diagnoses[0];

  return (
    <div className="min-h-screen bg-health-light">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/symptom-assessment')}
              className="border-health-primary text-health-primary hover:bg-health-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessment
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-health-primary">AI Diagnosis Results</h1>
              <p className="text-muted-foreground">Based on your symptom assessment</p>
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Assessment Summary & Diagnoses */}
            <div className="lg:col-span-2 space-y-6">
              {/* Assessment Summary */}
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-health-primary" />
                    Assessment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                      <p className="text-lg font-semibold">{assessmentData.age} years</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                      <p className="text-lg font-semibold">{assessmentData.duration}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Severity Level</Label>
                      <Badge 
                        className={`${
                          primaryDiagnosis.severity === 'High' ? 'bg-destructive' :
                          primaryDiagnosis.severity === 'Medium' ? 'bg-yellow-500' :
                          'bg-health-accent'
                        } text-white`}
                      >
                        {primaryDiagnosis.severity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground block mb-2">Reported Symptoms</Label>
                    <div className="flex flex-wrap gap-2">
                      {assessmentData.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="border-health-primary text-health-primary">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Possible Diagnoses */}
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-health-primary" />
                    Possible Diagnoses
                  </CardTitle>
                  <CardDescription>
                    AI-generated possibilities based on your symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {diagnoses.map((diagnosis, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-foreground">{diagnosis.condition}</h3>
                        <span className="text-sm font-medium text-health-primary">{diagnosis.probability}%</span>
                      </div>
                      <Progress value={diagnosis.probability} className="h-2" />
                      <p className="text-sm text-muted-foreground">{diagnosis.description}</p>
                      {index < diagnoses.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommended Medicines */}
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="h-5 w-5 mr-2 text-health-primary" />
                    Recommended Medicines
                  </CardTitle>
                  <CardDescription>
                    Over-the-counter medications that may help
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {medicines.map((medicine, index) => (
                      <div key={index} className="p-4 border rounded-lg border-border bg-health-secondary">
                        <h4 className="font-semibold text-health-primary">{medicine.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{medicine.dosage}</p>
                        <p className="text-sm">{medicine.purpose}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recommendations */}
            <div className="space-y-6">
              {/* Home Remedies */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-health-accent" />
                    Home Remedies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {homeRemedies.map((remedy, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-health-accent mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Lifestyle Advice */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-health-accent" />
                    Lifestyle Advice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lifestyleAdvice.map((advice, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <advice.icon className="h-5 w-5 text-health-accent mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">{advice.title}</h4>
                        <p className="text-xs text-muted-foreground">{advice.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Warning */}
              <Card className="shadow-card border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
                      <p className="text-sm text-yellow-700">
                        This AI assessment is for informational purposes only and should not replace professional medical advice. 
                        Please consult a healthcare provider for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12 space-x-4">
            <Button 
              onClick={() => navigate('/symptom-assessment')}
              variant="outline"
              className="border-health-primary text-health-primary hover:bg-health-light"
            >
              Take Another Assessment
            </Button>
            <Button className="bg-health-primary hover:bg-health-primary/90 text-white">
              Find Nearby Doctors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for labels
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-medium text-muted-foreground ${className}`}>{children}</label>
);

export default DiagnosisResults;