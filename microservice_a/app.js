// require MySQL for microservice A
const mysql = require('mysql')

// run microservice A at port 4282
const PORT = 4282; 

// provide login credential to access MySQL database
const pool = mysql.createPool({
    connectionLimit: 10,
    host            : 'sql5.freemysqlhosting.net',
    user            : 'sql5700621',
    password        : '59aLYtEn31',
    database        : 'sql5700621'
});

// require express and cors, initialize express and name it app
const express = require('express');   
const cors = require('cors') 
const app = express();      

// instance of express app will be used to make request for data from MySQL database and process json objects
app.use(express.json())
app.use(cors())

// GET the 30 most entered weights
app.get('/past-weight', (req, res) => {
    const query = 'SELECT Weight FROM Weights ORDER BY Weight DESC LIMIT 30';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// GET the average of the 30 most entered weights
app.get('/past-weight-avg', (req, res) => {
    const query = 'SELECT AVG(Weight) as averageWeight FROM (SELECT * FROM Weights ORDER BY date DESC Limit 30) AS AVERAGE';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// turn on microservice A
app.listen(PORT, () => { 
    console.log(`Microservice A is live at port ${PORT}`);
});