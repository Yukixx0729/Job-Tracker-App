import { renderContacts, createButtonContainer, displayAllContactsBtn } from "./renderContactsList.js"

const addContactForm = () => {
  const page = document.getElementById('page')
  page.innerHTML = ''
  createButtonContainer()
  displayAllContactsBtn()
  const formContainer = document.createElement("div")
  formContainer.classList="container mt-4"
  document.getElementById("nonLetterContainer").insertAdjacentElement('afterbegin', formContainer)

  formContainer.innerHTML = `
  <form id="add-contact-form">
  <h2 id = "create-title" > Add contact </h2> 
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
  document.getElementById("buttonContainer").insertAdjacentElement('beforeend', formContainer)
  document.getElementById("nonLetterContainer").classList="row justify-content-center"
  document.getElementById("displayAllContactsBtn").classList = "mb-1 mt-3 btn btn-secondary col-md-3 col-sm-4 col-11"
  document.getElementById("add-contact-form").addEventListener("submit", handleAddContact)
}

function handleAddContact(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  const body = {
    contactName: formData.get("contactName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    notes: formData.get("notes")
  }

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


