const http = require("http");
const app = require("./app");

const startServer = (port) => {
    const server = http.createServer(app);

    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            const fallbackPort = 5000;
            console.warn(`Port ${port} is busy. Retrying on port ${fallbackPort}...`);
            startServer(fallbackPort);
            return;
        }
        throw error;
    });

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    return server;
};

const port = Number(process.env.PORT) || 3000;
startServer(port);

module.exports = app;