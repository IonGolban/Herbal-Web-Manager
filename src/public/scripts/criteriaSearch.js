const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');
const categories = document.querySelectorAll('.category input[type="checkbox"]');
const searchButton = document.getElementById('search-button');

// Deschide/închide meniul dropdown la clic pe buton
dropdownButton.addEventListener('click', () => {
  dropdownContent.classList.toggle('show');
});

// Ascunde meniul dropdown la clic în afara acestuia
window.addEventListener('click', (event) => {
  if (!event.target.matches('.dropdown-button')) {
    dropdownContent.classList.remove('show');
  }
});

// Funcția de căutare
function performSearch() {
  const selectedCategories = Array.from(categories)
    .filter(category => category.checked)
    .map(category => category.value);

  // Execută căutarea și afișează rezultatele
  console.log('Selected categories:', selectedCategories);
}

// Execută căutarea la clic pe butonul de căutare
searchButton.addEventListener('click', () => {
  performSearch();
});

// Execută căutarea la apăsarea tastei Enter în câmpul de căutare
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});