import "./App.css";
import MatchBox from "./components/MatchBox";
import { useMatchup } from "./hooks/useMatchup";
import { teams } from "./teams";
import { Matchup } from "./types/team";

function App() {
  const { handleSetMatchups, instance, matchups } = useMatchup(teams);
  return (
    <div className="bg-bgchampions w-screen h-screen bg-contain bg-center flex flex-col items-center justify-center">
      <h1 className=" text-white mb-2 uppercase font-bold flex flex-col">
        <span className="text-stroke-3 text-center text-2xl">{instance}</span>
        <span className="bg-white text-center text-black px-2">
          champions 2023-2024
        </span>
      </h1>
      <div className="flex justify-center gap-[32rem] items-center">
        <div className="flex flex-col gap-6">
          {[...matchups.slice(0, 4)].map(
            ({ teamA, teamB, scoreA, scoreB }: Matchup, index: number) => (
              <MatchBox
                key={index}
                teamA={teamA}
                teamB={teamB}
                scoreA={scoreA}
                scoreB={scoreB}
              />
            )
          )}
        </div>
        <div className="fixed bottom-10 -skew-x-12 [&>*]:skew-x-12 bg-[#fe30fd80]">
          <button
            className="px-8 py-4 text-white uppercase text-sm"
            onClick={handleSetMatchups}
          >
            Simular Sorteo
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {[...matchups.slice(4, 8)].map(
            ({ teamA, teamB, scoreA, scoreB }: Matchup, index: number) => (
              <MatchBox
                key={index}
                teamA={teamA}
                teamB={teamB}
                scoreA={scoreA}
                scoreB={scoreB}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
