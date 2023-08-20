const redis = require('redis');

// Specify Redis server connection options
const redisOptions = {
    host: 'localhost', // Change to your Redis server's host
    port: 6379 // Change to your Redis server's port
};

// Create the Redis client instance
const client = redis.createClient(redisOptions);

// Handle Redis client connection events
client.on('connect', () => {
    console.log('Connected to Redis server');
});

client.on('error', (error) => {
    console.error('Redis Error:', error);
});

// Use the Redis client
async function someFunction() {
    try {
        // Wait for the client to be ready (optional)
        console.log("hi")
        await new Promise((resolve) => client.once('ready', resolve));

        // Use Redis operations here
        
    } catch (error) {
        console.error('Error:', error);
    }
}
client.on('connect', () => {
    console.log('Connected to Redis server');
});

// Call the function
someFunction();
