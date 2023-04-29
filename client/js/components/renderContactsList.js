import addContactForm from "./renderAddContactForm.js"
import editContactForm from "./renderEditContactForm.js"
import deleteContact from "./deleteContact.js"

const page = document.getElementById("page")
const createButtonContainer = () =>{
  const buttonContainer = document.createElement("div")
  buttonContainer.classList = "container"
  buttonContainer.id = "buttonContainer"
  page.appendChild(buttonContainer)

  const nonLetterContainer = document.createElement("div")
  nonLetterContainer.classList = "row justify-content-sm-between justify-content-center"
  nonLetterContainer.id="nonLetterContainer"
  buttonContainer.appendChild(nonLetterContainer)
}

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
  displayAllContactsBtn.classList = "mb-1 mt-3 btn btn-secondary col-sm-3 col-11"
  document.getElementById("nonLetterContainer").appendChild(displayAllContactsBtn)
  displayAllContactsBtn.addEventListener("click", renderContacts)
}

const showContactBySearch = (querySearch) => {
  document.querySelector("ul").remove()
  document.getElementById('modalBigDiv').remove()
  return axios.get(`/contacts?search=${querySearch}`)
  .then((res) => {
    renderContactDisplay(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

const searchBar = () => {
  const searchBar = document.createElement("input")
  searchBar.type="search"
  searchBar.placeholder="Search..."
  searchBar.id = "searchBar"
  searchBar.classList = "mb-1 mt-3 col-sm-4 col-11 "
  document.getElementById("nonLetterContainer").appendChild(searchBar)
  searchBar.addEventListener("input", (event) => {
    showContactBySearch(event.target.value)
  })
}

const showContactByLetter = (letter) => {
  page.innerHTML = ''
  createButtonContainer()
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
  addContactBtn.classList= "mb-1 mt-3 btn btn-secondary col-lg-2 col-sm-3 col-11"
  document.getElementById("nonLetterContainer").insertAdjacentElement("beforeend", addContactBtn)
  addContactBtn.addEventListener("click", addContactForm)

  const letterButtonContainer = document.createElement("div")
  letterButtonContainer.classList = "d-flex justify-content-center flex-wrap mb-1 mb-sm-4"
  buttonContainer.appendChild(letterButtonContainer)

  const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  alphabetArray.forEach((letter) => {
  const letterButton = document.createElement('button')
  letterButton.textContent = letter
  letterButton.id = letter
  letterButton.classList = "col-auto btn"
  letterButton.addEventListener("click", (event) => showContactByLetter(event.target.id))
  letterButtonContainer.appendChild(letterButton)
  })
}

const generateModal = () => {
  const modalDiv = document.createElement('div')
  modalDiv.id = "modalBigDiv"
  modalDiv.innerHTML = 
  `
  <div class="modal fade" id="modalContainer" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog container" role="document">
      <div class="modal-content p-3" id="">
        <div class="modal-header row justify-content-end">
        <button type="button" class="btn-close col-1" data-bs-dismiss="modal" aria-label="Close">
        </button>
        </div>
        <div class="modal-body">
          <p class="modal-text"> Are you sure you want to delete this contact? </p>
        </div>
        <div class="modal-footer row justify-content-center">
          <button id="modalDeleteBtn" type="button" class="btn-sm contact-edit-delete col-sm-2 col-4">Delete</button>
        </div>
      </div>
    </div>
  </div>
  ` 
  page.appendChild(modalDiv)  
}

const renderContactDisplay = (res) => {
  const contacts = res.data
  const contactList = document.createElement("ul")
  contactList.className = "list-group mx-auto row"
  contactList.style.maxWidth = "700px"

  contacts.forEach((contact) => {
  const contactItem = document.createElement("li")
  contactItem.className = "container list-group-item col-11 col-lg-12"
  contactItem.addEventListener("click", () => {
    toggleDetails(contactItem)
  })
  contactList.appendChild(contactItem)

  const contactHeader = document.createElement("div")
  contactHeader.classList = "row d-flex align-items-center justify-content-between"
  contactItem.appendChild(contactHeader)

  const contactName = document.createElement("p")
  contactName.className = "mb-1 col-8 col-sm-4 text-capitalize h5"
  contactName.textContent = `${contact.contact_name}`
  contactHeader.appendChild(contactName)

  const company = document.createElement("p")
  company.classList = "mb-1 col-sm-4 d-none d-sm-block"
  company.innerHTML = `${contact.company_name}`
  contactHeader.appendChild(company)
  
  const contactDetailsBtn = document.createElement("button")
  contactDetailsBtn.className = "col-1 offset-sm-3 align-self-end btn btn-sm contact-custom-btn"
  contactDetailsBtn.textContent = "+"
  contactHeader.appendChild(contactDetailsBtn)

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

  const buttonContainer = document.createElement("div")
  buttonContainer.classList = "row justify-content-between"
  
  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.className = "editBtn btn-sm contact-edit-delete col-sm-2 col-3"
  editBtn.addEventListener("click", () => editContactForm(contact.id))
  buttonContainer.appendChild(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.className = "deleteBtn btn-sm contact-edit-delete col-sm-2 col-4"
  deleteBtn.setAttribute('data-bs-toggle', 'modal')
  deleteBtn.setAttribute('data-bs-target', '#modalContainer')
  deleteBtn.dataset.id = contact.id
  deleteBtn.addEventListener("click", (event) => {
    modalContainer.style.display = 'block'
    modalContainer.dataset.id = event.currentTarget.dataset.id
  })
  buttonContainer.appendChild(deleteBtn)
      
  contactDetails.appendChild(email)
  contactDetails.appendChild(phoneNo)
  contactDetails.appendChild(notes)
  contactDetails.insertAdjacentElement('beforeend', buttonContainer)
  contactItem.appendChild(contactDetails)
  })
  page.appendChild(contactList)
  generateModal()
  
  const modalDeleteBtn = document.getElementById("modalDeleteBtn")
  modalDeleteBtn.addEventListener("click", () => {
    const contactId = document.getElementById("modalContainer").dataset.id
    document.querySelector(".modal-backdrop").classList = ""
    deleteContact(contactId)
  })
}
      
const renderContacts = () => {
  page.innerHTML = ""
  createButtonContainer()
  renderAddContactAndLetterButtons()
  searchBar()

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
  createButtonContainer()
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

  const buttonContainer = document.createElement("div")
  buttonContainer.classList = "row justify-content-between"

  const editBtn = document.createElement('button')
  editBtn.textContent = "Edit"
  editBtn.className = "editBtn btn-sm contact-edit-delete col-sm-2 col-3"
  editBtn.addEventListener("click", () => editContactForm(contact.id))
  buttonContainer.appendChild(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.className = "deleteBtn btn-sm contact-edit-delete col-sm-2 col-4"
  deleteBtn.setAttribute('data-bs-toggle', 'modal')
  deleteBtn.setAttribute('data-bs-target', '#modalContainer')
  deleteBtn.dataset.id = contact.id
  deleteBtn.addEventListener("click", (event) => {
    modalContainer.style.display = 'block'
    modalContainer.dataset.id = event.currentTarget.dataset.id
  })
  buttonContainer.appendChild(deleteBtn)
  
  contactItem.appendChild(contactName)
  contactItem.appendChild(company)
  contactItem.appendChild(email)
  contactItem.appendChild(phoneNo)
  contactItem.appendChild(notes)
  contactItem.insertAdjacentElement('beforeend', buttonContainer)
  page.appendChild(contactList)
  generateModal()

  const modalDeleteBtn = document.getElementById("modalDeleteBtn")
  modalDeleteBtn.addEventListener("click", () => {
    const contactId = document.getElementById("modalContainer").dataset.id
    document.querySelector(".modal-backdrop").classList = ""
    deleteContact(contactId)
  })
}

export { renderContactDisplay, renderContacts, renderSingleContact, createButtonContainer, displayAllContactsBtn } 
