import renderContacts from "./renderContactsList.js"

const addContactForm = () => {
  const page = document.getElementById('page')
  page.innerHTML = `
  <form id="add-contact-form">
  <h2>Add New Contact</h2>
  <div>
    <label for="contactName"> Name </label>
    <input type="text" name="contactName"></input>
  </div>
  <div>
    <label for="companyName"> Company </label>
    <input type="text" name="companyName"></input>
  </div>
  <div>
    <label for="email"> Email </label>
    <input type="email" name="email"></input>
  </div>
  <div>
  <label for="phoneNumber"> Phone No. </label>
  <input type="number" name="phoneNumber"></input>
</div>
<div>
<label for="notes"> Notes </label>
<input type="text" name="notes"></input>
</div>
  <button type ="submit"> Add Contact </button>
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


