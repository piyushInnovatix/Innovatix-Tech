const projectItems = document.querySelectorAll('#page-item');
const projectGroups = Array.from({ length: Math.ceil(projectItems.length / 6) }, (_, index) =>
    Array.from(projectItems).slice(index * 6, (index + 1) * 6)
);
const totalPages = projectGroups.length;
const projectContainer = document.getElementById('project-container');
const paginationContainer = document.getElementById('pagination-container'); // You'll need to add this element

let currentPage = 0;

function showGroup(pageIndex) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;

    currentPage = pageIndex;

    projectGroups.forEach((group, index) => {
        if (index === pageIndex) {
            group.forEach((item) => item.style.display = 'block');
        } else {
            group.forEach((item) => item.style.display = "none");
        }
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.className = 'pagination-btn prev-btn';
    prevButton.disabled = currentPage === 0;
    prevButton.addEventListener('click', () => showGroup(currentPage - 1));
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
        firstPageButton.addEventListener('click', () => showGroup(0));
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
        pageButton.addEventListener('click', () => showGroup(pageIndex));
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
        lastPageButton.addEventListener('click', () => showGroup(totalPages - 1));
        paginationContainer.appendChild(lastPageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.className = 'pagination-btn next-btn';
    nextButton.disabled = currentPage === totalPages - 1;
    nextButton.addEventListener('click', () => showGroup(currentPage + 1));
    paginationContainer.appendChild(nextButton);
}

// Initial setup
showGroup(0);