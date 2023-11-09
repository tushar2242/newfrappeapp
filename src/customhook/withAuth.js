import Loader from '@/helpers/Loader';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// This is the HOC
const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const api_key = localStorage.getItem('api_key');
      const api_secret = localStorage.getItem('api_secret');

      // Check if the user's credentials are present
      if (api_key && api_secret) {
        setIsAuthenticated(true);
      } else {
        Router.push('/'); // Redirect to login if not authenticated
      }
    }, [Router]);

    // If authenticated, render the wrapped component with all its props
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // Optional: Render a fallback or a loading indicator while checking for auth
    return <div><Loader /></div>;
  };
};

export default withAuth;
