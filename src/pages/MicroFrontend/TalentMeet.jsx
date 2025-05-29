import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TalentMeet = () => {
  const { '*': childRouteParam } = useParams();
  const [iframePath, setIframePath] = useState(childRouteParam || '');
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;

      if (data?.type === 'CHILD_ROUTE_CHANGE') {
        const cleanPath = data.path.replace(/^\//, '');
        setIframePath(cleanPath);
        navigate(`/talent-meet/${cleanPath}`, { replace: true });
      }
    };
// sdfs
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div>
      <iframe
        src={`https://talent-meet-cow.vercel.app/${iframePath}`}
        className="h-screen"
        width="100%"
        title="Talent Meet Component"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default TalentMeet;
