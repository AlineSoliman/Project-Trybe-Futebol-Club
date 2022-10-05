import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class team extends Model {
  id!: number;
  team_name!: string;
}

team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  team_name: {
    type: STRING,
    allowNull: false,
  },

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default team;
