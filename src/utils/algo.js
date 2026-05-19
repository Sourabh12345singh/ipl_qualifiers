const cloneTeams = (teams) =>
  teams.map((t) => ({ ...t }));

const simulateMatchOutcome = (clonedTeams, match, winnerId) => {
  const winner = clonedTeams.find((t) => t.id === winnerId);
  const loser = clonedTeams.find(
    (t) => t.id === (match.team1 === winnerId ? match.team2 : match.team1)
  );
  if (winner) {
    winner.played += 1;
    winner.won += 1;
    winner.points += 2;
  }
  if (loser) {
    loser.played += 1;
    loser.lost += 1;
  }
};

const sortTeams = (teams) =>
  [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

const checkQualification = (sortedTeams, selectedTeamIds) =>
  selectedTeamIds.every((id) => {
    const rank = sortedTeams.findIndex((t) => t.id === id);
    return rank >= 0 && rank < 4;
  });

const generateScenarioText = (matches, outcomes, selectedTeamIds) => {
  const texts = [];
  const teamMatchWins = {};

  selectedTeamIds.forEach((id) => {
    teamMatchWins[id] = { total: 0, wins: 0 };
  });

  matches.forEach((match, i) => {
    const winner = outcomes[i];
    const loser = match.team1 === winner ? match.team2 : match.team1;

    if (selectedTeamIds.includes(winner)) {
      teamMatchWins[winner].wins += 1;
      teamMatchWins[winner].total += 1;
    } else if (selectedTeamIds.includes(loser)) {
      teamMatchWins[loser].total += 1;
    }
  });

  selectedTeamIds.forEach((id) => {
    const { total, wins } = teamMatchWins[id];
    if (total > 0) {
      if (wins === total) {
        texts.push(`${id.toUpperCase()} wins all ${total} remaining match${total > 1 ? 'es' : ''}`);
      } else if (wins > 0) {
        texts.push(`${id.toUpperCase()} wins at least ${wins} out of ${total} match${total > 1 ? 'es' : ''}`);
      } else {
        texts.push(`${id.toUpperCase()} loses all ${total} remaining match${total > 1 ? 'es' : ''}`);
      }
    }
  });

  matches.forEach((match, i) => {
    const winner = outcomes[i];
    const loser = match.team1 === winner ? match.team2 : match.team1;
    if (
      !selectedTeamIds.includes(winner) &&
      !selectedTeamIds.includes(loser)
    ) {
      texts.push(`${winner.toUpperCase()} defeats ${loser.toUpperCase()}`);
    }
  });

  return texts;
};

export const findQualificationScenarios = (
  teams,
  remainingMatches,
  selectedTeamIds
) => {
  if (selectedTeamIds.length === 0) {
    return { possible: false, message: 'Select at least one team' };
  }

  const MAX_SCENARIOS = 10;
  const scenarios = [];
  let totalSimulations = 0;

  const dfs = (matchIndex, currentOutcomes) => {
    if (scenarios.length >= MAX_SCENARIOS) return;

    if (matchIndex === remainingMatches.length) {
      totalSimulations++;
      const cloned = cloneTeams(teams);
      remainingMatches.forEach((match, i) => {
        simulateMatchOutcome(cloned, match, currentOutcomes[i]);
      });
      const sorted = sortTeams(cloned);
      if (checkQualification(sorted, selectedTeamIds)) {
        scenarios.push({
          outcomes: [...currentOutcomes],
          scenarioText: generateScenarioText(
            remainingMatches,
            currentOutcomes,
            selectedTeamIds
          ),
          finalStandings: sorted.slice(0, 4).map((t) => ({
            id: t.id,
            shortName: t.shortName,
            points: t.points,
            nrr: t.nrr,
          })),
        });
      }
      return;
    }

    const match = remainingMatches[matchIndex];
    dfs(matchIndex + 1, [...currentOutcomes, match.team1]);
    dfs(matchIndex + 1, [...currentOutcomes, match.team2]);
  };

  dfs(0, []);

  if (scenarios.length === 0) {
    return {
      possible: false,
      message: `${selectedTeamIds.map((id) => id.toUpperCase()).join(', ')} cannot qualify together`,
      totalSimulations,
    };
  }

  return {
    possible: true,
    scenarios: scenarios.slice(0, 3),
    totalScenarios: scenarios.length,
    totalSimulations,
  };
};
