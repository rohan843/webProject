const subs1 = document.querySelector('#subs1');
const subs2 = document.querySelector('#subs2');
const subs3 = document.querySelector('#subs3');

for(let subs of [subs1, subs2, subs3])
{
    subs.addEventListener('click', (e) => {
        window.location.href = "login.html";
    });
}