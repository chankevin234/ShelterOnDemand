const pg = require("pg");

const config = {
  host: "kevin-khubaib-instance.postgres.database.azure.com",
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: "Username",
  password: "#12345678a",
  database: "kevin-khubaib-instance",
  port: 5432,
  ssl: true,
};

const client = new pg.Client(config);

client.connect((err) => {
  if (err) throw err;
  else {
    console.log("Hi there");
    queryDatabase(); // will need to change...
  }
});

function queryDatabase() {
  //create and insert tables
  const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
    `;

  client
    .query(query)
    .then(() => {
      console.log("Table created successfully!");
      client.end(console.log("Closed client connection"));
    })
    .catch((err) => console.log(err))
    .then(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}

function addBooking() {
  const query = `
      UPDATE inventory 
      SET quantity= 1000 WHERE name='banana';
  `;

  client
    .query(query)
    .then((result) => {
      console.log("Update completed");
      console.log(`Rows affected: ${result.rowCount}`);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
