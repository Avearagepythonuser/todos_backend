import express from "express"
import dotenv from "dotenv"
import connection from "./src/db/configDatabase.js"
import cors from "cors";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

app.get("/todos", async (req, res) => {
    try {
        const sql = "SELECT * FROM todolist ORDER BY timestamp;"
        const [rows, fields] = await connection.execute(sql);
        res.status(200).json(rows)
    } catch (err) {
        console.log(err)
    }
})

app.post("/todos", async (req, res) => {
    try {
        const {task} = req.body
        const sql = "INSERT INTO todolist (task) VALUES (?)"
        const [rows, fields] = await connection.execute(sql, [task]);
        res.status(201).json({msg: "Sikeres hozzáadás"})
    } catch (err) {
        console.log(err)
    }
})

app.patch("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const sql = "UPDATE todolist SET complete=NOT complete WHERE id=?"
        const [rows, fields] = await connection.execute(sql, [id]);
        res.status(200).json({msg: "Sikeres hozzáadás"})
    } catch (err) {
        console.log(err)
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const sql = "DELETE FROM `todolist` WHERE id=?"
        const [rows, fields] = await connection.execute(sql, [id]);
        res.status(200).json({msg: "Sikeres hozzáadás"})
    } catch (err) {
        console.log(err)
    }
})

app.post("/todos/login", (req, res) => {
    const {username, password} = req.body;
    if (username == process.env.LOGIN_USERNAME && password == process.env.LOGIN_PASSWORD) {
        res.status(200).json({success: true, msg:"Sikeres bejelentkezés!"})
    } else {
        res.status(400).json({success: false, msg:"Sikertelen bejelentkezés"})
    }
})

app.listen(PORT, ()=> console.log(`Szerver is listening on port: ${PORT}...`))