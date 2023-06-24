import { appendTagsToDropDown, getPlantsByTags } from "./criteriaSearch.js";

const modalLikeButton = document.querySelector(".like-btn-modal");
const modalAddButton = document.querySelector(".add-btn-modal");
const logoutButton = document.querySelector(".logout-button");
const searchInputCatalog = document.querySelector("#search-input-catalog");  

searchInputCatalog.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
      window.location.href = `/catalog?query=${searchInputCatalog.value}`;
  }
});

logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.removeItem("token");
  window.location.href = "/login";
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const plants = 21;
    await appendButtons();
    // await saveRandomImgs();
    const container = document.getElementById("plants");
    const query = window.location.search;
    const searchParam = query.split("=")[0];
    let photos = [];

    if (searchParam == "?query") {
      photos = await getByQuery(query);
    } else if (searchParam == "?count") {
      photos = await getRandom(query);
    } else if (searchParam == "?tags") {
      console.log(query);
      photos = await getPlantsByTags(query);
    } else {
      photos = await (getRandom("?count=21"));
    }

    for (const photo of photos) {
      const el = document.createElement("div");
      el.classList.add("plant");
      el.style.backgroundImage = `url(${photo.url})`;

      el.innerHTML = `
      <div class="plant-desc">
        <div>
          <p class="plant-text">
            ${photo.desc}
          </p>
          <div class="button-container">
            <button class="add-btn">add</button>
            <button class="like-btn">like</button>
          </div>
        </div>
      </div>
    `;

      container.appendChild(el);
      const likeButton = el.querySelector(".like-btn");
      likeButton.addEventListener("click", like);

      const viewButton = el;
      viewButton.addEventListener("click", async (event) =>{
          viewPhoto(event,photo._id)
      });
      const addButton = el.querySelector(".add-btn");
      addButton.addEventListener("click", (event) => {
        addToCollection(event, photo._id);
      });
     

    }
    await appendTagsToDropDown();

  } catch (err) {
    console.error(err);
    const errorContainer = document.getElementById("error");
    errorContainer.innerHTML = err.message;
  }
});

async function appendButtons() {
  if (window.localStorage.getItem("token") === null || !await isLoggedIn()) {
    window.localStorage.removeItem("token");
    document.querySelector(".logout-button").style.display = "none";
    document.querySelector(".login-button").style.display = "block";
    document.querySelector(".signup-button").style.display = "block";
    document.querySelector(".profile-button").style.display = "none";
  } else {
    document.querySelector(".logout-button").style.display = "block";
    document.querySelector(".login-button").style.display = "none";
    document.querySelector(".signup-button").style.display = "none";
    document.querySelector(".profile-button").style.display = "block";

  }
}

let modalIsOpen = false;
async function addToCollection(event, photoId) {
  event.stopPropagation();
  const modal = document.querySelector(".modal-collections");
  // if (modalIsOpen) {
  //   modal.style.display = "flex";
  //   return;
  // }
  
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
      console.log("clicked");
      console.log(collection._id);
      console.log(photoId);
      addPlantToCollection(collection._id, photoId);
      elementList.style.display = "none";
    });
    list.appendChild(elementList);

  }

  modalIsOpen = true;

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
async function addPlantToCollection(collection_id, photo_id) {
  const res = await fetch(`/collection/addPlant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
    body: JSON.stringify({ collection_id, photo_id })
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

const likeButton = document.querySelector(".like-btn");


async function viewPhoto(event, photoId ) {
  const plantDesc = event.target.closest(".plant");
  //console.log(plantDesc.style.backgroundImage);

  const modal = document.querySelector(".modal");
  const modImg = document.querySelector(".modal-image");
  const closeBut = document.querySelector(".close-modal");

  const url = plantDesc.style.backgroundImage.slice(5, -2);
  modal.style.display = "block";
  modImg.src = url;


  const res = await fetch(`/views`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
    body: JSON.stringify({ url })
  });
  modalAddButton.addEventListener("click", (event) => {

    addToCollection(event, photoId);

  });

  closeBut.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

async function like(event) {

  event.stopPropagation();

  const likeButton = event.target;
  const plant = likeButton.parentElement.parentElement.parentElement.parentElement;
  const plant_url = plant.style.backgroundImage;
  const urlStartIndex = plant_url.indexOf('url("') + 5;
  const urlEndIndex = plant_url.indexOf('")');
  const url = plant_url.substring(urlStartIndex, urlEndIndex);
  console.log(url);

  const res = await fetch(`/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
    body: JSON.stringify({ url })
  }).then(res => {
    if (res.status == 401) {
      window.location.href = "/login";
      alert("You are not logged in!");
    }
    if (res.status == 400) {
      alert("You already liked this photo!");
    }
    return res;
  });

  const data = await res.json(); // TODO : current nr of likes
  console.log(data);

}

modalLikeButton.addEventListener("click", async () => {
  const modImg = document.querySelector(".modal-image");
  const url = modImg.src;
  const res = await fetch(`/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
    body: JSON.stringify({ url })
  }).then(res => {
    if (res.status == 401) {
      window.location.href = "/login";
      alert("You are not logged in!");
    }
    if (res.status == 400) {
      alert("You already liked this photo!");
    }
    return res;
  });

  const data = await res.json(); // TODO : current nr of likes
  console.log(data);
});


async function getRandom(pathname) {
  const res = await fetch(`/random-img${pathname}`, {
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
  const photos = await res.json();
  return photos;
}

async function getByQuery(query) {
  const res = await fetch(`/img-by-tag${query}`, {
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
  });
  const photos = await res.json();
  return photos;
}

async function saveRandomImgs() {
  await fetch("/save-random-imgs");
}


document.addEventListener("DOMContentLoaded", async () => {
  const thisPath = window.location.pathname;
  //const split = thisPath.split("/");
  console.log(thisPath);
});

async function isLoggedIn() {
    const res = await fetch(`/authorized`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (res.status == 401) {
          return false;
        }
        return true;
      });
  
  return res;
}