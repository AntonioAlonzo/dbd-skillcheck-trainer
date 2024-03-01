import bloodPointsIcon from "./assets/bloodpoints_icon.webp";

export default function BloodPointsCounter({ totalBloodPoints }) {
  return (
    <div className="flex items-center ml-10">
      <div
        className="w-16 h-16 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bloodPointsIcon})` }}
      ></div>
      <p className="font-roboto font-bold ml-2 text-[1.5rem]">
        {totalBloodPoints}
      </p>
    </div>
  );
}
