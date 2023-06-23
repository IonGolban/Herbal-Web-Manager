
export async function setButtons(){
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
}
const logoutButton = document.querySelector(".logout-button");

logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.removeItem("token");
  window.location.href = "/login";
});

export async function isLoggedIn() {
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