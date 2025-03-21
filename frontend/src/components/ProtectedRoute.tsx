
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  
  // Only show loading state for a maximum of 3 seconds to prevent endless loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // If still in initial loading state and within the timeout period, show loader
  if (loading && showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-glucotrack-blue" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific role(s) are required, check if user has the necessary role
  if (requiredRole) {
    const requiredRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    if (!userRole || !requiredRoles.includes(userRole.toLowerCase())) {
      // Redirect to their appropriate dashboard based on role
      const dashboardRoute = getDashboardByRole(userRole || "patient");
      return <Navigate to={dashboardRoute} replace />;
    }
  }

  return <>{children}</>;
};

// Helper function to determine dashboard route based on user role
const getDashboardByRole = (role: string): string => {
  switch (role.toLowerCase()) {
    case "doctor":
      return "/doctor-dashboard";
    case "researcher":
      return "/researcher-dashboard";
    case "patient":
    default:
      return "/patient-dashboard";
  }
};

export default ProtectedRoute;
