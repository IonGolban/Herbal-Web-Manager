
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');
const searchButton = document.getElementById('search-button');

dropdownButton.addEventListener('click', () => {
  dropdownContent.style.display('block');
});

window.addEventListener('click', (event) => {
  if (!event.target.matches('.dropdown-button')) {
    dropdownContent.classList.remove('show');
  }
});

async function appendTagsToDropDown() {
  const tags = await getCategories();
  console.log(tags);
  const categoriesContainer = document.querySelector('.dropdown-content');

  for (const tag of tags) {
    const categoryElement = generateCategory(tag);
    categoriesContainer.innerHTML += categoryElement;
  }
}

async function getCategories() {
  const res = await fetch(`/catalog/tags`, {
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
function getCheckedTags() {
  const categories = document.querySelectorAll('.category input');

  console.log(categories);
  const selectedCategories = Array.from(categories)
    .filter(category => category.checked)
    .map(category => category.value);

  return selectedCategories;
}

async function getPlantsByTags(query) {
 //   console.log("in criteriaSearch.js");
  const tags = query.split("=")[1];
  console.log(tags);
  const res = await fetch(`/catalog/search?tags=${tags}`, {
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
      if(res.status == 400) {
        alert("Invalid data!");
      }
      return res;
    });
  const data = await res.json();
  return data;
}
searchButton.addEventListener('click', async () => {
  const tags = getCheckedTags();
  window.location.href = `/catalog?tags=${tags}`;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});

function generateCategory(category) {
  return `
    <div class="category">
      <input type="checkbox" id="${category}" value="${category}" style="display: none;">
      <label for="${category}">${category}</label>
    </div>
  `;
}

export { appendTagsToDropDown,getPlantsByTags };