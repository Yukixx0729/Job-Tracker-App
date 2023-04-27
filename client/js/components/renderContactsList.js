import addContactForm from "./renderAddContactForm.js"
import editContactForm from "./renderEditContactForm.js"
import deleteContact from "./deleteContact.js"

const page = document.getElementById("page")

const toggleDetails = (contactItem) => {
  const contactDetails = contactItem.querySelector(".contact-details")
  if (contactDetails.style.display === "none") {
    contactDetails.style.display = "block"
  } else {
    contactDetails.style.display = "none"
  }
}

const displayAllContactsBtn = () => {
  const displayAllContactsBtn = document.createElement("button")
  displayAllContactsBtn.id = "displayAllContactsBtn"
  displayAllContactsBtn.textContent = "Return to Contacts"
  displayAllContactsBtn.classList.add("btn", "btn-secondary", "mb-3")
  page.appendChild(displayAllContactsBtn)
  displayAllContactsBtn.addEventListener("click", renderContacts)
}

const showContactByLetter = (letter) => {
  page.innerHTML = ''
  renderAddContactAndLetterButtons()
  displayAllContactsBtn()
  
  return axios.get(`/contacts?letter=${letter}`)
  .then((res) => {
    console.log(res)
    renderContactDisplay(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

const renderAddContactAndLetterButtons = () => {
  const addContactBtn = document.createElement("button")
  addContactBtn.id = "addContactBtn"
  addContactBtn.textContent = "Add Contact +"
  addContactBtn.classList.add("btn", "btn-secondary", "mb-3")
  page.appendChild(addContactBtn)
  addContactBtn.addEventListener("click", addContactForm)

  const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  alphabetArray.forEach((letter) => {
  const letterButton = document.createElement('button')
  letterButton.textContent = letter
  letterButton.id = letter
  letterButton.classList = ""
  letterButton.addEventListener("click", (event) => showContactByLetter(event.target.id))
  page.appendChild(letterButton)
  })
}

const renderContactDisplay = (res) => {
  const contacts = res.data
  const contactList = document.createElement("ul")
  contactList.className = "list-group mx-auto"
  contactList.style.maxWidth = "70%"

  contacts.forEach((contact) => {
  const contactItem = document.createElement("li")
  contactItem.className = "list-group-item"
  contactList.appendChild(contactItem)

  const contactHeader = document.createElement("div")
  contactHeader.classList = "container d-flex w-100 justify-content-between align-items-center "
  contactHeader.addEventListener("click", () => toggleDetails(contactItem))

  const contactName = document.createElement("h5")
  contactName.className = "mb-1 row"
  contactName.textContent = `${contact.contact_name}`
  
  const company = document.createElement("p")
  company.className = "mb-1 row"
  company.innerHTML = `${contact.company_name}`

  const contactDetailsBtn = document.createElement("button")
  contactDetailsBtn.className = "btn btn-sm contact-custom-btn"
  contactDetailsBtn.textContent = "+"

  contactHeader.appendChild(contactName)
  contactHeader.appendChild(company)
  contactHeader.appendChild(contactDetailsBtn)
  
  contactItem.appendChild(contactHeader)

  const contactDetails = document.createElement("div")
  contactDetails.className = "contact-details"
  contactDetails.style.display = "none"

  const email = document.createElement("p")
  email.className = "mb-1"
  email.innerHTML = `<strong>Email:</strong> ${contact.email}`

  const phoneNo = document.createElement("p")
  phoneNo.className = "mb-1"
  phoneNo.innerHTML = `<strong>Phone:</strong> ${contact.phone_number}`

  const notes = document.createElement("p")
  notes.className = "mb-1"
  notes.innerHTML = `<strong>Notes:</strong> ${contact.notes}`

  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.className = "editBtn"
  editBtn.addEventListener("click", () => editContactForm(contact.id))

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.className = "deleteBtn"
  deleteBtn.addEventListener("click", () => deleteContact(contact.id))
      
  // contactDetails.appendChild(company)
  contactDetails.appendChild(email)
  contactDetails.appendChild(phoneNo)
  contactDetails.appendChild(notes)
  contactDetails.appendChild(editBtn)
  contactDetails.appendChild(deleteBtn)
  contactItem.appendChild(contactDetails)
  })
  page.appendChild(contactList)
}
      
const renderContacts = () => {
  page.innerHTML = ""

  renderAddContactAndLetterButtons()

  return axios
  .get("/contacts")
  .then((res) => {
    renderContactDisplay(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

const renderSingleContact = (contact) => {
  page.innerHTML = ""
  renderAddContactAndLetterButtons()
  displayAllContactsBtn()

  const contactList = document.createElement("ul")
  contactList.className = "list-group mx-auto"
  contactList.style.maxWidth = "70%"

  const contactItem = document.createElement("li")
  contactItem.className = "list-group-item"
  contactList.appendChild(contactItem)

  const contactHeader = document.createElement("div")
  contactHeader.className = "d-flex w-100 justify-content-between"

  const contactName = document.createElement("h5")
  contactName.className = "mb-1"
  contactName.textContent = `${contact.contact_name}`

  const company = document.createElement("p")
  company.className = "mb-1"
  company.innerHTML = `<strong>Company:</strong> ${contact.company_name}`

  const email = document.createElement("p")
  email.className = "mb-1"
  email.innerHTML = `<strong>Email:</strong> ${contact.email}`

  const phoneNo = document.createElement("p")
  phoneNo.className = "mb-1"
  phoneNo.innerHTML = `<strong>Phone:</strong> ${contact.phone_number}`

  const notes = document.createElement("p")
  notes.className = "mb-1"
  notes.innerHTML = `<strong>Notes:</strong> ${contact.notes}`

  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.className = "editBtn"
  editBtn.addEventListener("click", () => editContactForm(contact.id))

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.className = "deleteBtn"
  deleteBtn.addEventListener("click", () => deleteContact(contact.id))
  
  contactItem.appendChild(contactName)
  contactItem.appendChild(company)
  contactItem.appendChild(email)
  contactItem.appendChild(phoneNo)
  contactItem.appendChild(notes)
  contactItem.appendChild(editBtn)
  contactItem.appendChild(deleteBtn)
  page.appendChild(contactList)
}

export { renderContactDisplay, renderContacts, renderSingleContact } 
