import bloodPointsIcon from "./assets/bloodpoints_icon.webp";
import { useState, useEffect, useRef } from "react";

export default function BloodPointsCounter({ totalBloodPoints }) {
  const [bloodPointsCounter, setBloodPointsCounter] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    // We set the timer only if it hasn't been setted yet, to avoid re-rendering problems
    if (!timer.current) {
      // Pre increment so we get the counter already changed
      const rate =
        bloodPointsCounter < totalBloodPoints
          ? (counter) => ++counter
          : (counter) => --counter;

      timer.current = setInterval(() => {
        setBloodPointsCounter((prevBloodPointsCounter) => {
          return rate(prevBloodPointsCounter);
        });
      }, 10);
    } else if (timer.current && bloodPointsCounter == totalBloodPoints) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [totalBloodPoints, bloodPointsCounter]);

  return (
    <div className="flex items-start ml-10 h-16 mt-10">
      <div
        className="w-16 h-16 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bloodPointsIcon})` }}
      ></div>
      <p className="font-roboto font-bold ml-2 text-[1.5rem] self-center">
        {bloodPointsCounter}
      </p>
    </div>
  );
}
