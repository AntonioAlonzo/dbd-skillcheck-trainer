import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillCheck from "./SkillCheck";
import backgroundImage from "./assets/background.webp";
import PointsNotification from "./PointsNotification";
import BloodPointsCounter from "./BloodpointsCounter";

function App() {
  const [playGame, setPlayGame] = useState(false);
  const [barPosition, setBarPosition] = useState(0);
  const [totalBloodPoints, setTotalBloodPoints] = useState(0);
  const [pointsList, setPointsList] = useState([]);

  function playButtonHandle() {
    setBarPosition(Math.floor(Math.random() * (300 - 80) + 80));
    setPlayGame(!playGame);
  }

  function handleSkillCheckResult(points) {
    setTotalBloodPoints(
      (prevTotalBloodPoints) => prevTotalBloodPoints + points
    );

    setPointsList((prevPointsList) =>
      prevPointsList.map((points) => {
        return { ...points, scale: 0.6 };
      })
    );

    setPointsList((prevPointsList) => {
      const newPointsList = [...prevPointsList];

      if (newPointsList.length > 2) {
        newPointsList.shift();
      }

      return [
        ...newPointsList,
        {
          points,
          scale: 1,
          key: Math.random(),
        },
      ];
    });

    // setPointsNotificationVisible(true);

    /*
    setTimeout(() => {
      setPointsNotificationVisible(false);
    }, 4000);
    */
  }

  return (
    <div
      className="grid grid-cols-3 grid-rows-[250px_auto_200px] h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <BloodPointsCounter
        totalBloodPoints={totalBloodPoints}
      ></BloodPointsCounter>
      {playGame && (
        <SkillCheck
          playGame={playGame}
          barPosition={barPosition}
          handleSkillCheckResult={handleSkillCheckResult}
        ></SkillCheck>
      )}

      {/*
      {pointsNotificationVisible && (
        <PointsNotification lastPoints={lastPoints}></PointsNotification>
      )}
      */}

      <div className="col-start-3 flex flex-col justify-end ">
        {/* Colocamos la lista dentro de un AnimatePresence para habilitar las animaciones exit. */}
        <AnimatePresence>
          {pointsList.map((points, index) => (
            <PointsNotification
              key={points.key}
              points={points.points}
              scale={points.scale}
            ></PointsNotification>
          ))}
        </AnimatePresence>
      </div>

      <div className="col-start-2 row-start-3 flex justify-center">
        <button
          className="w-[30rem] h-20  font-roboto uppercase bg-black bg-opacity-65 rounded-none border-gray-600 border-2"
          onClick={playButtonHandle}
        >
          {playGame ? "Stop" : "Play"}
        </button>
      </div>
    </div>
  );
}

export default App;
