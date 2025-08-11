import { Link, useLocation } from "wouter";
import { Brain, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavigationHeader() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", current: location === "/" },
    { name: "Fighters", href: "/fighters", current: location === "/fighters" },
    { name: "Analysis", href: "/analysis", current: location === "/analysis" },
  ];

  return (
    <nav className="bg-surface shadow-sm border-b border-gray-200" data-testid="navigation-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
              <Brain className="text-primary text-2xl h-8 w-8" />
              <span className="text-xl font-bold text-primary">FightIQ</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                  data-testid={`link-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="flex items-center space-x-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"
                alt="Coach Profile"
                className="w-8 h-8 rounded-full"
                data-testid="img-profile"
              />
              <span className="text-sm font-medium text-gray-700" data-testid="text-username">
                Coach Martinez
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
