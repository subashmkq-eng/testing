const mysql = require('mysql2');
const express = require('express');

const app = express();
const PORT = 3001;

const createConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123Asd!@#',
    database: 'salesdb'
})

createConnection.connect((err:any) => {
    if(err) throw err;
    console.log('✅ Connected to MySQL database');
})

app.get('/', (req:any, res:any) => {
    res.send('<h1>Server is running!</h1>');
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
