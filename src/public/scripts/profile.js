const createCollectionButton = document.getElementById("create-collection");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const plants = 6;
  const container = document.querySelector(".photos");
  for (let i = 0; i < plants; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/600/?random=${randomNum}`;

    const el = document.createElement("div");
    el.classList.add("photo");
    el.style.backgroundImage = `url(${url})`;
    el.innerHTML = `
    <div class="button-container">
            <button class="add-btn">add</button>
            <button class="like-btn">like</button>
    </div>
    `;

    container.appendChild(el);
  }
}); 
async function createCollection(event){
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
      if(!collectionName || !collectionDesc){
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

async function fetchCreateCollection(collection){
  const res = await fetch("/collection/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(collection)
  }).then((res) => {
    if(!res.ok){
      alert("Could not create collection");
    }
    if(res.status === 401){
      alert("You must be logged in to create a collection");
    }
    return res.json();
  });
  return res;
}

createCollectionButton.addEventListener("click", createCollection);


  