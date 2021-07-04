import Sequelize from 'sequelize';
import sequelize from '../configs/database.js';

const {DataTypes, Model} = Sequelize;

class Url extends Model {}

Url.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'url',
    tableName: 'url',
  },
);

export default Url;
