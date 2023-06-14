

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


  