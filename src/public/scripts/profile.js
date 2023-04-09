document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const plants = 6;
  const container = document.getElementById("liked-photos");

  for (let i = 0; i < plants; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/600/?random=${randomNum}`;

    const el = document.createElement("img");
    el.src = `${url}`;

    container.appendChild(el);
  }
}); 
  