import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PromptHub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subPath = location.pathname.startsWith('/prompt-hub')
    ? location.pathname.substring('/prompt-hub'.length)
    : '';

  console.log("iframe src:", `https://promt-codingofworld.vercel.app${subPath}`);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://promt-codingofworld.vercel.app') return;

      const { pathname } = event.data;

      if (pathname && location.pathname !== `/prompt-hub${pathname}`) {
        navigate(`/prompt-hub${pathname}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate, location.pathname]);

  return (
    <div>
      <iframe
        src={`https://promt-codingofworld.vercel.app${subPath}`}
        className="h-screen"
        width="100%"
        title="Prompt Hub"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PromptHub;
