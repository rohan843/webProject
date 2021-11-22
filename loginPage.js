const signinForm = document.querySelector('#signinForm');

const myStorage = window.sessionStorage;

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const un = signinForm.elements.un.value;
    myStorage.setItem('un', un);
    window.location.href = 'content.html?#searchdiv'
})