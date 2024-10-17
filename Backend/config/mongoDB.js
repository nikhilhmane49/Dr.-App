const mongoose = require('mongoose');

const configmongo = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Db connected successfully");
    });

     // Handling error
        mongoose.connection.on('error', (err) => {
            console.error('Connection error:', err);
        });

    // Correct the connection string by removing the extra `/DrApp` if it's already part of the environment variable
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = configmongo;