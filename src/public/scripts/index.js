const searchInput = document.querySelector(".searchInput");
const input = document.querySelector("input");
const suggestions = document.querySelector(".suggestions");
const trendings = document.querySelector(".trending-search-tags");
const logoutButton = document.querySelector(".logout-button");
console.log("token = ", window.localStorage.getItem("token"));

let timeoutId;

document.addEventListener("DOMContentLoaded", async () => {
    if(window.localStorage.getItem("token") === null || !await isLoggedIn()){
        window.localStorage.removeItem("token");
        document.querySelector(".logout-button").style.display = "none";
        document.querySelector(".login-button").style.display = "block";
        document.querySelector(".signup-button").style.display = "block";
        document.querySelector(".profile-button").style.display = "none";
    }else{
        document.querySelector(".logout-button").style.display = "block";
        document.querySelector(".login-button").style.display = "none";
        document.querySelector(".signup-button").style.display = "none";
        document.querySelector(".profile-button").style.display = "block";
        
    }
});
const getTagsImagesbyKey = async (key) => {
    const res = await fetch(`/img-by-tag?key=${key}`);
    const tags = await res.json();
    return photos;
}
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
    ;
    console.log("res = ", res); 
    return res;
  }
const logout = async () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
};

logoutButton.addEventListener("click", logout);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        window.location.href = `/catalog?query=${input.value}`;
    }
});
input.addEventListener("blur", () => {
    console.log("blur");
    suggestions.classList.remove("active");
    trendings.style.display = "flex";
}
);

input.addEventListener("keyup", async () => {
    clearTimeout(timeoutId);

    console.log("keyup");
    if (input.value.length > 3) {
        console.log(input.value);

        timeoutId = setTimeout(async () => {
            const response = await fetch(`/search?key=${input.value.toLocaleLowerCase()}`);
            const tags = await response.json();
            console.log(tags);

            if (tags.length <= 0) {
                suggestions.classList.remove("active");
                trendings.style.display = "flex";
                return;
            }

            const ul = document.querySelector(".suggestions ul");
            ul.innerHTML = "";
            for (let i = 0; i < tags.length; i++) {
                const li = document.createElement("li");
                //li.innerHTML = `<a href='/catalog?query=${tags[i]}>` + tags[i] + "</a>";
                li.innerHTML = tags[i];
                ul.appendChild(li);
            }

            suggestions.classList.add("active");
            trendings.style.display = "none";
        }, 1000);
    }

});