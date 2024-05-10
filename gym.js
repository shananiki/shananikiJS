require ('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

const app = express();
// ejs
app.set("view engine", "ejs");


// statische files
app.use(express.static('public'));

// database vars from .env
var DB_HOST = process.env.DB_HOST;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_DATABASE = process.env.DB_DATABASE;
var DB_USER = process.env.DB_USER;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

app.get('/lamps', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const sql = `SELECT * FROM lamps`;
        const [rows] = await connection.execute(sql); 

        connection.release();

        res.json({ lamps: rows });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching lamps');
    }
});

app.get('/lamps2', async (req, res) => {
try {
    const connection = await pool.getConnection();

    const sql = `SELECT * FROM lamps`;
    const [rows] = await connection.execute(sql); 

    connection.release();

    // Pass the retrieved lamps data to the EJS template
    res.render('lamps', { title: "Lamps", lamps: rows });

} catch (error) {
    console.error(error);
    res.status(500).send('Error fetching lamps');
}
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));


app.get('/', (req, res) => {
    res.render('index', { title: "Test"});
});

