import Fastify from "fastify";
import mongoosePlugin from "./plugins/mongoosePlugin.js";
import routes from "./routes/taskRoutes.js";
import cors from "@fastify/cors";
import "dotenv/config";

//Fastify initialization
const fastify = Fastify({ logger: true });

//CORS
await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Authorization",
  ],
});

//Register Mongoose Plugin
fastify.register(mongoosePlugin, {
  uri: process.env.DATABASE_URL,
  options: {},
});

//Register tasks route
fastify.register(routes, { prefix: "/tasks" });

//Start the server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    fastify.log.info(`Server listening at ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
