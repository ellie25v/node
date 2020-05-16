const fs = require("fs");
const path = require("path");
// const {promises: fsPromises} = fs;


const contactsPath = path.join(__dirname, "./contacts.json")

function listContacts(req, res) {
    fs.readFile('./contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            console.table(parsedContent)
            res.send(parsedContent);
        } catch (err){
            console.log("listCont err", err)
        }
    })
}
function getContactById({ req, res, contactId }) {
    fs.readFile('./contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            console.log("a", Number(contactId))
            const findContact = parsedContent.find(item => item.id === Number(contactId))
            if (findContact) {
                res.send(findContact);
              } else {
                res.status(404).send({ message: "Not found" });
              }
            console.log('findContact', findContact)
        } catch (err){
            console.log("getContact err",err)
            // res.status(404).send({ message: "Not found" });
        }
    })
}

function removeContact({req, res, contactId }) {
    fs.readFile('./contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            const contact = parsedContent.find((item) => item.id == contactId);
            if (!contact) {
                 resp.status(404).send({ message: "Not found" });
            } else{
            const deleteContact = parsedContent.filter(item => item.id != contactId)
            const newContacts = JSON.stringify(deleteContact)
            fs.writeFile(contactsPath, newContacts, () => {
                console.log("Contact was removed.");
              });
              console.table(deleteContact);
              res.status(200).send({ message: "contact deleted" });}
        } catch (err){
            console.log("removeContact err",err)
            res.status(404).send({ message: "Not found" });
        }
    })
  }

function addContact({ name, email, phone, res }) {
    fs.readFile('./contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            const newContact = {id: 11, name, email, phone}
            const addContactt = [ ...parsedContent, newContact ]
            fs.writeFile(contactsPath, JSON.stringify(addContactt), () => {
                console.log("Contact was added.");
              });
              console.table(addContactt);
              res.status(201).send(addContact);
        } catch (err){
            console.log("addContact err",err)
            res.send(err);
        }
    })
}
function updateContact({ req, res, id }) {
    fs.readFile('./contacts.json', 'utf-8', function (err, content) {
    try {
    const parsedContent = JSON.parse(content)
      const contact = parsedContent.find((item) => item.id == id);
      if (contact == -1) {
        res.status(404).send({ message: "Not found" });
      } else {
          console.log("body", req.body)
        const a = Object.assign(contact , { ...req.body });
        const index = parsedContent.indexOf(contact);
        parsedContent[index] = a
        fs.writeFile(contactsPath, JSON.stringify(parsedContent), () => {
            res.send(a);
          })
        }
    } catch (err){
        console.log("update err",err)
        res.send(err);
  }})}


module.exports = {
    contactsPath,
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}