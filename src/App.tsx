import "./App.css";
import MatchBox from "./components/MatchBox";
import { useCallback, useState } from "react";
import { Instances } from "./types/instances";
import { teams } from "./teams";
import { Matchup, Team } from "./types/team";

function App() {
  const [instance, setInstance] = useState("");
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [currentTeams, setCurrentTeams] = useState<Team[]>([...teams]);
  const handleSetMatchups: VoidFunction = useCallback(() => {
    const bracket0Teams: Team[] = currentTeams.filter(
      (team: Team) => team.bracket === 0
    );
    const bracket1Teams: Team[] = currentTeams.filter(
      (team: Team) => team.bracket === 1
    );
    if (bracket0Teams.length !== 0 && bracket1Teams.length !== 0) {
      const randomIndexA: number = Math.floor(
        Math.random() * bracket0Teams.length
      );
      const randomIndexB: number = Math.floor(
        Math.random() * bracket1Teams.length
      );
      const availableteams: Team[] = currentTeams.filter(
        (team: Team) =>
          team.name !== bracket0Teams[randomIndexA].name &&
          team.name !== bracket1Teams[randomIndexB].name
      );
      setCurrentTeams([...availableteams]);
      setMatchups([
        ...matchups,
        {
          teamA: bracket0Teams[randomIndexA],
          teamB: bracket1Teams[randomIndexB],
          scoreA: 0,
          scoreB: 0,
        },
      ]);
      setInstance(Instances.ROUND16);
    }
  }, [matchups, currentTeams]);

  console.log(matchups);

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
