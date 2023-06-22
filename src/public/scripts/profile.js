
const likedSection = document.querySelector(".like-icon");
const uploadSection = document.querySelector(".upload-icon");
const collectionSection = document.querySelector(".collectionSection");
const photoStorage = document.querySelector(".photos");
const createCollectionButton = document.getElementById("create-collection");
const collectionIcon = document.querySelector(".collection-icon");
const likeIcon = document.querySelector(".like-icon");
const uploadPhoto = document.getElementById("upload-photo");
const homeIcon = document.getElementById("home-icon");
const logOutB = document.querySelector(".log-out");


logOutB.addEventListener("click", () => {

  localStorage.removeItem('token');
  window.location.href = "/login";

});

homeIcon.addEventListener("click", () => {
  window.location.href = "/";
});

uploadSection.addEventListener("click", () => {
  window.location.href = "/profile?uploaded_photos=this";
});

uploadPhoto.addEventListener("click", () => {
  window.location.href = "/upload";
});

collectionIcon.addEventListener("click", displayCollectionList);

likeIcon.addEventListener("click",() =>{
  if(window.location.search ===""){
    
  }else{
    console.log("liked");
    window.location.href = "/profile";
  }
});


document.addEventListener("DOMContentLoaded", async () => {
  const photoContainer = document.querySelector(".photo-container");
  const query = window.location.search;
  const searchParam = query.split("=")[0];
  console.log(searchParam);
  let plants;
if (searchParam === "?collection_id") {
  console.log("collection");
  const id = query.split("=")[1];
  plants = await getPlantsByCollectionId(id);
  document.querySelector(".photos").style.display = "grid";
  collectionIcon.style.background = "#ada9a9";
  collectionIcon.style.color = "black";
} else if (searchParam === "?uploaded_photos") {
  console.log("uploaded");
  plants = await getUploadedPhotos();
  document.querySelector(".photos").style.display = "grid";
  uploadSection.style.background = "#ada9a9";
  uploadSection.style.color = "black";
} else {
  console.log("liked");
  document.querySelector(".photos").style.display = "grid";
  plants = await getLikedPhotos();
  likeIcon.style.background = "#ada9a9";
  likeIcon.style.color = "black";
}

  console.log(plants);
  displayPlants(plants);

});

async function getUploadedPhotos() {
  try {
    const res = await fetch(`/profile/uploaded`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then(res => {
      if (res.status == 401) {
        window.location.href = "/login";
        alert("You are not logged in!");
      }
      return res;
    })

    const plants = await res.json();


    return plants;


  } catch (error) {
    console.log(error);
  }
}

function displayPlants(plants) {
  console.log(plants);
  for (const plant of plants) {

    const el = document.createElement("div");
    el.classList.add("photo");
    el.style.backgroundImage = `url(${plant.url})`;
    el.innerHTML = `
    <div class="button-container">
        <button class="remove-btn">remove</button>
    </div>
    `;
    
    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("remove-btn")) {

        const query = window.location.search;
        const searchParam = query.split("=")[0];
        
        if(searchParam === "?collection_id"){

        }
        else if(searchParam === "?uploaded_photos") {

        }
        else {

        }


      }
  });


    

    photoStorage.appendChild(el);
  }
}
  async function createCollection(event) {
    event.preventDefault();
    const collectionName = document.getElementById("collection-name-input");
    collectionName.value = "";
    const collectionDesc = document.getElementById("collection-description-input");
    collectionDesc.value = "";

    const modal = document.querySelector(".modal");
    modal.style.display = "flex";
    const modalCloseButton = document.getElementById("collection-close-button");
    modalCloseButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const modalAddButton = document.getElementById("collection-add-button");
    modalAddButton.addEventListener("click", () => {
      const collectionName = document.getElementById("collection-name-input").value;
      const collectionDesc = document.getElementById("collection-description-input").value;
      if (!collectionName || !collectionDesc) {
        alert("Please enter a name and description for your collection.");
        return;
      }
      const collection = {
        name: collectionName,
        description: collectionDesc,
      };
      const res = fetchCreateCollection(collection);
      console.log(res);
      modal.style.display = "none";
    });

  }

  async function fetchCreateCollection(collection) {
    const res = await fetch("/collection/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(collection)
    }).then((res) => {
      if (!res.ok) {
        alert("Could not create collection");
      }
      if (res.status === 401) {
        alert("You must be logged in to create a collection");
      }
      return res.json();
    });
    return res;
  }
  

  createCollectionButton.addEventListener("click", createCollection);



  async function getLikedPhotos() {

    try {
      const res = await fetch(`/profile/liked`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      }).then(res => {
        if (res.status == 401) {
          window.location.href = "/login";
          alert("You are not logged in!");
        }
        return res;
      })

      const plants = await res.json();


      return plants;


    } catch (error) {
      console.log(error);
    }
  }
  
  //se repeta codul :(de aici in jos) trebuie de rezolvat
  async function displayCollectionList() {
    const modal = document.querySelector(".modal-collections");
    modal.style.display = "flex";
    const list = document.getElementById("collection-list");
    const closeBtn = document.querySelector(".collection-close-btn");
    closeBtn.addEventListener("click", () => {
      console.log("close");
      list.innerHTML = "";
      modal.style.display = "none";
    });

    const collections = await getListOfCollections();
    console.log(collections);
    for (const collection of collections) {
      const elementList = createListItem(collection);
      elementList.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(collection._id);
        window.location.href = `/profile?collection_id=${collection._id}`;
      });
      list.appendChild(elementList);

    }
  }
  async function getListOfCollections() {
    const res = await fetch(`/collection/getList`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (res.status == 401) {
          window.location.href = "/login";
          alert("You are not logged in!");
        }
        return res;
      });
    const data = await res.json();
    return data;
  }
  function createListItem(collection) {
    const listCollection = document.createElement("li");
    const collectionContainer = document.createElement("div");
    const collectionImage = document.createElement("img");
    const collectionName = document.createElement("span");

    // collectionImage.src = item.imgSrc;
    collectionImage.src = collection.cover_img;
    collectionImage.classList.add("collection-image");

    collectionName.textContent = collection.name;
    collectionName.classList.add("collection-name");

    collectionContainer.classList.add("collection");
    collectionContainer.appendChild(collectionImage);
    collectionContainer.appendChild(collectionName);

    listCollection.appendChild(collectionContainer);

    return listCollection;
  }
  async function getPlantsByCollectionId(id) {
    const res = await fetch(`/collection/plants?id=${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then(res => {
      if (res.status == 401) {
        window.location.href = "/login";
        alert("You are not logged in!");
      } return res;
    });
    const data = await res.json();
    return data;
  }

  async function deleteLikePhoto(idPlant, idCollection) {
    const res = await fetch(`/collection/plants/remove?id=${idPlant}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then(res => {
      if (res.status == 401) {
        window.location.href = "/login";
        alert("You are not logged in!");
      } return res;
    });
    const data = await res.json();
    return data;
  }