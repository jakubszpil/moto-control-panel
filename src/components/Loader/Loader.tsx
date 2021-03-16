import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default () => {
  const [interval, setInterval] = useState<any>(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setInterval(
      setTimeout(() => {
        setWaiting(false);
      }, 5000)
    );

    return () => {
      clearInterval(interval);
      setInterval(null);
    };
  }, []);

  return (
    <div className="p-3 d-flex align-items-center justify-content-center">
      {waiting ? <Spinner animation="border" /> : <h3>Cannot get data</h3>}
    </div>
  );
};
