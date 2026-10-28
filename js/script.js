const grid = document.getElementById("cardGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const resultCount = document.getElementById("resultCount");

let currentCategory = "all";
let searchText = "";

function renderCards(list) {
  if (list.length === 0) {
    grid.innerHTML = "<p class='empty'>No results found.</p>";
    resultCount.textContent = "";
    return;
  }

  grid.innerHTML = list.map(item => `
    <article class="card">
      <span class="tag ${item.category}">${item.category}</span>
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <button class="toggle-btn" data-id="${item.id}">Show details</button>
      <p class="details hidden" id="details-${item.id}">${item.details}</p>
    </article>
  `).join("");

  resultCount.textContent = `Showing ${list.length} result(s)`;
}

function applyFilters() {
  const filtered = items.filter(item => {
    const matchesCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });
  renderCards(filtered);
}

// Search .
searchInput.addEventListener("input", (e) => {
  searchText = e.target.value.toLowerCase().trim();
  applyFilters();
});

// Category filter
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    applyFilters();
  });
});

// Expand details... event delegation
grid.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-btn")) {
    const id = e.target.dataset.id;
    const details = document.getElementById(`details-${id}`);
    details.classList.toggle("hidden");
    e.target.textContent =
      details.classList.contains("hidden") ? "Show details" : "Hide details";
  }
});

applyFilters(); 