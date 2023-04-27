import { renderContacts } from "./renderContactsList.js"

const addContactForm = () => {
  const page = document.getElementById('page')
  page.innerHTML = `
  <form id="add-contact-form">
  <h2>Add New Contact</h2>
  <div class="form-group"> 
    <label for="contactName"> Name </label>
    <input type="text" name="contactName"></input>
  </div>
  <div class="form-group"> 
    <label for="companyName"> Company </label>
    <input type="text" name="companyName"></input>
  </div>
  <div class="form-group"> 
    <label for="email"> Email </label>
    <input type="email" name="email"></input>
  </div>
  <div class="form-group"> 
  <label for="phoneNumber"> Phone No. </label>
  <input type="number" name="phoneNumber"></input>
</div>
<div class="form-group"> 
<label for="notes"> Notes </label>
<textarea id="notes" name="notes" rows ="6"></textarea>
</div>
<div class="form-group"> 
  <button type ="submit"> Add Contact </button>
<div class="form-group">   
</form>
`
console.log(document.getElementById("add-contact-form"))
document.getElementById("add-contact-form").addEventListener("submit", handleAddContact)
}

function handleAddContact(event) {
  event.preventDefault()
  console.log(event)

  const formData = new FormData(event.target)
  console.log(formData)

  const body = {
    contactName: formData.get("contactName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    notes: formData.get("notes")
  }
  console.log(body)

  return axios.post('/contacts', body)
  .then(res => {
    console.log(res.status)
    renderContacts()
  })
  .catch(err => {
    console.error(err)
  })
}

export default addContactForm


