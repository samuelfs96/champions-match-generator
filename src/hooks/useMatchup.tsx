import { useCallback, useState } from "react";
import { Matchup, Team } from "../types/team";
import { Instances } from "../types/instances";
import {
  createMatchup,
  filterTeamsByBracket,
} from "../utils";

function getRandomNumber(min: number, max: number): number {
  const range: number = max - min;
  const randomNumber: number = Math.floor(Math.random() * range);
  return randomNumber + min;
}

function getForm(wins: number, losses: number, played: number) {
  const totalMatches: number = wins + losses;
  if (totalMatches === 0) {
    return 0;
  }
  return (wins / totalMatches) * played;
}

export function useMatchup(teams: Team[]) {
  const [instance, setInstance] = useState(Instances.ROUND16);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [currentTeams, setCurrentTeams] = useState<Team[]>([...teams]);
  const [activeRandomizerResults, setActiveRandomizerResults] = useState(false);

  const handleSetMatchups: CallableFunction = useCallback(() => {
    const bracket0Teams: Team[] = filterTeamsByBracket(currentTeams, 0);
    const bracket1Teams: Team[] = filterTeamsByBracket(currentTeams, 1);
    const allMatchups: Matchup[] = bracket0Teams.map((teamA: Team, idx: number) => {
      return createMatchup(teamA, bracket1Teams[idx]);
    });
    setMatchups(allMatchups);
    setInstance(Instances.ROUND16);
    setActiveRandomizerResults(true);
  }, [currentTeams]);

  const handleRandomizeResults: CallableFunction = useCallback(() => {
    const updatedMatchups: Matchup[] = matchups.map((matchup: Matchup) => {
      const { teamAScore, teamBScore } = getRandomScore(matchup);
      matchup.scoreA = teamAScore;
      matchup.scoreB = teamBScore;
      return matchup;
    });
    setMatchups([...updatedMatchups]);
  }, [matchups]);

  return {
    handleSetMatchups,
    matchups,
    instance,
    activeRandomizerResults,
    handleRandomizeResults,
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
