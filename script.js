// ===== ELEMENTS =====
const searchBar = document.getElementById("searchBar");
const cards = document.querySelectorAll(".card");
const favoritesContainer = document.getElementById("favoritesContainer");
const sideButtons = document.querySelectorAll(".side-btn");
const modeTitle = document.getElementById("currentMode");

// ===== STATE =====
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentFilter = "home";

sideButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".side-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        modeTitle.textContent = btn.textContent;

        applyFilters();
    });
});

// ===== FAVORITES UI UPDATE =====
function updateFavoritesUI() {
    favoritesContainer.innerHTML = "";

    cards.forEach(card => {
        const name = card.dataset.name;
        const btn = card.querySelector(".fav-btn");

        if (!btn) return;

        if (favorites.includes(name)) {
            btn.classList.add("active");

            const clone = card.cloneNode(true);
            const favBtnClone = clone.querySelector(".fav-btn");
            if (favBtnClone) favBtnClone.remove();

            favoritesContainer.appendChild(clone);
        } else {
            btn.classList.remove("active");
        }
    });
}

// ===== FAVORITES CLICK HANDLER =====
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("fav-btn")) {
        const card = e.target.closest(".card");
        const name = card.dataset.name;

        if (favorites.includes(name)) {
            favorites = favorites.filter(f => f !== name);
        } else {
            favorites.push(name);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoritesUI();
    }
});

// ===== FILTERING FUNCTION =====
function applyFilters() {
    const searchValue = searchBar.value.toLowerCase();

    cards.forEach(card => {
        const stack = card.dataset.stack;
        const matchesSearch = card.textContent.toLowerCase().includes(searchValue);
        const matchesStack = currentFilter === "home" || stack === currentFilter;

        if (matchesSearch && matchesStack) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// ===== SEARCH =====
searchBar.addEventListener("keyup", applyFilters);

// ===== SIDEBAR FILTERS =====
sideButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".side-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        applyFilters();
    });
});

// ===== INIT =====
updateFavoritesUI();
applyFilters();