import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeartHandshake, ChevronDown, Menu, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: "Medicine",
      items: [
        { name: "Prescriptions", href: "/prescriptions" },
        { name: "Drug Information", href: "/drug-info" },
        { name: "Pharmacy Locator", href: "/pharmacy" },
      ]
    },
    {
      name: "Precaution",
      items: [
        { name: "Health Tips", href: "/health-tips" },
        { name: "Prevention Guidelines", href: "/prevention" },
        { name: "Safety Measures", href: "/safety" },
      ]
    },
    {
      name: "Hospitals",
      items: [
        { name: "Find Hospitals", href: "/hospitals" },
        { name: "Emergency Care", href: "/emergency" },
        { name: "Specialist Directory", href: "/specialists" },
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <HeartHandshake className="h-8 w-8 text-health-primary" />
            <div>
              <span className="text-xl font-bold text-health-primary">Cura Gennie</span>
              <div className="text-xs text-muted-foreground">Your Health Buddy</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-health-primary transition-colors">
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border-border shadow-elevated">
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link 
                        to={subItem.href}
                        className="w-full cursor-pointer hover:bg-health-secondary"
                      >
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/symptom-assessment">
              <Button variant="outline" className="border-health-primary text-health-primary hover:bg-health-light">
                Check Symptoms
              </Button>
            </Link>
            <Button className="bg-health-accent hover:bg-health-accent/90 text-white">
              <User className="h-4 w-4 mr-2" />
              Login / Sign Up
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Link to="/symptom-assessment" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-health-primary hover:bg-health-primary/90">
                    Check Symptoms
                  </Button>
                </Link>
                
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <h3 className="font-semibold text-health-primary">{item.name}</h3>
                    <div className="pl-4 space-y-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Button className="w-full bg-health-accent hover:bg-health-accent/90 text-white mt-6">
                  <User className="h-4 w-4 mr-2" />
                  Login / Sign Up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;