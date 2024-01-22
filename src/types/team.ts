export interface Team {
  name: string;
  logo: string;
  bracket: number;
}

export interface Matchup {
  teamA: Team;
  teamB: Team;
  scoreA: number;
  scoreB: number;
}

