const projectItems = document.querySelectorAll('#page-item');

const projectGroups = Array.from({ length: Math.ceil(projectItems.length / 6) }, (_, index) => Array.from(projectItems).slice(index * 6, (index + 1) * 6));

const projectContainer = document.getElementById('project-container');

const btn1 = document.getElementById('btn-1');
const btn2 = document.getElementById('btn-2');
const btn3 = document.getElementById('btn-3');
const btn4 = document.getElementById('btn-4');
const btn5 = document.getElementById('btn-5');
const btn6 = document.getElementById('btn-6');

const filterButtons = document.querySelectorAll('.page-filter-btn')


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
}

showGroup(currentGroupIndex);

const removeClass = () => {
    filterButtons.forEach((btn) => {
        btn.classList.remove('active')
    })
}

btn1.addEventListener('click', () => {
    showGroup(0)
    removeClass();
});

btn2.addEventListener('click', () => {
    showGroup(1)
    removeClass();
});
btn3.addEventListener('click', () => {
    showGroup(2)
    removeClass();
});
btn4.addEventListener('click', () => {
    showGroup(3)
    removeClass();
});
btn5.addEventListener('click', () => {
    showGroup(4)
    removeClass();
});
btn6.addEventListener('click', () => {
    showGroup(5)
    removeClass();
});
