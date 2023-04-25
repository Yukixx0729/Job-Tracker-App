const filesBtn = document.getElementById("files");

//get all files and handle del btn function
function renderFiles(id) {
  page.innerHTML = " ";
  axios
    .get(`/files/upload/${id}`)
    .then((res) => {
      const filePage = document.createElement("div");
      filePage.classList = "container";
      filePage.id = "filePageContainer";
      page.appendChild(filePage);

      const uploadBtn = document.createElement("div");
      uploadBtn.innerHTML = `<button class="col-4 p-2 rounded-3">Upload file</button>`;
      uploadBtn.id = "uploadFile";
      uploadBtn.classList = "row justify-content-center";

      const note = document.createElement("div");
      note.id = "fileNote";
      filePage.appendChild(uploadBtn);
      uploadBtn.querySelector("button").addEventListener("click", () => {
        renderUploadFileForm(id);
      });
      if (!res.data.user[0]) {
        note.innerHTML = `<h4>You have not uploaded any files. <h4>`;
        filePage.appendChild(note);
      }
      const fileContainer = document.createElement("div");
      fileContainer.id = "fileContainer";
      filePage.appendChild(fileContainer);
      for (let file of res.data.user) {
        const fileList = document.createElement("div");
        fileList.className = "fileList";
        fileList.innerHTML = `<a href="${file.url}">${file.name}</a>  <button class="deleteFile" id ="${file.id}">Delete</button>`;
        fileContainer.appendChild(fileList);
        document.getElementById(`${file.id}`).addEventListener("click", (e) => {
          handleDeleteFile(e, id);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// filesBtn.addEventListener("click", renderFiles);

//handle delete of the file
function handleDeleteFile(e, id) {
  console.log(e.target);
  if (!document.querySelector(".deleteFileForm")) {
    const delForm = document.createElement("div");
    delForm.className = "delFormContainer";
    delForm.innerHTML = `<form  class="deleteFileForm">
    <p> <label >Are you sure to delete the file?</label>
    <input type= "text" name = "id" value = ${e.target.id} Hidden></input>
    </p>
    <button type="submit"> Delete file</button><button class="cancel"> Cancel </button>
    </form>`;
    e.target.parentElement.appendChild(delForm);
    e.target.parentElement
      .querySelector(".deleteFileForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        handleDelFileSubmit(`${e.target.id}`);
        renderFiles(id);
      });
    e.target.parentElement
      .querySelector(".cancel")
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector(".delFormContainer").remove();
      });
  } else {
    document.querySelector(".delFormContainer").remove();
    handleDeleteFile(e, id);
  }
}

function handleDelFileSubmit(id) {
  return axios
    .delete(`/files/delete/${id}`)
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
}

//handle upload the new file
function renderUploadFileForm(id) {
  if (!document.getElementById("uploadFile").querySelector("div")) {
    const uploadDiv = document.createElement("div");
    uploadDiv.id = "uploadFileForm";
    uploadDiv.innerHTML = `<form action="/files/upload" method="post" id="uploadForm"enctype="multipart/form-data">
    <div><label for="name"> File Name </label>
    <input type="text" name="name" required/></div>
   <div><label for="file"> File(only pdf) </label>
    <input type="file" name="pdf" accept="application/pdf" required/></div>
    <input type="text" id="user_id" value =${id} hidden/>
    <div><button type="submit">Upload</button>
    <button id="cancelUpload">Cancel</button></div>
  </form>`;
    document.getElementById("uploadFile").appendChild(uploadDiv);

    uploadDiv
      .querySelector("form")
      .addEventListener("submit", async (event) => {
        console.log(id);
        handleUploadFile(event);
      });

    document
      .getElementById("cancelUpload")
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("uploadFileForm").remove();
      });
  } else {
    document.getElementById("uploadFile").querySelector("div").remove();
  }
}

async function handleUploadFile(event) {
  event.preventDefault();
  const formData = new FormData();
  const fileInput = document.querySelector('input[type="file"]');
  const user_id = document.getElementById("user_id");
  console.log(user_id.value);
  formData.append("pdf", fileInput.files[0]);
  const data = new FormData(event.target);
  for (const key of data.keys()) {
    if (key !== "pdf") {
      formData.append(key, data.get(key));
    }
  }

  formData.append("user_id", user_id.value);
  console.log("before promise", formData);
  return axios
    .post("/files/upload", formData)
    .then((res) => {
      // console.log(res);
      renderFiles(user_id.value);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default renderFiles;
