


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const plants = 21;
    // await saveRandomImgs();
    const container = document.getElementById("plants");
    const query = window.location.search;
    const searchParam = query.split("=")[0];
    let photos = [];

    if (searchParam == "?query") {
      photos = await getByQuery(query);
    } else if (searchParam == "?count") {
      photos = await getRandom(query);
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
          <h2 class="plant-title">Small plant</h2>
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
      viewButton.addEventListener("click", viewPhoto);

    }

  } catch (err) {
    console.error(err);
    const errorContainer = document.getElementById("error");
    errorContainer.innerHTML = err.message;
  }
});

const likeButton = document.querySelector(".like-btn");


async function viewPhoto(event){
  const plantDesc = event.target.closest(".plant");
  //console.log(plantDesc.style.backgroundImage);

  const modal = document.querySelector(".modal");
  const modImg = document.querySelector(".modal-image");
  const closeBut = document.querySelector(".close-modal");

  const url = plantDesc.style.backgroundImage.slice(5,-2);
  modal.style.display = "block";
  modImg.src = url;


  const res = await fetch(`/views`, {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
    body: JSON.stringify({ url }) 
  });

  closeBut.addEventListener("click", function(){
    modal.style.display = "none";
  });
}

async function like(event){

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
  });

  const data = await res.json(); // TODO : current nr of likes
  console.log(data);
  
}


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