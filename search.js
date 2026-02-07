const suggestionsArray = ["Bewakoof","Hoodies","Shirts", "Shoes", "Mobile Covers", "Accessories", "Women", "Men", "Jeans", "Cargos", "Sliders", "Joggers","Sweater","T-Shirt","Trousers","Shorts","Footwear"];

function showSuggestions(event) {
    const input = document.getElementById("sear").value.toLowerCase();
    const list = document.getElementById("sugglist");

    list.innerHTML = "";

    if (input.length > 0) {
        const filteredSuggestions = suggestionsArray.filter(item => item.toLowerCase().includes(input));
        list.style.display = "block";

        filteredSuggestions.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.textContent = item;

            listItem.addEventListener('click', function () {
                document.getElementById("sear").value = item;
                list.style.display = "none";
            });
            list.appendChild(listItem);
        });
    } else {
        list.style.display = "none";
    }


    if (event.key === "Enter") {
        event.preventDefault();
        handleSearch(event);
    }
}

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById("sear").value.trim();

    if (searchTerm) {
        console.log(`Redirecting to search.html with query: ${searchTerm}`);
        window.location.href = `search.html?query=${encodeURIComponent(searchTerm)}`;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchBtn').addEventListener('click', function (event) {
        handleSearch(event);
    });
});


document.getElementById('sear').addEventListener('click', function (event) {
    event.stopPropagation();
});
document.addEventListener('click', function (e) {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const collapseMenu = document.getElementById('navbarNav');
    const searchBox = document.getElementById('sear');

    if (collapseMenu && collapseMenu.classList.contains('show') && !navbarToggler.contains(e.target) && !collapseMenu.contains(e.target) && !searchBox.contains(e.target)) {
        new bootstrap.Collapse(collapseMenu).toggle();
    }
});

