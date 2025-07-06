export const fetchListOfContact=async()=>{
const ApiResponce=await fetch('http://localhost:3001/api/contacts');
const contactList=await ApiResponce.json();
return contactList;
}