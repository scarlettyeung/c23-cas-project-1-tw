import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function NotFound() {
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(5);

  useEffect(() => {
    const timerToHome = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearTimeout(timerToHome);
    };
  }, [navigate]);

  useEffect(() => {
    const timerToCount = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearTimeout(timerToCount);
    };
  }, [time]);

  return (
    <div>
      <h1>404 Not Found</h1>
      <img className="errorImage" src='../../public/404.jpeg' alt=''></img>

      <div>Will Go back at {time}s</div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        back to home
      </button>
    </div>
  );
}

export default NotFound;
