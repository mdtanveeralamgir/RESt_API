const express = require("express"); //Importing express
const joi = require("joi"); //Importing joi
const app = express(); //Create express Application on the app variable
app.use(express.json()); //Used the json file

//give data to the server
const customers = [
  { title: "George", id: 1 },
  { title: "Jost", id: 2 },
  { title: "Tyler", id: 3 },
  { title: "Alice", id: 4 },
  { title: "Candice", id: 5 },
];
//Read request handlers
//Display the message when the URL consists of '/'
app.get("/", (req, res) => {
  res.send("Welcome to Edurekas rest api!");
});

//Display the list of customers when url consists of api customers
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

//Display the specific customers when url consists of api customers
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  //If there is no valid customer ID, then display an error message
  if (!customers) res.status(404).send("<h2> No customer found</h2>");
  res.send(customer);
});

//Create request handler
//Create new customer information
app.post("/api/customers", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = {
    id: customers.length + 1,
    title: req.body.title,
  };
  customers.push(customer);
  res.send(customer);
});

//Validate customer information
function validateCustomer(customer) {
  const schema = {
    title: joi.string().min(3).required(),
  };
  return joi.validate(customer, schema);
}
//Port environment variables
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port ${port}..."));
