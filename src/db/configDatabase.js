import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const myConfig={
    host: process.env.DB_HOST,
    user: process.env.DB_USETNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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