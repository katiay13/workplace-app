// Connection between database and app

import pkg from "pg";
const { Client } = pkg;

// Create client
let client;

if (!global._dbClient) {
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    client.connect();
    global._dbClient = client;
} else {
    client = global._dbClient;
}

export default client;