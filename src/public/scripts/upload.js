const uploadForm = document.getElementById("uploadForm");
const uploadButton = document.getElementById("uploadButton");

document.addEventListener("DOMContentLoaded", () => {

});

uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const imageFile = document.getElementById("image").files[0];
    const description = document.getElementById("description").value;
    const altDescription = document.getElementById("altDescription").value;
    const name = document.getElementById("name").value;
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());

    console.log(imageFile, description, altDescription, tags);
    await sendData(name,imageFile, description, altDescription, tags);

});

async function sendData(name,imageFile, description, altDescription, tags) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);
    formData.append("description", description);
    formData.append("altDescription", altDescription);
    formData.append("tags", tags);

    const res = await fetch("/upload/photo", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
    }).then(res => {
        if (res.status == 401) {
            window.location.href = "/login";
            alert("You are not logged in!");
        }
        else if (res.status == 400) {
            alert("Invalid data!");
        }
        return res;
    });
    const data = await res.json();
    console.log(data);
    window.location.href = "/profile";
}
