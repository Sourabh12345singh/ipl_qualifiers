export const getPredictedTable = (teams, matches, matchPredictions) => {
  const predicted = teams.map((team) => {
    let points = team.points;
    let played = team.played;
    let won = team.won;
    let lost = team.lost;
    let remainingMatches = 0;

    matches.forEach((match) => {
      const matchKey = [match.team1, match.team2].sort().join('-');
      const winner = matchPredictions[matchKey];

      if (match.team1 === team.id || match.team2 === team.id) {
        if (winner) {
          played += 1;
          if (winner === team.id) {
            won += 1;
            points += 2;
          } else {
            lost += 1;
          }
        } else {
          remainingMatches += 1;
        }
      }
    });

    return {
      ...team,
      predictedPoints: points,
      predictedPlayed: played,
      predictedWon: won,
      predictedLost: lost,
      remainingMatches,
      maxPossiblePoints: points + remainingMatches * 2,
    };
  });

  const sorted = [...predicted].sort((a, b) => {
    if (b.predictedPoints !== a.predictedPoints) return b.predictedPoints - a.predictedPoints;
    return b.nrr - a.nrr;
  });

  return sorted.map((team, index) => ({
    ...team,
    predictedRank: index + 1,
    isQualified: index < 4,
  }));
};

export const calculateQualificationStatus = (teams, matches, matchPredictions) => {
  const predicted = getPredictedTable(teams, matches, matchPredictions);
  const cutoffPoints = predicted.length >= 4 ? predicted[3].predictedPoints : 0;

  return predicted.map((team) => {
    let status;
    if (team.predictedPoints > cutoffPoints) {
      status = 'qualified';
    } else if (team.predictedPoints === cutoffPoints && team.isQualified) {
      status = 'qualified';
    } else if (team.maxPossiblePoints < cutoffPoints) {
      status = 'eliminated';
    } else {
      status = 'contending';
    }

    const pointsNeeded = team.predictedPoints < cutoffPoints
      ? cutoffPoints - team.predictedPoints + 2
      : 0;

    return {
      id: team.id,
      name: team.shortName,
      color: team.color,
      logo: team.logo,
      predictedPoints: team.predictedPoints,
      currentPoints: team.points,
      predictedRank: team.predictedRank,
      status,
      pointsNeeded,
      remainingMatches: team.remainingMatches,
      nrr: team.nrr,
    };
  }).sort((a, b) => a.predictedRank - b.predictedRank);
};

export const generateInsights = (teams, matches, matchPredictions) => {
  const insights = [];
  const predicted = getPredictedTable(teams, matches, matchPredictions);
  const cutoffPoints = predicted.length >= 4 ? predicted[3].predictedPoints : 0;

  const topTeam = predicted[0];
  const fourthTeam = predicted[3];
  const fifthTeam = predicted[4];

  const predictedCount = Object.values(matchPredictions).filter(Boolean).length;

  if (predictedCount === 0) {
    insights.push('Select match winners to see predicted standings');
    insights.push(`${topTeam.shortName} currently leads with ${topTeam.points} points`);
    if (fourthTeam) {
      insights.push(`${fourthTeam.shortName} holds the 4th spot with ${fourthTeam.points} points`);
    }
  } else {
    insights.push(`${topTeam.shortName} projected at #1 with ${topTeam.predictedPoints} points`);

    if (fourthTeam) {
      insights.push(`${fourthTeam.shortName} projected in 4th with ${fourthTeam.predictedPoints} points`);
    }

    if (fifthTeam && fourthTeam) {
      const gap = fourthTeam.predictedPoints - fifthTeam.predictedPoints;
      if (gap > 0) {
        insights.push(`${fifthTeam.shortName} trails by ${gap} points from playoff spot`);
      } else {
        insights.push(`${fifthTeam.shortName} tied on points with 4th place — NRR decides`);
      }
    }

    const qualified = predicted.filter((t) => t.predictedRank <= 4);
    insights.push(`Projected playoff teams: ${qualified.map((t) => t.shortName).join(', ')}`);

    insights.push(`${predictedCount}/${matches.length} matches predicted`);
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
