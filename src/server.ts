import app from "./app";
import { env } from "./config/env";
import { sequelize } from "./config/database";

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database Connected Successfully");

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server Error:", error);
  }
};

startServer();
