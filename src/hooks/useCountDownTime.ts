import { useState, useEffect } from "react";

const calculateTimeLeft = (start?: number) => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  const _start = start? start * 1000 : +new Date(`${month + 2}/10/${year}`)
  let difference = _start - +new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const useCountDownTime = (start?: number) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(start));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(start));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft;
};

export default useCountDownTime;
