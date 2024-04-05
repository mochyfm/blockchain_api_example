import { runServer, stopServer } from "./server/server";

const startApplication = () => {
    runServer();
}

const stopApplication = () => {
    console.log("\n Recieving kill signal, shutting down...")
    stopServer();
    process.exit(0);
}

process.on("SIGINT", () => stopApplication());
process.on("SIGTERM", () => stopApplication());
process.on('exit', () => console.log('Existing Express Server'));

startApplication();