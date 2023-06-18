const editIcon = document.getElementById("edit-profile");
const exitBtn = document.querySelector(".close-modal-edit");
const modal = document.querySelector(".modal-edit");
const saveBtn = document.querySelector(".save-modal-edit");

editIcon.addEventListener("click",  () => {

    modal.style.display = "flex";

});


exitBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

saveBtn.addEventListener("click", () =>{

    const mail = document.getElementById("edit-email");
    const description = document.getElementById("edit-description");

    const objectReq = {};
    objectReq.email = mail.value;
    objectReq.description = description.value;

    // console.log(objectReq);
    fetch("/edit", {
        method: 'POST', 
        body: JSON.stringify(objectReq), 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

    console.log(res);

    modal.style.display = "none";
      
})