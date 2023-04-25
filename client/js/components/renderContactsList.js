import addContactForm from "./renderAddContactForm.js";
import editContactForm from "./renderEditContactForm.js";
import deleteContact from "./deleteContact.js";

const page = document.getElementById("page");

const toggleDetails = (contactItem) => {
  const contactDetails = contactItem.querySelector(".contact-details");
  if (contactDetails.style.display === "none") {
    contactDetails.style.display = "block";
  } else {
    contactDetails.style.display = "none";
  }
};

const renderContacts = (event) => {
  console.log(event);
  page.innerHTML = "";

  const addContactBtn = document.createElement("button");
  addContactBtn.id = "addContactBtn";
  addContactBtn.textContent = "Add Contact";
  addContactBtn.classList.add("btn", "btn-secondary", "mb-3");
  page.appendChild(addContactBtn);
  addContactBtn.addEventListener("click", addContactForm);

  return axios
    .get("/contacts")
    .then((res) => {
      const contacts = res.data;
      const contactList = document.createElement("ul");
      contactList.className = "list-group mx-auto";
      contactList.style.maxWidth = "70%";

      contacts.forEach((contact) => {
        const contactItem = document.createElement("li");
        contactItem.className = "list-group-item";
        contactList.appendChild(contactItem);

        const contactHeader = document.createElement("div");
        contactHeader.className =
          "d-flex w-100 justify-content-between align-items-center";
        contactHeader.addEventListener("click", () =>
          toggleDetails(contactItem)
        );

        const contactName = document.createElement("h5");
        contactName.className = "mb-1";
        contactName.textContent = `${contact.contact_name}  -  ${contact.company_name}`;;

        const contactDetailsBtn = document.createElement("button");
        contactDetailsBtn.className = "btn btn-sm btn-secondary";
        contactDetailsBtn.textContent = "+";

        contactHeader.appendChild(contactName);
        contactHeader.appendChild(contactDetailsBtn);
        contactItem.appendChild(contactHeader);

        const contactDetails = document.createElement("div");
        contactDetails.className = "contact-details";
        contactDetails.style.display = "none";

        const company = document.createElement("p");
        company.className = "mb-1";
        company.innerHTML = `<strong>Company:</strong> ${contact.company_name}`;

        const email = document.createElement("p");
        email.className = "mb-1";
        email.innerHTML = `<strong>Email:</strong> ${contact.email}`;

        const phoneNo = document.createElement("p");
        phoneNo.className = "mb-1";
        phoneNo.innerHTML = `<strong>Phone:</strong> ${contact.phone_number}`;

        const notes = document.createElement("p");
        notes.className = "mb-1";
        notes.innerHTML = `<strong>Notes:</strong> ${contact.notes}`;

        contactDetails.appendChild(company);
        contactDetails.appendChild(email);
        contactDetails.appendChild(phoneNo);
        contactDetails.appendChild(notes);
        contactItem.appendChild(contactDetails);
      });

      page.appendChild(contactList);
    })
    .catch((err) => {
      console.log(err);
    });
};


// const contactsBtn = document.getElementById("contacts");
// contactsBtn.addEventListener('click', renderContacts)

export default renderContacts;

