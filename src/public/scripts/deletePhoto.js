const delBut = document.querySelector(".remove-btn");



document.addEventListener("DOMContentLoaded", async () => {

    const query = window.location.search;
    const searchParam = query.split("=")[0];
    
    if(searchParam === "?collection_id"){

        document.addEventListener("click", async (event) => {
            if (event.target.classList.contains("remove-btn")) {

                const button = event.target;

                deleteGrid(button);

            }
        });

    }
    else if (searchParam === "?uploaded_photos"){
        document.addEventListener("click", async (event) => {
            if (event.target.classList.contains("remove-btn")) {

                const button = event.target;

                const nup = document.querySelector(".number-of-uploads");
                const paragraf = nup.querySelector("p");
                const numar = parseInt(paragraf.textContent);
                const numarSczut = numar - 1;
                paragraf.textContent = numarSczut;

                deleteGrid(button);

            }
        });
    }
    else
    {
        document.addEventListener("click", async (event) => {
            if (event.target.classList.contains("remove-btn")) {

                const button = event.target;

                const nlik = document.querySelector(".number-of-likes");
                const paragraf = nlik.querySelector("p");
                const numar = parseInt(paragraf.textContent);
                const numarSczut = numar - 1;
                paragraf.textContent = numarSczut;

                deleteGrid(button);

            }
        });
    }

});


function deleteGrid(button){

    const gridElement = button.parentNode.parentNode;
    gridElement.remove();


}


