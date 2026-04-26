import { sequelize } from "../db/sequelize";
import { initMessageModel } from "./message";

initMessageModel(sequelize);

export { sequelize };
