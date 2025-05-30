import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PremiumCourses = () => {
  const { '*': childRouteParam } = useParams(); // wildcdfard param
  const [iframePath, setIframePath] = useState(childRouteParam || '');
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;

      if (data?.type === 'CHILD_ROUTE_CHANGE') {
        const cleanPath = data.path.replace(/^\//, '');
        setIframePath(cleanPath);
        navigate(`/premium-courses/${cleanPath}`, { replace: true });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div>
      <iframe
        src={`https://codingofworld-v2-coursemodule-frontend.vercel.app/${iframePath}`}
        className='h-screen'
        width="100%"
        title="Course Component"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PremiumCourses;
