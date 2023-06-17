const uploadForm = document.getElementById("uploadForm");
const uploadButton = document.getElementById("uploadButton");

document.addEventListener("DOMContentLoaded", () => {

});

uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const imageFile = document.getElementById("image").files[0];
    const description = document.getElementById("description").value;
    const altDescription = document.getElementById("altDescription").value;
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());

    console.log(imageFile, description, altDescription, tags);
    await sendData(imageFile, description, altDescription, tags);

});

async function sendData(imageFile, description, altDescription, tags) {
    const formData = new FormData();
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
    });
    const data = await res.json();
    console.log(data);
    // window.location.href = "/profile";
}
