import { useCallback, useState } from "react";
//import { Instances } from "../types/instances";
import { Matchup, Team } from "../types/team";
import { Instances } from "../types/instances";

function filterTeamsByBracket(teams: Team[], bracket: number): Team[] {
  return teams.filter((team: Team) => team.bracket === bracket);
}

function getRandomIndex(teams: Team[]): number {
  return Math.floor(Math.random() * teams.length);
}

function createMatchup(teamA: Team, teamB: Team): Matchup {
  return { teamA, teamB, scoreA: 0, scoreB: 0 };
}

function removeUsedTeams(teams: Team[], matchup: Matchup): Team[] {
  return teams.filter(
    (team: Team) =>
      team.name !== matchup.teamA.name && team.name !== matchup.teamB.name
  );
}

export function useMatchup(teams: Team[]) {
  const [instance, setInstance] = useState("");
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [currentTeams, setCurrentTeams] = useState<Team[]>([...teams]);
  const [activeRandomizerResults, setActiveRandomizerResults] = useState(false);

  const handleSetMatchups: CallableFunction = useCallback(() => {
    const bracket0Teams: Team[] = filterTeamsByBracket(currentTeams, 0);
    const bracket1Teams: Team[] = filterTeamsByBracket(currentTeams, 1);

    setActiveRandomizerResults(false);
    if (bracket0Teams.length > 0 && bracket1Teams.length > 0) {
      const randomIndexA: number = getRandomIndex(bracket0Teams);
      const randomIndexB: number = getRandomIndex(bracket1Teams);

      const matchup: Matchup = createMatchup(
        bracket0Teams[randomIndexA],
        bracket1Teams[randomIndexB]
      );

      setCurrentTeams(removeUsedTeams(currentTeams, matchup));
      setMatchups([...matchups, matchup]);
      setInstance(Instances.ROUND16);
    } else {
      setActiveRandomizerResults(true);
    }
  }, [matchups, currentTeams]);

  return { handleSetMatchups, matchups, instance, activeRandomizerResults };
}
