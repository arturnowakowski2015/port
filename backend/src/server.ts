import { app } from "./app";
import { sequelize } from "./models";

const port = Number(process.env.PORT || 4000);

const start = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

void start();
