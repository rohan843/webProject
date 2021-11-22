const searchForm = document.querySelector('#searchForm');
const signIn = document.querySelector('#signin');
const getStarted = document.querySelector('#getstarted');

const myStorage = window.sessionStorage;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const query = searchForm.elements.userQuery.value;
    myStorage.setItem('searchQuery', query);
    console.log(query);
    searchForm.elements.userQuery.value = '';
    if (myStorage.getItem('un')) {
        window.location.href = 'content.html?#searchdiv';
    } else {
        myStorage.setItem('welcome', 'true');
        window.location.href = 'login.html';
    }
});

signIn.addEventListener('click', (e) => {
    if (myStorage.getItem('un')) {
        alert(`You are already signed in ${myStorage.getItem('un')}`);
    } else {
        myStorage.setItem('welcome', 'true');
        window.location.href = 'login.html';
    }
});

getStarted.addEventListener('click', (e) => {
    if (!myStorage.getItem('un')) {
        myStorage.setItem('welcome', 'true');
        window.location.href = 'login.html';
    } else {
        window.location.href = 'content.html?#searchdiv';
    }
});
