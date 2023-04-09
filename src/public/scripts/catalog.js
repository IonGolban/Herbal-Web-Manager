document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const plants = 21;

  const container = document.getElementById("plants");

  for (let i = 0; i < plants; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/600/?random=${randomNum}`;

    const el = document.createElement("div");
    el.classList.add("plant");
    el.style.backgroundImage = `url(${url})`;

    el.innerHTML = `
      <div class="plant-desc">
        <div>
          <h2 class="plant-title">Small plant</h2>
          <p class="plant-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis lacus a orci malesuada, eget euismod
            lectus interdum. Duis sit amet ex quis dolor tempor venenatis id id nulla.
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
});
