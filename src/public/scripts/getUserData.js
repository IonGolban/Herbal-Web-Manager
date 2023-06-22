let profilePhoto = document.querySelector(".p-img");
let coverPhoto = document.querySelector(".cover-photo-container");
let description1 = document.querySelector(".left-description");

document.addEventListener("DOMContentLoaded", async () => {

    const res = await fetch("/getUserData", {

        method: 'GET',
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

    const data = await res.json();

    let descriere = data.response.description;
    let likes = data.response.liked_photos.length;
    let uploads = data.response.uploaded_plants.length;
    let collections =data.response.collections.length;
    let profP = data.response.profile_img;
    let covP = data.response.cover_img;
    
    description1.innerHTML += `
        <p>${descriere}</p>
    `;
    coverPhoto.style.backgroundImage = `url(${covP})`;
    profilePhoto.style.backgroundImage = `url(${profP})`;

    let noOfLikes = document.querySelector(".number-of-likes");
    let noOfUploads = document.querySelector(".number-of-uploads");
    let noOfCollections = document.querySelector(".number-of-collections");

    noOfLikes.innerHTML += `
        <p>${likes}</p>
    `;
    noOfUploads.innerHTML += `
        <p>${uploads}</p>
    `;
    noOfCollections.innerHTML += `
        <p>${collections}</p>
    `;

});