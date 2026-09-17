import { sequelize } from '../config/db.sequelize.js';
import { DataTypes, Model } from 'sequelize';
import { Pet } from '../interfaces/pet.interface.js';

// 1. Creamos una interfaz interna que omite el ID para la creación (opcional pero recomendado)
interface PetCreationAttributes extends Omit<Pet, 'id'> {}

// 2. Extendemos la clase Model pasando la interfaz Pet y los atributos de creación
export class PetModel extends Model<Pet, PetCreationAttributes> implements Pet {
    declare public id: number;
    declare public name: string;
    declare public species: string;
    declare public breed: string;
    declare public adopted: boolean;
    declare public age: number;
    declare public intakeDate: Date;
    declare public adoptionDate?: Date | null;
    declare public medicalRecord: Pet['medicalRecord'];
    declare public photo: string;
}

PetModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING, allowNull: false },
    adopted: { type: DataTypes.BOOLEAN, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    intakeDate: { type: DataTypes.DATEONLY, allowNull: false },
    adoptionDate: { type: DataTypes.DATEONLY },
    medicalRecord: { type: DataTypes.JSON, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'pets',
    timestamps: false,
  }
);

// const PetModel = sequelize.define(
//   'Pet',
//   {
//     // Model attributes are defined here
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     species: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     breed: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     adopted: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     intakeDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     adoptionDate: {
//       type: DataTypes.DATEONLY,
//       // allowNull defaults to true
//     },
//     medicalRecord: {
//       type: DataTypes.JSON,
//       allowNull: false,
//     },
//     photo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     // Other model options go here
//     timestamps: false,
//     tableName: 'pets'
//   },
// );