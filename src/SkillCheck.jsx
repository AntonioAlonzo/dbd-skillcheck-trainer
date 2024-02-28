import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import circleImage from "./assets/circle.png";
import barImage from "./assets/skillcheck.png";
import arrowImage from "./assets/arrow.png";

export default function SkillCheck({ playGame }) {
  const [timeRemaining, setTimeRemaining] = useState(2000);
  const [pressedSpace, setPressedSpace] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 32) {
        console.log("TIME: " + timeRemaining);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (playGame) {
      timer.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        console.log("prevTimeRemaining: " + timeRemaining);
      }, 10);
    }

    return () => clearInterval(timer.current);
  }, [playGame, timeRemaining]);

  function resetTimer() {
    setTimeRemaining(2000);
  }

  if (timeRemaining <= 0) {
    console.log("FAIL");
    clearInterval(timer.current);

    // resetTimer();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-start-2 row-start-2 flex justify-center items-center"
    >
      {/* We need to add position:relative to parent div of absolute positioned containers to use width: 100% */}
      <div className="relative w-64 h-64 flex justify-center items-center">
        <div
          className="absolute bg-cover w-56 h-56"
          style={{ backgroundImage: `url(${circleImage})` }}
        ></div>

        <div
          className="absolute bg-cover w-56 h-56 -rotate-90"
          style={{ backgroundImage: `url(${barImage})` }}
        ></div>

        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-roboto uppercase">
          SPACE
        </div>

        <motion.div
          className="absolute w-64 h-64 bg-cover"
          style={{ backgroundImage: `url(${arrowImage})` }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2 }}
        ></motion.div>
      </div>
    </motion.div>
  );
}
