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
    else
    {
        document.addEventListener("click", async (event) => {
            if (event.target.classList.contains("remove-btn")) {

                const button = event.target;

                deleteGrid(button);

            }
        });
    }

});


function deleteGrid(button){

    const gridElement = button.parentNode.parentNode;
    gridElement.remove();

}


