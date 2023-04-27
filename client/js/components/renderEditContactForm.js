import { renderSingleContact, renderContacts } from "./renderContactsList.js"

const editContactForm = (id) => {
  return axios.get(`/contacts/${id}`)
    .then(res => {
    const contact = res.data 
    console.log(res.data)
    const page = document.getElementById('page')

    page.innerHTML = `
    <button id="displayAllContactsBtn" class="btn btn-secondary mb-3"> Return to Contacts </button>
    <form id="edit-contact-form">
    <h2>Edit Contact</h2>
    <div>
      <label for="contactName"> Name </label>
      <input type="text" name="contactName" value="${contact.contact_name}"></input>
    </div>
    <div>
      <label for="companyName"> Company </label>
      <input type="text" name="companyName" value="${contact.company_name}"></input>
    </div>
    <div>
      <label for="email"> Email </label>
      <input type="email" name="email" value="${contact.email}"></input>
    </div>
    <div>
    <label for="phoneNumber"> Phone No. </label>
    <input type="number" name="phoneNumber" value="${contact.phone_number}"></input>
  </div>
  <div>
  <label for="notes"> Notes </label>
  <input type="text" name="notes" value="${contact.notes}"></input>
  </div>
    <button type ="submit"> Save </button>
  </form>
  `
  document.getElementById("edit-contact-form").addEventListener("submit", (event) => handleEditContact(event, contact.id))
  document.getElementById("displayAllContactsBtn").addEventListener("click", renderContacts)
  })
}

function handleEditContact(event, id) {
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

