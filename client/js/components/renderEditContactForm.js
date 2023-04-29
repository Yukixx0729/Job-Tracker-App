import { renderSingleContact, createButtonContainer, displayAllContactsBtn } from "./renderContactsList.js"

const editContactForm = (id) => {
  return axios.get(`/contacts/${id}`)
    .then(res => {
    const contact = res.data 
    console.log(res.data)
    const page = document.getElementById('page')
    page.innerHTML = ''
    createButtonContainer()
    displayAllContactsBtn()
    const formContainer = document.createElement("div")
    formContainer.classList="container mt-4"
    document.getElementById("nonLetterContainer").insertAdjacentElement('afterbegin', formContainer)

    formContainer.innerHTML = `
    <form id="edit-contact-form">
      <h2 id = "create-title" > Edit contact </h2>
      <div class="form-group"> 
        <label for="contactName"> Name </label>
        <input type="text" name="contactName" value="${contact.contact_name}"></input>
      </div>
      <div class="form-group"> 
        <label for="companyName"> Company </label>
        <input type="text" name="companyName" value="${contact.company_name}"></input>
      </div>
      <div class="form-group"> 
        <label for="email"> Email </label>
        <input type="email" name="email" value="${contact.email}"></input>
      </div>
      <div class="form-group"> 
        <label for="phoneNumber"> Phone No. </label>
        <input type="number" name="phoneNumber" value="${contact.phone_number}"></input>
      </div>
      <div class="form-group"> 
        <label for="notes"> Notes </label>
        <textarea id="notes" name="notes" rows="6"">${contact.notes}</textarea>
      </div>
      <div class="form-group"> 
        <button type ="submit"> Save </button>
      </div>
    </form>
  `
  document.getElementById("buttonContainer").insertAdjacentElement('beforeend', formContainer)
  document.getElementById("nonLetterContainer").classList="row justify-content-center"
  document.getElementById("displayAllContactsBtn").classList = "mb-1 mt-3 btn btn-secondary col-md-3 col-sm-4 col-11"
  document.getElementById("edit-contact-form").addEventListener("submit", (event) => handleEditContact(event, contact.id))
  })
}

function handleEditContact(event, id) {
  event.preventDefault()
  const formData = new FormData(event.target)

  const body = {
    contactName: formData.get("contactName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    notes: formData.get("notes")
  }

  return axios.put(`/contacts/${id}`, body)
  .then(() => {
    return axios.get(`/contacts/${id}`)
    .then((contactData) => {
      const contact = contactData.data
      renderSingleContact(contact)
      console.log(contact)
    })
    .catch(err => {
      console.error(err)
    })
  })
  .catch(err => {
    console.error(err)
  })
}

export default editContactForm

