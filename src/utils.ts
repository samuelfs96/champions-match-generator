import { Matchup, Team } from "./types/team";

export function filterTeamsByBracket(teams: Team[], bracket: number): Team[] {
  return teams.filter((team: Team) => team.bracket === bracket);
}

export function getRandomIndex(teams: Team[]): number {
  return Math.floor(Math.random() * teams.length);
}

export function createMatchup(teamA: Team, teamB: Team): Matchup {
  return { teamA, teamB, scoreA: 0, scoreB: 0 };
}

export function removeUsedTeams(teams: Team[], matchup: Matchup): Team[] {
  return teams.filter(
    (team: Team) =>
      team.name !== matchup.teamA.name && team.name !== matchup.teamB.name
  );
}
