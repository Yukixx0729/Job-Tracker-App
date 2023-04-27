import { renderContacts } from "./renderContactsList.js"

const deleteContact = (id) => {
  console.log(id)
  return axios.delete(`/contacts/${id}`)
  .then(res => {
    console.log(res)
    renderContacts()
  })
  .catch(err => {
    console.log(err)
  })
}

export default deleteContact