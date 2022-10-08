import TeamModel from '../database/models/teamsModel';

export default class TeamService {
  static async getAllTeams() {
    const findTeams = await TeamModel.findAll();
    return findTeams;
  }

  static async getTeamsById(id: number) {
    const team = await TeamModel.findByPk(id);
    return team;
  }
}
