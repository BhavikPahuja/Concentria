// src/server.ts
import app from "./app";
import { port } from "./config";
import { exec } from "child_process";
import logger from "./utils/logger";

const killPort = (port: number) => {
  return new Promise<void>((resolve, reject) => {
    const platform = process.platform;
    let command = "";

    if (platform === "win32") {
      command = `for /F "tokens=5" %i in ('netstat -ano ^| findstr :${port} ^| findstr LISTENING') do taskkill /F /PID %i`;
    } else {
      // Modified command to handle Unix-based systems correctly
      command = `lsof -t -i:${port} | xargs -r kill -9`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (stderr.includes("No such process") || stderr.trim() === "") {
          logger.info(stdout);
          resolve(); // No process was using the port
        } else {
          logger.info(stdout);
          reject(`Error killing process on port ${port}: ${stderr}`);
        }
      } else {
        resolve();
      }
    });
  });
};

// Kill the process using the port and then start the server
killPort(port)
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
