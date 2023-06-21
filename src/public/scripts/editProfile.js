const editIcon = document.getElementById("edit-profile");
const exitBtn = document.querySelector(".close-modal-edit");
const modal = document.querySelector(".modal-edit");
const saveBtn = document.querySelector(".save-modal-edit");
const profilePhotoEdit = document.getElementById("profile-photo-edit");
const profileCoverPhotoEdit = document.getElementById("cover-photo-edit");
const profilePhotoEditLabel = document.getElementById("change-profile-photo-label");
const coverPhotoEditLabel = document.getElementById("change-cover-photo-label");
const mail = document.getElementById("edit-email");
const description = document.getElementById("edit-description");
editIcon.addEventListener("click", () => {

    modal.style.display = "flex";
    resetInputs();
});


exitBtn.addEventListener("click", () => {

    modal.style.display = "none";
    resetInputs();
});

saveBtn.addEventListener("click", async () => {


    const formData = new FormData();
    formData.append("email", mail.value);
    formData.append("description", description.value);

    if (profilePhotoEdit.files.length > 1) {
        alert("You can only upload one profile photo");
    }
    if (profileCoverPhotoEdit.files.length > 1) {
        alert("You can only upload one cover photo");
    }
    console.log(profilePhotoEdit);
    console.log(profileCoverPhotoEdit);
    mail.value ? formData.append("email", mail.value) : null;
    description.value ? formData.append("description", description.value) : null;
    profilePhotoEdit.files[0] ? formData.append("profilePhoto", profilePhotoEdit.files[0]) : null;
    profileCoverPhotoEdit.files[0] ? formData.append("coverPhoto", profileCoverPhotoEdit.files[0]) : null;

    console.log(formData);

    const res = await fetch("/edit", {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(res => {
        if (res.status == 401) {
            window.location.href = "/login";
            console.error("You are not logged in!");
        }
        else if (res.status == 400) {
            console.error("Invalid data!");
        }
        else if (res.status == 500) {
            console.error(res);
        }
        return res;
    });

    console.log(res);

    resetInputs();

    modal.style.display = "none";
})


profilePhotoEdit.addEventListener('change', (event) => {

    const profilePhotoEditLabel = document.getElementById("change-profile-photo-label");
    if (event.target.files && event.target.files[0]) {
        profilePhotoEditLabel.textContent = event.target.files[0].name;
    } else {
        profilePhotoEditLabel.textContent = "Change profile photo";
    }
});

profileCoverPhotoEdit.addEventListener('change', (event) => {
    const coverPhotoEditLabel = document.getElementById("change-cover-photo-label");
    if (event.target.files && event.target.files[0]) {
        coverPhotoEditLabel.textContent = event.target.files[0].name;
    } else {
        coverPhotoEditLabel.textContent = "Change cover photo";
    }
});

function resetInputs() {

    profileCoverPhotoEdit.value = "";
    profilePhotoEdit.value = "";
    description.value = "";
    mail.value = "";
    profilePhotoEditLabel.textContent = "Change profile photo";
    coverPhotoEditLabel.textContent = "Change cover photo";
}