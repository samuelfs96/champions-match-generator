import "./App.css";
import MatchBox from "./components/MatchBox";

function App() {
  return (
    <div className="bg-bgchampions w-screen h-screen bg-contain bg-center flex justify-center gap-[32rem] items-center">
      <div className="flex flex-col gap-6">
        <MatchBox />
        <MatchBox />
        <MatchBox />
        <MatchBox />
      </div>
      <div className="flex flex-col gap-6">
        <MatchBox reverse />
        <MatchBox reverse />
        <MatchBox reverse />
        <MatchBox reverse />
      </div>
    </div>
  );
}

export default App;
