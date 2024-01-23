export interface Team {
  name: string;
  logo: string;
  bracket: number;
  gf: number;
  gc: number;
  wins: number;
  losses: number;
  played: number;
}

export interface Matchup {
  teamA: Team;
  teamB: Team;
  scoreA: number;
  scoreB: number;
}

