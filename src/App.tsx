import "./App.css";
import MatchBox from "./components/MatchBox";
import logo1 from "./assets/img/teams/rea.png";
import logo2 from "./assets/img/teams/bar.png";
import { Team } from "./types/team";
import { useState } from "react";
import { Instances } from "./types/instances";

const teamA: Team = {
  name: "Real madrid",
  logo: logo1,
  score: 4,
};

const teamB: Team = {
  name: "Barcelona",
  logo: logo2,
  score: 2,
};

function App() {

  const [instance, setInstance] = useState(Instances.ROUND16)

  return (
    <div className="bg-bgchampions w-screen h-screen bg-contain bg-center flex flex-col items-center justify-center">
      <h1 className=" text-white mb-2 uppercase font-mono font-bold flex flex-col">
        <span className="text-stroke-3 text-center text-2xl">{instance}</span>
        <span className="bg-white text-center text-black px-2">champions 2023-2024</span>
      </h1>
      <div className="flex justify-center gap-[32rem] items-center">
        <div className="flex flex-col gap-6">
          <MatchBox teamA={teamA} teamB={teamB} />
          <MatchBox teamA={teamA} teamB={teamB} />
          <MatchBox teamA={teamA} teamB={teamB} />
          <MatchBox teamA={teamA} teamB={teamB} />

        </div>
        <div className="flex flex-col gap-6">
          <MatchBox teamA={teamA} teamB={teamB} />
          <MatchBox teamA={teamA} teamB={teamB} />
          <MatchBox teamA={teamA} teamB={teamB} />
          <MatchBox teamA={teamA} teamB={teamB} />
        </div>
      </div>
    </div>
  );
}

export default App;
