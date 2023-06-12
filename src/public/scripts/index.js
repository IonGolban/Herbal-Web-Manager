const searchInput = document.querySelector(".searchInput");
const input = document.querySelector("input");
const suggestions = document.querySelector(".suggestions");
const trendings = document.querySelector(".trending-search-tags");

let timeoutId;

input.addEventListener("keyup", async () => {
    clearTimeout(timeoutId);

    console.log("keyup");
    if(input.value.length > 3 ){
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
            for(let i = 0; i < tags.length; i++){
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



    input.addEventListener("blur", () => {
        console.log("blur");
        suggestions.classList.remove("active");
        trendings.style.display = "flex";
        }


    );
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            window.location.href = `/catalog?query=${input.value}`;
        }
      });
//5 tags
const getTagsImagesbyKey = async (key) => {
    const res = await fetch(`/img-by-tag?key=${key}`);
    const tags = await res.json();
    return photos;
}