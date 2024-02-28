import { useState } from "react";
import { motion } from "framer-motion";
import SkillCheck from "./SkillCheck";
import backgroundImage from "./assets/background.webp";

function App() {
  const [playGame, setPlayGame] = useState(false);

  function playButtonHandle() {
    setPlayGame(!playGame);
  }

  return (
    <div
      className="grid grid-cols-3 grid-rows-[200px_auto_200px] h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {playGame && <SkillCheck playGame={playGame}></SkillCheck>}

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
