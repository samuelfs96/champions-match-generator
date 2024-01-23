import { useCallback, useState } from "react";
import { Matchup, Team } from "../types/team";
import { Instances } from "../types/instances";
import {
  createMatchup,
  filterTeamsByBracket,
  filterTeamsByWinner,
  getRandomNumber,
  handleNextInstance,
} from "../utils";

function getForm(wins: number, losses: number, played: number) {
  const totalMatches: number = wins + losses;
  if (totalMatches === 0) {
    return 0;
  }
  return (wins / totalMatches) * played;
}

function getNewMatchups(teams: Team[]) {
  const newArray: Matchup[] = [];
  for (let i: number = 0; i < teams.length; i += 2) {
    if (i + 1 < teams.length) {
      newArray.push(createMatchup(teams[i], teams[i + 1]));
    }
  }
  return newArray;
}

export function useMatchup(teams: Team[]) {
  const [instance, setInstance] = useState<string>(Instances.ROUND16);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [activeRandomizerResults, setActiveRandomizerResults] =
    useState<boolean>(false);

  const handleSetMatchups: CallableFunction = useCallback(
    (next: boolean) => {
      const bracket0Teams: Team[] = filterTeamsByBracket(teams, 0);
      const bracket1Teams: Team[] = filterTeamsByBracket(teams, 1);
      const winningTeams: Team[] = filterTeamsByWinner(matchups);
      const allMatchups: Matchup[] = next
        ? getNewMatchups(winningTeams)
        : bracket0Teams.map((teamA: Team, idx: number) => {
            return createMatchup(teamA, bracket1Teams[idx]);
          });
      if (next) setInstance(handleNextInstance);
      setMatchups(allMatchups);
      setActiveRandomizerResults(true);
    },
    [teams, matchups]
  );

  const handleRandomizeResults: CallableFunction = useCallback(() => {
    const updatedMatchups: Matchup[] = matchups.map((matchup: Matchup) => {
      const { teamAScore, teamBScore } = getRandomScore(matchup);
      matchup.scoreA = teamAScore;
      matchup.scoreB = teamBScore;
      return matchup;
    });
    setMatchups([...updatedMatchups]);
  }, [matchups]);

  const handleRefresh: CallableFunction = useCallback(() => {
    setMatchups([]);
    setInstance(Instances.ROUND16);
    setActiveRandomizerResults(false);
  }, [])

  return {
    handleSetMatchups,
    matchups,
    instance,
    activeRandomizerResults,
    handleRandomizeResults,
    handleRefresh
  };
}

function getRandomScore(matchup: Matchup) {
  const { teamA, teamB } = matchup;

  // goals diff
  const teamADiff: number = teamA.gf - teamA.gc;
  const teamBDiff: number = teamB.gf - teamB.gc;

  // teams form
  const teamAForm: number = getForm(teamA.wins, teamA.losses, teamA.played);
  const teamBForm: number = getForm(teamB.wins, teamB.losses, teamB.played);

  // index team
  const teamAIndex: number = (teamADiff + teamAForm) / 2;
  const teamBIndex: number = (teamBDiff + teamBForm) / 2;

  // generate score
  const teamAScore: number = getRandomNumber(0, teamAIndex + 1);
  const teamBScore: number = getRandomNumber(0, teamBIndex + 1);

  // return score
  return {
    matchup,
    teamAScore,
    teamBScore,
  };
}
