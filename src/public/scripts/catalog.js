document.addEventListener("DOMContentLoaded", async () => {
  try {
    const plants = 21;
    await saveRandomImgs();    
    const container = document.getElementById("plants");
    const query = window.location.search;
    const searchParam = query.split("=")[0];
    let photos = [];

    if(searchParam == "?query"){
      photos = await getByQuery(query);
    }else if(searchParam== "?count"){
      photos = await getRandom(query);
    }else {
      photos = await(getRandom("?count=21"));
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
          <button class="plant-btn">add</button>
          <button class="plant-btn">like</button>
        </div>
      </div>
    </div>
  `;

      container.appendChild(el);
    }

  } catch (err) {
    console.error(err);
    const errorContainer = document.getElementById("error");
    errorContainer.innerHTML = err.message;
  }
});

async function getRandom(pathname){
  const res = await fetch(`/random-img${pathname}`);
  const photos = await res.json();
  return photos;
}

async function getByQuery(query){
  const res = await fetch(`/img-by-tag${query}`);
  const photos = await res.json();
  return photos;
}

async function saveRandomImgs(){
  await fetch("/save-random-imgs");
}


document.addEventListener("DOMContentLoaded", async () => {
    const thisPath = window.location.pathname;
    //const split = thisPath.split("/");
    console.log(thisPath);
});