// src/config.jsx
const config = {
    database: {
        username: 'Thejokers69',
        password: process.env.DB_PASSWORD,
        database: 'fruit-grading',
        host: 'localhost',
        dialect: 'mysql',
    }
};

export default config;