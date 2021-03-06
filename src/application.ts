import cors from "cors";
import express from "express";
import helmet from "helmet";

if (!process.env.PORT) {
  console.error("NO_PORT");

  process.exit(1);
}

export const startApplication = async () => {
  const port = Number(process.env.PORT);

  const application = express();

  application.use(helmet());
  application.use(cors());
  application.use(express.json());

  try {
    await new Promise((resolve) => {
      application.listen(port, resolve);
    });

    console.log(`Server listening on port ${port}`);

    return application;
  } catch (error) {
    console.error(error);
  }
};
