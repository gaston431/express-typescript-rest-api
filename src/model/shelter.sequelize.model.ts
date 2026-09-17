import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.sequelize.js';
import type { Shelter } from '../interfaces/shelter.interface.js';

interface ShelterCreationAttributes extends Omit<Shelter, 'id'> {}

export class ShelterModel extends Model<Shelter, ShelterCreationAttributes> implements Shelter {
    declare public id: number;
    declare public name: string;
    declare public location: string;
}

ShelterModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, tableName: 'shelters', timestamps: false }
);
