import ILeaderboard from '../../Interface/ILeaderboard';

const goalsFavors = async (matches: ILeaderboard) => {
  let goalsFavor = 0;
  matches.teamHome.forEach((element: any) => {
    goalsFavor += element.homeTeamGoals;
  });
  return goalsFavor;
};

export default goalsFavors;
