const pg = require("pg");
const { v4: uuidv4 } = require("uuid");

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
//- (*) CREATE 3 Tables: Booking, Homeless, Shelter

//- (*)Insert shelter data (arguments: name, location, capacity)
//- update shelter data (arguments: id, name, location, capacity)
//- delete shelter data (arguments: id)
//- (*) retrieve shelter data (arguments: id)
//- (*) insert homeless: (arguments: name, email)
//- update homeless: (arguments: id, name, email)
//- delete homeless: (arguments: id)
//- (*) retrieve homeless: (arguments: id)
//- (*) create booking: (arguments: shelterID, homelessID, startDate, startTime, endDate, endTime)
//- (*) retrieve booking: (arguments: shelterID)
//- delete booking (arguments: shelterID)

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
    //createShelterDatabase();
    //createHomelessDatabase();
    //createBookingsDatabase();
    // insertShelterData(
    //   "Not the Covenant House",
    //   "21 Gerrard St E, Toronto, ON M5B 2P3",
    //   50
    // );
    //insertHomelessData("Edmund", "ed@gmail.com");
    updateShelter("21 Gerrard St E, Toronto, ON M5B 2P3", null, null, 75);
    //viewShelterTable();
    //viewBookingTable();
    //viewHomelessTable();
    //client.then(() => viewTable();)
    // addBooking();
  }
});

// ----- CREATE Tables
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
          CREATE TABLE homeless (personID UUID PRIMARY KEY, name VARCHAR(100), email VARCHAR(75));
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
          DROP TABLE IF EXISTS bookings;
          CREATE TABLE bookings (bookingID UUID PRIMARY KEY, personID VARCHAR(75), shelterID VARCHAR(75), startDate DATE, startTime TIME, endDate DATE, endTime TIME);
          SELECT * FROM bookings;
      `;

  client
    .query(query)
    .then((result) => {
      console.log("Booking Table created successfully!");
      console.table(result.rows);
      client.end(console.log("Closed client connection"));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Finished execution, exiting now");
      process.exit();
    });
}

// ----- DATA INSERTING FUNCTIONS
function insertShelterData(shelterName, place, max) {
  // const query = `
  //   INSERT INTO shelters (shelterName, location, capacity)
  //   VALUES ("${shelterName}", "${place}", ${max});
  //   `;

  var query =
    "INSERT INTO shelters (shelterid, shelterName, location, capacity) VALUES ($1, $2, $3, $4);";
  var values = [uuidv4(), shelterName, place, max];

  client
    .query(query, values)
    .then(() => {
      console.log("Successfully added new shelter to shelters table");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Ending adding process.");
      process.exit();
    });
}

function insertHomelessData(name, email) {
  var query = `
      INSERT INTO homeless (personID, name, email)   
      VALUES ($1, $2, $3);
      `;
  var values = [uuidv4(), name, email];

  client
    .query(query, values)
    .then(() => {
      console.log("Successfully added homeless to homeless table");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Ending adding process.");
      process.exit();
    });
}

function insertBooking(
  personID,
  shelterID,
  startDate,
  startTime,
  endDate,
  endTime
) {
  var query = `
    INSERT INTO bookings (personID, shelterID, startDate, startTime, endDate, endTime)   
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
  var values = [
    uuidv4(),
    personID,
    shelterID,
    startDate,
    startTime,
    endDate,
    endTime,
  ];

  client
    .query(query, values)
    .then(() => {
      console.log("Successfully added homeless to homeless table");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log("Ending adding process.");
      process.exit();
    });
}

function viewShelterTable() {
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  const query = "SELECT * FROM shelters";
  client
    .query(query)
    .then((res) => {
      console.table(res.rows);
      console.log(res.fields[0].name);
      console.log(res.fields[1].name);
      console.log(res.fields[2].name);
      console.log(res.fields[3].name);
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
}

function viewHomelessTable() {
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  const query = "SELECT * FROM homeless";
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

function viewBookingTable() {
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  const query = "SELECT * FROM bookings";
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

function updateShelter(location, newName, newLocation, newCapacity) {
  //   var query = "SELECT (shelterName, capacity) FROM shelters WHERE location=$1;";
  //   var values = [location];

  var query = {
    text: "SELECT shelterName FROM shelters WHERE location=$1;",
    values: [location],
    rowMode: "array",
  };

  var previousName = " ";
  client
    .query(query)
    .then((result) => {
      previousName = result.rows[0][0];
      if ((newName = null)) {
        newName = previousName;
      }

      query = {
        text: "SELECT capacity FROM shelters WHERE location=$1;",
        values: [location],
        rowMode: "array",
      };

      var previousCapacity = 0;
      client
        .query(query)
        .then((result) => {
          previousCapacity = result.rows[0][0];
          if ((newCapacity = null)) {
            newCapacity = previousCapacity;
          }
          if ((newLocation = null)) {
            newLocation = location;
          }

          console.log(newName);
          console.log(newCapacity);
          console.log(newLocation);

          query = {
            text: "UPDATE shelters SET (shelterName=$1, location=$2, capacity=$3) WHERE location=$4;",
            values: [newName, newLocation, newCapacity, location],
            rowMode: "array",
          };

          client
            .query(query)
            .then(() => {
              console.log("Successful in update.");
            })
            .catch((err) => {
              console.log(err);
              throw err;
            })
            .finally(() => {
              console.log("Successfully updated");
              process.exit();
            });
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          console.log("Capacity Found");
        });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      console.log("Name found");
    });
}
