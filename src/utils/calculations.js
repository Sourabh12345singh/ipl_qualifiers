export const calculateProbabilities = (teams, matchPredictions) => {
  const updatedTeams = teams.map((team) => {
    let points = team.points;

    Object.entries(matchPredictions).forEach(([, winner]) => {
      if (winner === team.id) {
        points += 2;
      }
    });

    return { ...team, points };
  });

  const sortedTeams = [...updatedTeams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  const cutoffPoints = sortedTeams.length >= 4 ? sortedTeams[3].points : 0;

  const probabilities = teams.map((team) => {
    const currentPoints = team.points;
    const maxPossiblePoints = currentPoints + 4;
    const teamRank = sortedTeams.findIndex((t) => t.id === team.id);
    const isInTop4 = teamRank < 4;

    let probability;
    if (isInTop4) {
      const buffer = currentPoints - cutoffPoints;
      probability = 70 + Math.min(25, buffer * 10) + Math.random() * 5;
    } else if (maxPossiblePoints >= cutoffPoints) {
      const gap = cutoffPoints - currentPoints;
      probability = Math.max(15, 50 - gap * 12) + Math.random() * 10;
    } else {
      probability = Math.random() * 15;
    }

    return {
      id: team.id,
      name: team.shortName,
      color: team.color,
      probability: Math.min(99, Math.max(1, probability)),
    };
  });

  return probabilities.sort((a, b) => b.probability - a.probability);
};

export const generateInsights = (teams, matchPredictions) => {
  const insights = [];
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  if (sortedTeams.length === 0) return insights;

  const topTeam = sortedTeams[0];
  const fourthTeam = sortedTeams[3];
  const fifthTeam = sortedTeams[4];

  insights.push(
    `${topTeam.shortName} leads the table with ${topTeam.points} points and a strong NRR of ${topTeam.nrr > 0 ? '+' : ''}${topTeam.nrr}`
  );

  if (fourthTeam) {
    insights.push(
      `${fourthTeam.shortName} currently holds the 4th playoff spot with ${fourthTeam.points} points`
    );
  }

  if (fifthTeam && fourthTeam) {
    const pointsGap = fourthTeam.points - fifthTeam.points;
    insights.push(
      `${fifthTeam.shortName} needs to gain ${pointsGap + 2} points to overtake ${fourthTeam.shortName} for the final playoff spot`
    );
  }

  const predictedMatches = Object.keys(matchPredictions).length;
  if (predictedMatches > 0) {
    insights.push(
      `You've predicted ${predictedMatches} match${predictedMatches > 1 ? 'es' : ''}`
    );
  } else {
    insights.push('Select match winners to see updated qualification probabilities');
  }

  return insights;
};

export const sortTeams = (teams, sortBy) => {
  return [...teams].sort((a, b) => {
    if (sortBy === 'points') {
      if (b.points !== a.points) return b.points - a.points;
      return b.nrr - a.nrr;
    }
    if (sortBy === 'nrr') {
      return b.nrr - a.nrr;
    }
    return 0;
  });
};
