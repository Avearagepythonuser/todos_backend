import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const envFile = process.env.NODE_ENV == "production" ? ".env.production" : ".env.local"

const myConfig={
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

let connection;

try {
    connection = mysql.createPool(myConfig);
    await connection.execute("SELECT 1")
    console.log("Sikeres adatbázis kapcsolódás")
} catch (err) {
    console.log(err)
    process.exit(1)
}

export default connection;