const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(3000 || process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

module.exports = server;