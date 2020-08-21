import { startApplication } from "./application.js";
import { startGraphQL } from "./graphql.js";

const application = await startApplication();

await startGraphQL({ application });

application.use("/", (request, response) => response.json({ healthy: true }));
