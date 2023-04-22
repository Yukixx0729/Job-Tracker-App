const page = document.getElementById('page')
const contactsBtn = document.getElementById("contacts")

const renderContacts = (event) => {
  console.log(event)
  page.innerHTML = ''
  const addContactBtn = document.createElement('button')
  addContactBtn.id = "addContactBtn"
  addContactBtn.textContent = "Add Contact"
  page.appendChild(addContactBtn)
  addContactBtn.addEventListener('click', renderAddContactForm)

  return axios.post('/')

}





contactsBtn.addEventListener('click', renderContacts)