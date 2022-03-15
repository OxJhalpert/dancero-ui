import { useEffect } from 'react';

const UseScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "http://localhost:3000/chat";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);
};

export default UseScript;
