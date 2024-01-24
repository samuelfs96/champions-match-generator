import "./App.css";
import MatchBox from "./components/MatchBox";
import AudioButton from "./components/AudioButton";
import { useMatchup } from "./hooks/useMatchup";
import { teams } from "./teams";
import { Matchup } from "./types/team";
import refresh_icon from "./assets/img/icons/refresh.png";
import next_icon from "./assets/img/icons/next.png";
import { Instances } from "./types/instances";
import { matchkeys } from "./utils";

function App() {
  const {
    handleSetMatchups,
    instance,
    matchups,
    activeRandomizerResults,
    handleRandomizeResults,
    handleRefresh,
  } = useMatchup(teams);

  return (
    <div className={`bg-bgchampions w-screen max-lg:w-auto h-screen ${instance === Instances.ROUND16 ? 'max-lg:h-auto max-lg:pt-32 max-lg:pb-28' : ''} bg-no-repeat bg-cover max-lg:bg-auto max-lg:bg-repeat-y bg-center flex flex-col items-center justify-center`}>
      <div className="fixed top-0 left-0 flex w-full justify-between p-8 z-20 max-lg:bg-[#81209b80]">
      <div className="  bg-white -skew-x-12 [&>*]:skew-x-12 shadow-[5px_5px_0_0_rgba(254,48,253,0.5)]">
        <button
          className="px-3 py-3 text-[#81209b] uppercase text-sm hover:[&>img]:rotate-90"
          onClick={() => handleRefresh()}
        >
          <img
            src={refresh_icon}
            alt="refresh"
            className="w-6 transition-all"
          />
        </button>
      </div>

      <div className="  bg-white -skew-x-12 [&>*]:skew-x-12 shadow-[5px_5px_0_0_rgba(254,48,253,0.5)]">
        <div className="px-3 py-3 text-[#81209b] uppercase text-sm hover:[&>div]:scale-90">
          <AudioButton />
        </div>
      </div>
      </div>

      <h1 className=" text-white mb-2 uppercase font-bold flex flex-col">
        <span className="text-stroke-3 text-center text-2xl">{instance}</span>
        <span className="bg-white text-center text-black px-2">
          champions 2023-2024
        </span>
      </h1>
      <div
        className={`flex justify-center mt-8 ${
          instance === Instances.FINAL ? "" : "gap-[32rem] max-lg:gap-6"
        } items-center max-lg:flex-col`}
      >
        <div className="flex flex-col gap-6">
          {[...matchups.slice(...matchkeys(instance)[0])].map(
            ({ teamA, teamB, scoreA, scoreB }: Matchup, index: number) => (
              <MatchBox
                isFinal={instance === Instances.FINAL}
                key={index}
                teamA={teamA}
                teamB={teamB}
                scoreA={scoreA}
                scoreB={scoreB}
              />
            )
          )}
        </div>
        {activeRandomizerResults ? (
          <div className="fixed w-full bottom-0 p-8 justify-center max-lg:bg-[#81209b80] z-20 flex gap-4">
            <div className=" bg-white -skew-x-12 [&>*]:skew-x-12 shadow-[5px_5px_0_0_rgba(254,48,253,0.5)] hover:shadow-[-5px_5px_0_0_rgba(254,48,253,0.5)] transition-all">
              <button
                className="px-8 py-4 text-[#81209b] uppercase text-sm"
                onClick={() => handleRandomizeResults()}
              >
                Simular Resultados
              </button>
            </div>
            <div className=" bg-white -skew-x-12 [&>*]:skew-x-12 shadow-[5px_5px_0_0_rgba(254,48,253,0.5)]">
              {instance !== Instances.FINAL && (
                <button
                  className="px-2 py-2 text-[#81209b] uppercase text-sm"
                  onClick={() => handleSetMatchups(true)}
                >
                  <img
                    src={next_icon}
                    alt="next"
                    className="w-8 transition-all translate-y-[2px]"
                  />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="fixed w-full bottom-0 p-8 justify-center max-lg:bg-[#81209b80] z-20 flex">
            <div className=" bg-white -skew-x-12 [&>*]:skew-x-12 shadow-[5px_5px_0_0_rgba(254,48,253,0.5)] hover:shadow-[-5px_5px_0_0_rgba(254,48,253,0.5)] transition-all">
              <button
                className="px-8 py-4 text-[#81209b]  uppercase text-sm"
                onClick={() => handleSetMatchups(false, true)}
              >
                Simular Sorteo
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {[...matchups.slice(...matchkeys(instance)[1])].map(
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
