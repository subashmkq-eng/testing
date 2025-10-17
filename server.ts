const mysql = require('mysql2');
const express = require('express');

const app = express();
const PORT = 3001;

const createConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123Asd!@#',
  database: 'salesdb'
});

createConnection.connect((err:any) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database');
});

app.get('/', (req:any, res:any) => {
  const query = 'SHOW TABLES';

  createConnection.query(query, (err:any, results:any) => {
    if (err) {
      return res.status(500).send(`<h1>Error fetching tables: ${err.message}</h1>`);
    }

    // Extract table names dynamically
    const tableNames = results.map((row:any) => Object.values(row)[0]);
    const tableList = tableNames.length ? tableNames.join(', ') : 'No tables found';

    res.send(`
      <h1>Server is running!!!</h1>
      <h2>Available Tables:</h2>
      <p>${tableList}</p>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
