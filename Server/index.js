let express = require("express");
require("dotenv").config();
let neojsAccess = require("./neojsAccess");
const bodyParser = require("body-parser");
const portNumber = 3000;
let app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", getHandler);

let Neo = new neojsAccess(
  process.env.NEO_USER,
  process.env.NEO_URI,
  process.env.NEO_PASS
);

function getHandler(request, response) {
  response.sendFile(__dirname + "/public/index.html");
}

app.listen(portNumber, () => {
  console.log(`Server is running at port ${portNumber}`);
});

app.post("/addRelationship", async (request, response) => {
  console.log("in add");
  const person1FirstName = request.body.person1FirstName;
  const person1LastName = request.body.person1LastName;
  const person2FirstName = request.body.person2FirstName;
  const person2LastName = request.body.person2LastName;

  try {
    await Neo.addRelationship(
      person1FirstName,
      person1LastName,
      person2FirstName,
      person2LastName
    );
    response.send("Relationship added successfully!");
  } catch (error) {
    console.error("Failed to add relationship:", error);
    response
      .status(500)
      .send("An error occurred while adding the relationship.");
  }
});

app.get("/api/graphData", async (req, res) => {
  try {
    const graphData = await Neo.fetchGraphData();

    //res.send("hello");
    res.send(graphData);
  } catch (error) {
    console.error("Failed to fetch graph data:", error);
    res.status(500).send(error.message);
  }
});
