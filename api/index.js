const pg = require("pg");

const config = {
  host: "kevin-khubaib-instance.postgres.database.azure.com",
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: "Username@kevin-khubaib-instance",
  password: "#12345678a",
  database: "postgres",
  port: 5432,
  ssl: true,
};

//List of all the functions
//----------------------------------------
//- Insert shelter data
//- update shelter data
//- delete shelter data
//- retrieve shelter data
//- insert homeless
//- update homeless
//- delete homeless
//- update shelter count

const client = new pg.Client(config);

// client
//   .connect()
//   .then(() => console.log("Connected Successfully!"))
//   .catch((e) => console.log(e))
//   .finally(() => client.end());

client.connect((err) => {
  if (err) throw err;
  else {
    console.log("Hi there");
    //queryDatabase(); // will need to change...
    //addInventory();
    //createShelterDatabase();
    //createHomelessDatabase();
    createBookingsDatabase();
    //viewTable();
    //client.then(() => viewTable();)
    // addBooking();
  }
});

function addInventory() {
  const query = `
    INSERT INTO inventory (name, quantity) VALUES ('pineapples', 35);
    `;

  client
    .query(query)
    .then(() => {
      console.log("Successfully added item to inventory");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Ending adding process.");
      process.exit();
    });
}

function createShelterDatabase() {
  //create and insert tables
  const query = `
        DROP TABLE IF EXISTS inventory;
        DROP TABLE IF EXISTS shelters;
        CREATE TABLE shelters (shelterId UUID PRIMARY KEY, shelterName VARCHAR(100), location VARCHAR(100), capacity INTEGER);
        SELECT * FROM shelters;
    `;

  client
    .query(query)
    .then((result) => {
      console.log("Shelter Table created successfully!");
      console.table(result.rows);
      client.end(console.log("Closed client connection"));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}

function createHomelessDatabase() {
  //create and insert tables
  const query = `
        DROP TABLE IF EXISTS inventory;
        DROP TABLE IF EXISTS homeless;
        CREATE TABLE homeless (personID UUID PRIMARY KEY, name VARCHAR(100), email VARCHAR(75) UNIQUE);
        SELECT * FROM homeless;
    `;

  client
    .query(query)
    .then((result) => {
      console.log("Homeless Table created successfully!");
      console.table(result.rows);
      client.end(console.log("Closed client connection"));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}

function createBookingsDatabase() {
  //create and insert tables
  const query = `
        DROP TABLE IF EXISTS bookings
        CREATE TABLE bookings (bookingID UUID PRIMARY KEY, personID VARCHAR(75), bookingID VARCHAR(75), startDate DATE, endDate DATE,);
        SELECT * FROM bookings;
    `;

  client
    .query(query)
    .then((result) => {
      console.log("Homeless Table created successfully!");
      console.table(result.rows);
      client.end(console.log("Closed client connection"));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}

function viewTable() {
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  const query = "SELECT * FROM inventory;";

  client
    .query(query)
    .then((res) => {
      console.table(res.rows);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
}

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
    .finally(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}
