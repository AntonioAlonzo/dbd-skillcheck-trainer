import generatorIcon from "./assets/icon-generator.webp";
import { motion } from "framer-motion";

export default function PointsNotification({ points }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: "0" }}
      animate={{
        opacity: 1,
        y: 0,
        scale: points.scale,
        x: points.scale < 1 ? 40 : 0,
      }}
      style={{ transformOrigin: "right" }}
      transition={{ duration: 0.5, scale: { duration: 1 } }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      className="flex flex-row justify-end items-center mr-10"
      layout
    >
      <div className="flex flex-col items-end font-roboto font-bold">
        <p className="text-[1.2rem]">
          {points.points > 0 ? "GOOD" : "BAD "} SKILL CHECK
        </p>
        <p className="text-red-600 -mt-1 text-[1.1rem]">
          {points.points > 0 ? `+${points.points}` : `${points.points}`}
        </p>
      </div>

      <div
        style={{ backgroundImage: `url(${generatorIcon})` }}
        className="w-[5rem] h-[5rem] bg-contain bg-center bg-no-repeat"
      ></div>
    </motion.div>
  );
}
