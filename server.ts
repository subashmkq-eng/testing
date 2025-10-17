const mysql = require('mysql2/promise');
const express = require('express');

const app = express();
const PORT = 3001;

// ✅ Connection info
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123Asd!@#',
  database: 'salesdb'
};

app.get('/', async (req:any, res:any) => {
  try {
    // Create connection each time (serverless safe)
    const connection = await mysql.createConnection(dbConfig);

    const [results] = await connection.execute('SHOW TABLES');
    await connection.end();

    const tableNames = results.map((row:any) => Object.values(row)[0]);
    const tableList = tableNames.length ? tableNames.join(', ') : 'No tables found';

    res.send(`
      <h1>Server is running!!!</h1>
      <h2>Available Tables:</h2>
      <p>${tableList}</p>
    `);
  } catch (err:any) {
    res.status(500).send(`<h1>Error fetching tabless: ${err.message}</h1>`);
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
