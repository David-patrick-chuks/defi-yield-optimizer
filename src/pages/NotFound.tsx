
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
            <Shield className="h-10 w-10 text-sage-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-slate-800">404</h1>
        <p className="text-xl text-slate-600 mb-6">This page couldn't be found</p>
        <p className="text-slate-500 mb-8">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="gradient-bg-secondary">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
