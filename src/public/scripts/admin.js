import { setButtons } from "./utilFunctions.js";

document.addEventListener("DOMContentLoaded", async () => {
    await setButtons();
    const users = await getListOfData("users");
    console.log(users);
    const list = await generateList(users, "user");
    const ulUsers = document.querySelector("#users-list");
    ulUsers.appendChild(list);

    const plants = await getListOfData("plants");
    const listPlants = await generateList(plants, "plant");
    const ulPlants = document.querySelector("#plants-list");
    ulPlants.appendChild(listPlants);

});

async function generateList(data, type) {
    const fragment = document.createDocumentFragment();

    data.forEach(entity => {
        const listItem = document.createElement('li');

        const image = document.createElement('img');
        image.src = entity.imageSrc;
        image.alt = entity.name;

        const idSpan = document.createElement('span');
        idSpan.textContent = `ID: ${entity.id}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';

        listItem.appendChild(image);
        listItem.appendChild(idSpan);
        listItem.appendChild(deleteButton);

        deleteButton.addEventListener('click', async () => {
            if (type == "user") {
                const data = await deletePhoto(entity.id,type);
            } else if (type == "plant") {
                const data = await deletePhoto(entity.id,type);
            }
            const parentElement = deleteButton.parentNode;
            parentElement.remove();
        });

        fragment.appendChild(listItem);
    });

    return fragment;
}

async function deletePhoto(idPlant,type) {
    const res = await fetch(`/${type}/delete?id=${idPlant}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    }).then(res => {
        if (res.status == 401) {
            window.location.href = "/login";
            alert("You are not logged in!");
        } return res;
    });
    const data = await res.json();
    return data;
}



async function getListOfData(type) {
    const res = await fetch(`/${type}/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    })
        .then(res => {
            if (res.status == 401) {
                window.location.href = "/login";
                alert("You are not logged in!");
            }
            return res;
        });
    const data = await res.json();
    return data;
}