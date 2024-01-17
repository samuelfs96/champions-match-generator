import logo1 from "../assets/img/teams/bar.png";
import logo2 from "../assets/img/teams/rea.png";

interface MatchBoxProps {
  reverse?: boolean;
}

export default function MatchBox({ reverse }: MatchBoxProps) {
  return (
    <div
      className={`flex justify-between items-center border-[#fe30fd80] border-[1px] px-8 py-4 gap-12 ${
        reverse ? "" : "-"
      }skew-x-12 [&>*]:${reverse ? "-" : ""}skew-x-12`}
    >
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-col gap-1">
          <img className="w-[62px] h-[62px]" src={logo1} alt="teamlogo1" />
          <h1 className="text-center text-white uppercase text-xs font-semibold">
            Barcelona
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`bg-[#1745fb] w-10 h-12 flex justify-center items-center ${
            reverse ? "" : "-"
          }skew-x-12 [&>*]:${reverse ? "-" : ""}skew-x-12`}
        >
          <span className="text-white text-2xl font-mono font-bold">1</span>
        </div>
        <div
          className={`bg-[#fe30fd80] w-10 h-12 flex justify-center items-center ${
            reverse ? "" : "-"
          }skew-x-12 [&>*]:${reverse ? "-" : ""}skew-x-12`}
        >
          <span className="text-white text-lg">vs</span>
        </div>
        <div
          className={`bg-white w-10 h-12 flex justify-center items-center ${
            reverse ? "" : "-"
          }skew-x-12 [&>*]:${reverse ? "-" : ""}skew-x-12`}
        >
          <span className="text-[#010449] text-2xl font-mono font-bold">4</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-col gap-1">
          <img className="w-[62px] h-[62px]" src={logo2} alt="teamlogo2" />
          <h1 className="text-center text-white uppercase text-xs font-semibold">
            Real madrid
          </h1>
        </div>
      </div>
    </div>
  );
}
