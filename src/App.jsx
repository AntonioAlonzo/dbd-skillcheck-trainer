import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillCheck from "./SkillCheck";
import backgroundImage from "./assets/background.webp";
import PointsNotification from "./PointsNotification";
import BloodPointsCounter from "./BloodpointsCounter";
import { POSITIONS } from "./data.js";

function App() {
  const [playGame, setPlayGame] = useState(false);
  const [barPosition, setBarPosition] = useState(0);
  const [totalBloodPoints, setTotalBloodPoints] = useState(0);
  const [pointsList, setPointsList] = useState([]);
  const [maxTime, setMaxTime] = useState(2500);
  const [minTime, setMinTime] = useState(1000);

  useEffect(() => {
    if (!playGame) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * 8);
        setBarPosition(POSITIONS[randomIndex].degrees);
        setMaxTime(POSITIONS[randomIndex].maxFrame);
        setMinTime(POSITIONS[randomIndex].minFrame);

        setPlayGame(true);
      }, getRandomTime() * 1000);
    }
  }, [playGame]);

  function getRandomTime() {
    return Math.floor(Math.random() * (7 - 3) + 3);
  }

  function playButtonHandle() {
    const randomIndex = Math.floor(Math.random() * 8);
    setBarPosition(POSITIONS[randomIndex].degrees);
    setMaxTime(POSITIONS[randomIndex].maxFrame);
    setMinTime(POSITIONS[randomIndex].minFrame);

    /*
    const newBarPosition = Math.floor(Math.random() * (300 - 80) + 80);
    setBarPosition(newBarPosition);

    const { newMaxTime, newMinTime } = calculateTimeValues(newBarPosition);
    setMaxTime(1960);
    setMinTime(900);
    */

    setPlayGame(!playGame);
  }

  function handleSkillCheckResult(points) {
    setTotalBloodPoints((prevTotalBloodPoints) => {
      return prevTotalBloodPoints + points < 0
        ? prevTotalBloodPoints
        : prevTotalBloodPoints + points;
    });

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

    setTimeout(() => {
      setPlayGame(false);
    }, 2000);
  }

  /*
  function calculateTimeValues(deg) {
    // Datos conocidos
    const dataPoints = [
      { deg: 300, x: 2465, y: 2186 },
      { deg: 80, x: 1522, y: 1354 },
    ];

    // Encontrar los datos correspondientes para el valor de deg dado
    let x1, y1, x2, y2;

    for (let i = 0; i < dataPoints.length - 1; i++) {
      if (deg <= dataPoints[i].deg && deg >= dataPoints[i + 1].deg) {
        x1 = dataPoints[i].x;
        y1 = dataPoints[i].y;
        x2 = dataPoints[i + 1].x;
        y2 = dataPoints[i + 1].y;
        break;
      }
    }

    // Calcular los valores de maxTime y minTime mediante interpolación lineal
    const maxTime = interpolate(x1, x2, y1, y2, deg);
    const minTime = interpolate(x1, x2, y1, y2, deg - 15); // Restamos 15 a deg para calcular minTime

    console.log(deg, maxTime, minTime);

    return { maxTime, minTime };
  }

  function interpolate(x1, x2, y1, y2, x) {
    // Fórmula de interpolación lineal: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
    return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
  }
  */

  return (
    <div
      className="grid grid-cols-3 grid-rows-[250px_auto_200px] h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <BloodPointsCounter
        totalBloodPoints={totalBloodPoints}
      ></BloodPointsCounter>

      <AnimatePresence>
        {playGame && (
          <SkillCheck
            playGame={playGame}
            barPosition={barPosition}
            handleSkillCheckResult={handleSkillCheckResult}
            maxTime={maxTime}
            minTime={minTime}
          ></SkillCheck>
        )}
      </AnimatePresence>

      <div className="col-start-3 flex flex-col items-end justify-end">
        {/* AnimatePresence is needed for exit animations. */}
        <AnimatePresence>
          {pointsList.map((points, index) => (
            <PointsNotification
              key={points.key}
              points={points}
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
