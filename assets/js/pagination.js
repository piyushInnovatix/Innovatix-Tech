const projectItems = document.querySelectorAll('#page-item');

const projectGroups = Array.from({ length: Math.ceil(projectItems.length / 6) }, (_, index) => Array.from(projectItems).slice(index * 6, (index + 1) * 6));

const projectContainer = document.getElementById('project-container');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentGroupIndex = 0;

function showGroup(groupIndex) {
    projectGroups.forEach((group, index) => {
        if (index === groupIndex) {
            group.forEach((item) => item.style.display = 'block');
        }
        else {
            group.forEach((item) => item.style.display = "none");
        }
    });

    if (groupIndex === 0) {
        prevBtn.classList.add('disabled');
    }
    else {
        prevBtn.classList.remove('disabled');
    }

    if (groupIndex === projectGroups.length - 1) {
        nextBtn.classList.add('disabled');
    }
    else {
        nextBtn.classList.remove('disabled');
    }
}

showGroup(currentGroupIndex);

prevBtn.addEventListener('click', () => {
    if (currentGroupIndex > 0) {
        currentGroupIndex--;
        showGroup(currentGroupIndex);
    }

    setTimeout(() => {
        projectContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
});

nextBtn.addEventListener('click', () => {
    if (currentGroupIndex < projectGroups.length) {
        currentGroupIndex++;
        showGroup(currentGroupIndex);
    }
});
