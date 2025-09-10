const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Update with your RDS credentials
const db = mysql.createConnection({
    host: 'emaildb.c1kamcgswows.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'emaildb'
});

db.connect(err => {
    if (err) console.log('DB Connection Error:', err);
    else console.log("Connected to RDS");
});

app.post('/add-email', (req, res) => {
    const { email } = req.body;
    db.query("INSERT INTO emails(email) VALUES(?)", [email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Email added");
    });
});

app.get('/emails', (req, res) => {
    db.query("SELECT * FROM emails", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.delete('/delete-email/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM emails WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Email deleted");
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
