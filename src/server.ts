import app from "./app";

const start = async () => {
  try {
    await app.listen({
      host: "0.0.0.0",
      port: 3000,
    });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
