import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";
import type { Sequelize } from "sequelize";

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare id: CreationOptional<number>;
    declare content: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const initMessageModel = (sequelize: Sequelize): typeof Message => {
    Message.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [1, 500]
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            sequelize,
            modelName: "Message",
            tableName: "Messages",
            timestamps: true
        }
    );

    return Message;
};
