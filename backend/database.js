const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "database.json");

function readDatabase() {
    const data = fs.readFileSync(databasePath, "utf-8");
    return JSON.parse(data);
}

function writeDatabase(data) {
    fs.writeFileSync(
        databasePath,
        JSON.stringify(data, null, 2)
    );
}

module.exports = {
    readDatabase,
    writeDatabase
};