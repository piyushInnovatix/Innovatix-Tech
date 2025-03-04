const projectItems = document.querySelectorAll('#page-item');
const projectGroups = Array.from({ length: Math.ceil(projectItems.length / 6) }, (_, index) =>
    Array.from(projectItems).slice(index * 6, (index + 1) * 6)
);
const totalPages = projectGroups.length;
const projectContainer = document.getElementById('project-container');
const paginationContainer = document.getElementById('pagination-container');
const filterButtons = document.querySelectorAll(".page-filter-btn");
const projects = document.querySelectorAll(".img-disable");

document.addEventListener("DOMContentLoaded", function () {
    // Hide pagination initially (will show only if "all" is active)
    updatePaginationVisibility("all");
    
    filterButtons.forEach((button) => {
        if (button.getAttribute("data-category") === "all") {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            this.classList.add("active");
            
            // Update pagination visibility based on selected category
            updatePaginationVisibility(category);

            if (category === "all") {
                // Show projects by group when "all" is selected
                showGroup(0);
            } else {
                // When specific category is selected, show all matching projects
                // and hide pagination
                projects.forEach((project) => {
                    if (project.getAttribute("data-category") === category) {
                        project.style.display = "block";
                    } else {
                        project.style.display = "none";
                    }
                });
            }
        });
    });
});

// Function to show/hide pagination based on selected category
function updatePaginationVisibility(category) {
    if (category === "all") {
        paginationContainer.style.display = "flex"; // or "block" depending on your CSS
    } else {
        paginationContainer.style.display = "none";
    }
}

const allActive = () => {
    filterButtons.forEach((button) => {
        if (button.getAttribute('data-category') == 'all') {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
};

let currentPage = 0;

function showGroup(pageIndex) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;

    currentPage = pageIndex;

    // Hide all projects first
    projects.forEach(project => {
        project.style.display = "none";
    });

    // Only show projects for current page
    projectGroups[pageIndex].forEach((item) => {
        item.style.display = 'block';
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.className = 'pagination-btn prev-btn';
    prevButton.disabled = currentPage === 0;
    prevButton.addEventListener('click', () => {
        showGroup(currentPage - 1);
        allActive();
    });
    paginationContainer.appendChild(prevButton);

    let visiblePages = [];

    if (totalPages <= 3) {
        visiblePages = Array.from({ length: totalPages }, (_, i) => i);
    } else if (currentPage < 2) {
        visiblePages = [0, 1, 2];
    } else if (currentPage > totalPages - 3) {
        visiblePages = [totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
        visiblePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    if (visiblePages[0] > 0) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.className = 'pagination-btn';
        firstPageButton.addEventListener('click', () => {
            showGroup(0);
            allActive();
        });
        paginationContainer.appendChild(firstPageButton);

        if (visiblePages[0] > 1) {
            const ellipsis = document.createElement('button');
            ellipsis.textContent = '...';
            ellipsis.className = 'pagination-ellipsis';
            paginationContainer.appendChild(ellipsis);
        }
    }

    visiblePages.forEach(pageIndex => {
        const pageButton = document.createElement('button');
        pageButton.textContent = (pageIndex + 1).toString();
        pageButton.className = currentPage === pageIndex
            ? 'pagination-btn active'
            : 'pagination-btn';
        pageButton.addEventListener('click', () => {
            showGroup(pageIndex);
            allActive();
        });
        paginationContainer.appendChild(pageButton);
    });

    if (visiblePages[visiblePages.length - 1] < totalPages - 1) {
        if (visiblePages[visiblePages.length - 1] < totalPages - 2) {
            const ellipsis = document.createElement('button');
            ellipsis.textContent = '...';
            ellipsis.className = 'pagination-ellipsis';
            paginationContainer.appendChild(ellipsis);
        }

        const lastPageButton = document.createElement('button');
        lastPageButton.textContent = totalPages.toString();
        lastPageButton.className = 'pagination-btn';
        lastPageButton.addEventListener('click', () => {
            showGroup(totalPages - 1);
            allActive();
        });
        paginationContainer.appendChild(lastPageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.className = 'pagination-btn next-btn';
    nextButton.disabled = currentPage === totalPages - 1;
    nextButton.addEventListener('click', () => {
        showGroup(currentPage + 1);
        allActive();
    });
    paginationContainer.appendChild(nextButton);
}

// Initial setup - show first page with "all" category active
showGroup(0);