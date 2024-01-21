import { Team } from "../types/team";

interface MatchBoxProps {
  teamA: Team;
  teamB: Team;
}

export default function MatchBox({ teamA, teamB }: MatchBoxProps) {
  return (
    <div
      className={`flex justify-between items-center border-[#fe30fd80] border-[1px] px-8 py-4 gap-12 -skew-x-12 [&>*]:skew-x-12`}
    >
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-col gap-1">
          <img className="w-[62px] h-[62px]" src={teamA.logo} alt="teamlogo1" />
          <h1 className="text-center text-white uppercase text-xs font-semibold">
            {teamA.name}
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col items-center">
      <div className="flex justify-center items-center">
        <div
          className={`bg-[#fe30fd80] w-10 h-12 flex justify-center items-center -skew-x-12 [&>*]:skew-x-12`}
        >
          <span className="text-white text-2xl font-bold">
            {teamA.score}
          </span>
        </div>
        <div
          className={`bg-white w-10 h-12 flex justify-center items-center -skew-x-12 [&>*]:skew-x-12`}
        >
          <span className="text-[#81209b] text-2xl font-bold">
            {teamB.score}
          </span>
        </div>
      </div>
      {/* <p className="text-white text-sm font-bold absolute bottom-[-50%]">FT'</p> */}
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-col gap-1">
          <img className="w-[62px] h-[62px]" src={teamB.logo} alt="teamlogo2" />
          <h1 className="text-center text-white uppercase text-xs font-semibold">
            {teamB.name}
          </h1>
        </div>
      </div>
    </div>
  );
}
