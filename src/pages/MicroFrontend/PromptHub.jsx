import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PromptHub = () => {
  const { '*': childRouteParam } = useParams();
  const [iframePath, setIframePath] = useState(childRouteParam || '');
  const navigate = useNavigate();

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;

      if (data?.type === 'CHILD_ROUTE_CHANGE' && data.path) {
        const cleanPath = data.path.replace(/^\//, '');
        setIframePath(cleanPath);
        navigate(`/prompt-hub/${cleanPath}`, { replace: true });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <iframe
      src={`https://promt-codingofworld.vercel.app/${iframePath}`}
      className="h-screen w-full"
      title="Prompt Hub"
      style={{ border: 'none' }}
    />
  );
};

export default PromptHub;
