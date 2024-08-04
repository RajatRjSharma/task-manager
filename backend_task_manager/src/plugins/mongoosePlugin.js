import mongoose from "mongoose";

/**
 * Mongoose plugin to inject mongoose db in fastify.
 *
 * @param {*} fastify : Fastify object
 * @param {*} options  : Other config
 */
export default async function mongoosePlugin(fastify, options) {
  const { uri, options: mongooseOptions } = options;

  try {
    await mongoose.connect(uri, mongooseOptions);
    fastify.log.info("MongoDB connected");

    fastify.decorate("mongoose", mongoose);

    fastify.addHook("onClose", async (_, done) => {
      await mongoose.disconnect();
      done();
    });
  } catch (err) {
    fastify.log.error("MongoDB connection error:", err);
    throw err;
  }
}
