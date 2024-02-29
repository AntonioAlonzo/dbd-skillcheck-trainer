import { useState, useRef, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import circleImage from "./assets/circle.png";
import barImage from "./assets/skillcheck.png";
import arrowImage from "./assets/arrow.png";
import startSound from "./assets/start-skillcheck.mp3";

export default function SkillCheck({ barPosition }) {
  const [timeRemaining, setTimeRemaining] = useState(1200);
  const [pressedSpace, setPressedSpace] = useState(false);
  const [arrowScope, animateArrow] = useAnimate();
  const arrowAnimation = useRef();
  const timer = useRef();

  useEffect(() => {
    arrowAnimation.current = animateArrow(
      arrowScope.current,
      { rotate: [0, 360] },
      { duration: 2 }
    );
  }, []);

  /*
  const stopAnimationAtFrame = async () => {
    await controls.stop();
  };
  */

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();

      if (event.keyCode === 32) {
        console.log("SPACE PRESSED");
        arrowAnimation.current.stop();
        setPressedSpace(true);
        console.log(timeRemaining);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [timeRemaining]);

  useEffect(() => {
    new Audio(startSound).play();
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

    return () => clearInterval(timer.current);
  }, []);

  if (timeRemaining <= 0) {
    console.log("FAIL");
    clearInterval(timer.current);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-start-2 row-start-2 flex justify-center items-center flex-col"
    >
      {/* We need to add position:relative to parent div of absolute positioned containers to use width: 100% */}
      <div className="relative w-64 h-64 flex justify-center items-center">
        <div
          className="absolute bg-cover w-56 h-56"
          style={{ backgroundImage: `url(${circleImage})` }}
        ></div>

        <div
          className={`absolute bg-cover w-56 h-56`}
          style={{
            backgroundImage: `url(${barImage})`,
            rotate: `${barPosition}deg`,
          }}
        ></div>

        <motion.div
          animate={{
            width: pressedSpace ? "4.2rem" : "4rem",
            height: pressedSpace ? "2.2rem" : "2rem",
            fontSize: pressedSpace ? "18px" : "14px",
            borderColor: pressedSpace ? "#ddd" : "#fff",
          }}
          transition={{ repeat: 1, repeatType: "reverse", duration: 0.1 }}
          className="z-20 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-neutral-400 font-roboto bg-black rounded-md h-8 w-16 border-neutral-400 border-2 text-center align-middle flex items-center justify-center text-[14px]"
        >
          Space
        </motion.div>

        <div
          ref={arrowScope}
          className="absolute w-[17rem] h-[17rem] bg-cover"
          style={{ backgroundImage: `url(${arrowImage})` }}
        ></div>
      </div>
      <p>{timeRemaining}</p>
    </motion.div>
  );
}
