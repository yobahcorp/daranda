let menu = document.querySelector('.nav-links');
let bars = document.querySelector('.bars');

bars.onclick = () => {
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
};

menu.onclick = () => {
    menu.style.display = 'none';
};
