const fs = require("fs");
const path = require("path");
// const {promises: fsPromises} = fs;


const contactsPath = path.join(__dirname, "./db/contacts.json")

// async function listContacts() {
//     try{
//         const allContacts = await fsPromises.readFile
//         (path.join(__dirname, './db/contacts.json'), 'utf8')
//         console.log('contactsRead', allContacts)
//         // const contactWrite = await fsPromises.writeFile('new.txt', 'help me\n')
        
//     } catch (err){
//         console.log('err', err)
//     }
// }
function listContacts () {
    fs.readFile('./db/contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            console.table(parsedContent)
        } catch (error){
            console.log("listCont err", err)
        }
    })
}
function getContactById (contactId) {
    fs.readFile('./db/contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            const findContact = parsedContent.find(item => item.id === contactId)
            console.log('findContact', findContact)
        } catch (error){
            console.log("getContact err",err)
        }
    })
}

function removeContact(contactId) {
    fs.readFile('./db/contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            const deleteContact = parsedContent.filter(item => item.id != contactId)
            const newContacts = JSON.stringify(deleteContact)
            fs.writeFile(contactsPath, newContacts, () => {
                console.log("Contact was removed.");
              });
              console.table(deleteContact);
        } catch (error){
            console.log("removeContact err",err)
        }
    })
  }

function addContact(name, email, phone) {
    fs.readFile('./db/contacts.json', 'utf-8', function (err, content) {
        try{
            const parsedContent = JSON.parse(content)
            const newContact = {id: 1, name, email, phone}
            const addContactt = [newContact, ...parsedContent ]
            fs.writeFile(contactsPath, JSON.stringify(addContactt), () => {
                console.log("Contact was added.");
              });
              console.table(addContactt);
        } catch (error){
            console.log("addContact err",err)
        }
    })
}
    


module.exports = {
    contactsPath,
    listContacts,
    getContactById,
    removeContact,
    addContact
}