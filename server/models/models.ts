import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

interface ExtractedDataAttributes {
  id: number;
  imageSrc: string | null;
  title: string | null;
}

interface ExtractedDataCreationAttributes extends Optional<ExtractedDataAttributes, 'id'> {}

class ExtractedData extends Model<ExtractedDataAttributes, ExtractedDataCreationAttributes> implements ExtractedDataAttributes {
  public id!: number;
  public imageSrc!: string | null;
  public title!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function initExtractedData(sequelize: Sequelize) {
  ExtractedData.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      imageSrc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'ExtractedData', // Замените на вашу таблицу
    }
  );
}

export { ExtractedData, initExtractedData };
