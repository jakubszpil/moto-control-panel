import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const convertToObject = (searchParams: any) => {
  let params: any = {};
  for (let p of searchParams) {
    const key: string = p[0];
    const value: any = p[1];
    params[key] = value;
  }
  return params;
};

export default function useURLSearchParams() {
  const location = useLocation();
  const searchParams: any = new URLSearchParams(location.search);
  const [params, setParams] = useState(convertToObject(searchParams));

  useEffect(() => {
    setParams(convertToObject(searchParams));
  }, [location]);

  return params;
}
