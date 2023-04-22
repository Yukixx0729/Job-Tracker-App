const page = document.getElementById('page')
const contactsBtn = document.getElementById("contacts")

const renderContacts = (event) => {
  console.log(event)
  page.innerHTML = ''
  const addContactBtn = document.createElement('button')
  addContactBtn.id = "addContactBtn"
  addContactBtn.textContent = "Add Contact"
  page.appendChild(addContactBtn)
  addContactBtn.addEventListener('click', addContactForm)

  return axios.get('/contacts')
  .then(res => {
    const contacts = res.data
    contacts.forEach(contact => {
      console.log(contact)
      const div = document.createElement('div')
      page.appendChild(div)

      const h3 = document.createElement('h3')
      h3.textContent = `${contact.contact_name}`
      h3.id = `${contact.id}`
      h3.className = "contact"
      div.appendChild(h3)

      const company = document.createElement('p')
      company.textContent = `${contact.company_name}`
      company.className = "company"
      div.appendChild(company)

      const email = document.createElement('p')
      email.textContent = `${contact.email}`
      email.className = "email"
      email.style.display = "none"
      div.appendChild(email)

      const phoneNo = document.createElement('p')
      phoneNo.textContent = `${contact.phone_number}`
      phoneNo.className = "phoneNo"
      phoneNo.style.display = "none"
      div.appendChild(phoneNo)

      const notes = document.createElement('p')
      notes.textContent = `${contact.notes}`
      notes.className = "notes"
      notes.style.display = "none"
      div.appendChild(notes)

      const btnDiv = document.createElement('div')
      btnDiv.className = "buttonDiv"
      div.appendChild(btnDiv)

      const editBtn = document.createElement('button')
      editBtn.textContent = "Edit"
      editBtn.className = "editBtn"
      editBtn.style.display = "none"
      editBtn.addEventListener("click", () => editContactForm(contact.id))
      btnDiv.appendChild(editBtn)

      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = "Delete"
      deleteBtn.className = "deleteBtn"
      deleteBtn.style.display = "none"
      deleteBtn.addEventListener("click", () => deleteContact(contact.id))
      btnDiv.appendChild(deleteBtn)

      h3.addEventListener('click', (e) => {
        console.log(e.target);
        if (email.style.display === "none") {
          email.style.display = "block";
        } else {
          email.style.display = "none";
        }

        if (phoneNo.style.display === "none") {
          phoneNo.style.display = "block";
        } else {
          phoneNo.style.display = "none";
        }

        if (notes.style.display === "none") {
          notes.style.display = "block";
        } else {
          notes.style.display = "none";
        }

        if (editBtn.style.display === "none") {
          editBtn.style.display = "block";
        } else {
          editBtn.style.display = "none";
        }

        if (deleteBtn.style.display === "none") {
          deleteBtn.style.display = "block";
        } else {
          deleteBtn.style.display = "none";
        }
      })
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

contactsBtn.addEventListener('click', renderContacts)