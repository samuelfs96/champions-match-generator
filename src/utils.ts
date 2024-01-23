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

export function createMatchup(teamA: Team, teamB: Team): Matchup {
  return { teamA, teamB, scoreA: 0, scoreB: 0 };
}
