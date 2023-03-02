import { useState, useEffect } from "react";

export default function <T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == undefined) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)(); //as default it could ocuurs an error cus ts doesnt sure that is it a func or not
        //we should cast it as func
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue]; //just to make sure that ts know the type of returns
}
