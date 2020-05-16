const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Joi = require("joi");
const contacts = require("./contacts.js");
const PORT = 3002;


const server = express()

server.use(cors());
server.use(express.json());
server.use(express.static("public"));
server.use(morgan('dev'))
// server.use(express.urlencoded());


server.get('/api', (req, res) => {
    res.send({method: 'GET'})
})

server.get("/", function (req, res) {
    res.send("Hello World");
  });
server.get("/api/contacts", (req, res) => {
    contacts.listContacts(req, res);
  });
server.get("/api/contacts/:contactId", (req, res) => {
    contacts.getContactById({ req, res, contactId: req.params.contactId });
  });



server.post(
    "/api/contacts",
    (req, res, next) => {
      const validationContact = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
      });
      const validationResult = Joi.validate(req.body, validationContact);
      if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
      } else {
        next();
      }
    },
    (req, res) => {
      contacts.addContact({ ...req.body, res });
    }
  );
  
  server.delete("/api/contacts/:contactId", (req, res) => {
    const contactId = req.params.contactId;
    contacts.removeContact({ res, contactId });
  });
  
  server.patch(
    "/api/contacts/:contactId",
    (req, res, next) => {
      const validationContact = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
      });
      const validationResult = Joi.validate(req.body, validationContact);
      if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
      } else {
        next();
      }
    },
    (req, res) => {
      const id = req.params.contactId;
      contacts.updateContact({ req, res, id });
    }
  );

  
  
  server.listen(PORT, () => {
    console.log("started at ", PORT);
  });