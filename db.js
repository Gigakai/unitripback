import mysql2 from "mysql2";
import dotenv from 'dotenv';

dotenv.config();


const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})



connection.connect((err) => {
    if (err) {
        console.error(err);
    }else{
        console.log("Connected successfully");
    }
});


export default connection;