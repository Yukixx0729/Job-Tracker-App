const filesBtn = document.getElementById("files");

//get all files and handle del btn function
function renderFiles() {
  page.innerHTML = " ";
  axios
    .get(`/files/upload/1`)
    .then((res) => {
      const uploadBtn = document.createElement("div");
      uploadBtn.innerHTML = `<button>Upload your new file</button>`;
      uploadBtn.id = "uploadFile";
      const note = document.createElement("div");
      page.appendChild(uploadBtn);
      uploadBtn
        .querySelector("button")
        .addEventListener("click", renderUploadFileForm);
      if (!res.data.user[0]) {
        note.innerHTML = `<h3>You haven't uploaded any file yet.<h3>`;
        page.appendChild(note);
      }
      for (let file of res.data.user) {
        const fileList = document.createElement("div");
        fileList.innerHTML = `<h3><a href="${file.url}">${file.name}</a>  <button class="deleteFile" id ="${file.id}">Delete</button></h3>`;
        page.appendChild(fileList);
        document
          .getElementById(`${file.id}`)
          .addEventListener("click", handleDeleteFile);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

filesBtn.addEventListener("click", renderFiles);

//handle delete of the file
function handleDeleteFile(e) {
  if (!document.querySelector(".deleteFileForm")) {
    const delForm = document.createElement("div");
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
        renderFiles();
      });
    e.target.parentElement
      .querySelector(".cancel")
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector(".deleteFileForm").remove();
      });
  } else {
    document.querySelector(".deleteFileForm").remove();
    handleDeleteFile(e);
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
function renderUploadFileForm() {
  if (!document.getElementById("uploadFile").querySelector("form")) {
    const uploadDiv = document.createElement("div");
    uploadDiv.id = "uploadFileForm";
    uploadDiv.innerHTML = `<form action="/files/upload" method="post" enctype="multipart/form-data">
    <div><label for="name"> File Name </label>
    <input type="text" name="name" required/></div>
   <div><label for="file"> File(only pdf) </label>
    <input type="file" name="pdf" accept="application/pdf" required/><div>
    <input type="text" name="user_id" value = 1 hidden/>
    <div><button type="submit">Upload</button>
    <button id="cancelUpload">Cancel</button><div>
  </form>`;
    document.getElementById("uploadFile").appendChild(uploadDiv);

    uploadDiv
      .querySelector("form")
      .addEventListener("submit", async (event) => {
        handleUploadFile(event);
      });

    document
      .getElementById("cancelUpload")
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("uploadFileForm").remove();
      });
  } else {
    document.getElementById("uploadFile").querySelector("form").remove();
  }
}

async function handleUploadFile(event) {
  event.preventDefault();
  const formData = new FormData();
  const fileInput = document.querySelector('input[type="file"]');
  formData.append("pdf", fileInput.files[0]);
  const data = new FormData(event.target);
  for (const key of data.keys()) {
    if (key !== "pdf") {
      formData.append(key, data.get(key));
    }
  }

  // console.log("before promise", formData);
  return axios
    .post("/files/upload", formData)
    .then((res) => {
      // console.log(res);
      renderFiles();
    })
    .catch((err) => {
      console.error(err);
    });
}
