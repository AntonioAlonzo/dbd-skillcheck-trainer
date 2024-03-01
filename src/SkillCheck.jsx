import { useState, useRef, useEffect } from "react";
import { motion, useAnimate, useAnimationFrame } from "framer-motion";
import circleImage from "./assets/circle.png";
import barImage from "./assets/skillcheck.png";
import arrowImage from "./assets/arrow.png";
import startSound from "./assets/sfx_hud_skillcheck_open_02.ogg";
import generatorExplodeSound from "./assets/sfx_generator_explode_02.ogg";
import successSound from "./assets/sfx_hud_skillcheck_good_01.ogg";
import barImageRed from "./assets/skillcheck-red.png";

const maxTime = 1960;
const minTime = 1750;

export default function SkillCheck({ barPosition, handleSkillCheckResult }) {
  const [timeRemaining, setTimeRemaining] = useState(2);
  const [pressedSpace, setPressedSpace] = useState(false);
  const [arrowScope, animateArrow] = useAnimate();
  const [barImageBackground, setBarImageBackground] = useState(barImage);
  const [isFinished, setIsFinished] = useState(false);

  const arrowAnimation = useRef();

  useEffect(() => {
    new Audio(startSound).play();
  }, []);

  useAnimationFrame((time, delta) => {
    if (time <= maxTime) {
      setTimeRemaining(time);
    }
  });

  useEffect(() => {
    arrowAnimation.current = animateArrow(
      arrowScope.current,
      { rotate: [0, 360] },
      { duration: 1.7, delay: 1.2 }
    );
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();

      if (event.keyCode === 32) {
        arrowAnimation.current.stop();

        if (timeRemaining < minTime) {
          new Audio(generatorExplodeSound).play();
          handleSkillCheckResult(-50);
          setBarImageBackground(barImageRed);
        } else if (timeRemaining < maxTime - 15) {
          new Audio(successSound).play();
          handleSkillCheckResult(50);
        }

        setPressedSpace(true);
        setIsFinished(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (maxTime - 15 < timeRemaining && !isFinished) {
      arrowAnimation.current.stop();
      new Audio(generatorExplodeSound).play();
      handleSkillCheckResult(-50);
      setBarImageBackground(barImageRed);
    }
  }, [timeRemaining]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
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
            backgroundImage: `url(${barImageBackground})`,
            /* rotate: `${barPosition}deg`,*/
            rotate: "200deg",
          }}
        ></div>

        <motion.div
          animate={{
            width: pressedSpace ? "8.2rem" : "8rem",
            height: pressedSpace ? "2.6rem" : "2.2rem",
            fontSize: pressedSpace ? "23px" : "19px",
            borderColor: pressedSpace ? "#ddd" : "#fff",
            backgroundColor: pressedSpace ? "#fff" : "#000",
            color: pressedSpace ? "#000" : "#ddd",
          }}
          transition={{ repeat: 1, repeatType: "reverse", duration: 0.1 }}
          className="z-20 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  font-roboto bg-black rounded-md h-8 w-16 border-neutral-400 border-2 text-center align-middle flex items-center justify-center text-[14px] font-bold"
        >
          SPACE
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
