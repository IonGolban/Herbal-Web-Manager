const likedSection = document.querySelector(".like-icon");
const uploadSection = document.querySelector(".upload-icon");
const collectionSection = document.querySelector(".collectionSection");
const photoStorage = document.querySelector(".photos");

document.addEventListener("DOMContentLoaded", () => {
  
  // const path = window.location.pathname;
  // if ( path === "/profile/liked") {
  //   getLikedPhotos();
  // }

  getLikedPhotos();
  likedSection.addEventListener("click", getLikedPhotos);

}); 



async function getLikedPhotos(){
  
  try{
    const res = await fetch (`/profile/liked`, {
      method : "GET",
      headers : {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then(res => {
        if(res.status == 401) {
          window.location.href = "/login";
          alert("You are not logged in!");
        }
        return res;
      })

    const plants = await res.json();
    for(const plant of plants.response){
      
      const el = document.createElement("div");
      el.classList.add("photo");
      el.style.backgroundImage = `url(${plant.url})`;
      el.innerHTML = `
      <div class="button-container">
              <button class="add-btn">add</button>
              <button class="like-btn">like</button>
      </div>
      `;

      photoStorage.appendChild(el);

    }


  } catch (error) {
    console.log(error);
  }



}
  