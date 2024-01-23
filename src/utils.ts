import { Instances } from "./types/instances";
import { Matchup, Team } from "./types/team";

function shuffleTeams(teams: Team[]): Team[] {
  for (let i: number = teams.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const temp: Team = teams[i];
    teams[i] = teams[j];
    teams[j] = temp;
  }
  return teams;
}

export function filterTeamsByBracket(teams: Team[], bracket: number): Team[] {
  return shuffleTeams(teams.filter((team: Team) => team.bracket === bracket));
}

export function filterTeamsByWinner(matchups: Matchup[]): Team[] {
  return shuffleTeams(matchups.map((matchup: Matchup) => {
    return matchup.scoreA > matchup.scoreB ? matchup.teamA : matchup.teamB;
  }));
}

export function createMatchup(teamA: Team, teamB: Team): Matchup {
  return { teamA, teamB, scoreA: 0, scoreB: 0 };
}

export function getRandomNumber(min: number, max: number): number {
  const range: number = max - min;
  const randomNumber: number = Math.floor(Math.random() * range);
  return randomNumber + min;
}

export function handleNextInstance(current: string): string {
  switch (current) {
    case Instances.ROUND16:
      return Instances.QUARTER;
    case Instances.QUARTER:
      return Instances.SEMIS;
    case Instances.SEMIS:
      return Instances.FINAL;
    default:
      return Instances.ROUND16;
  }
}
