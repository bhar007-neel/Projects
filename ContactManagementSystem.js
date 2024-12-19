const prompt = require("prompt-sync")()
function printInfo() {
    console.log("Contact Management System")
    console.log("-------------------------")
    console.log("1. Add a contact")
    console.log("2. Delete a contact")
    console.log("3. View Contacts ")
    console.log("4. Search Contacts")
    console.log("5. Exit")

}
function addContact(){
    const name = prompt("name: ")
    const email= prompt("Email:  ")
    const contact={
        name : name,
        email:email
    }

    contacts.push(contact)
}
function deleteContact(){
    console.log("contact ids")
    for(let i =0; i < contacts.length;i++){
        const contact = contacts[i]
        console.log((i+1).toString()+":",contact.name)
    }
    const number =parseInt(prompt("enter a ID: "))
    if(isNaN(number) ||number > contacts.length){
        console.log("invalid ID")
        return
    }
    contacts.splice(number-1,1)
    console.log("removed")
}
function searchContact(){
    const searchString = prompt("search = ").toLowerCase()
    const result=[];

    for (let contact of contacts){
        if(contact.name.toLowerCase().includes(searchString)) result.push(contact)
    }
    console.log(result)



}
function listContacts(contacts){
    for (let contact of contacts){
        console.log("Name: ",contact.name)
        console.log("email : ",contact.email)
    }
}
printInfo()

const contacts =[]


let flag= true
while (flag) {
    const number = prompt("enter a operaions (1-5)")
    switch (number) {
        case "1":
            addContact()
            break
        case "2":
            deleteContact()
            break
        case "3":
            listContacts(contacts)
            break
        case "4":
            searchContact()
            break
        case "5":
            break
        default:
            console.log("invalid input")
            flag=false;

    }
}

