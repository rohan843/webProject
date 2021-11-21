//selecting the search form
const searchForm = document.querySelector('#searchForm');

//selecting the div to display search results
const searchDiv = document.querySelector('#searchdiv');

window.addEventListener('click', function () {
    searchDiv.style.visibility = "hidden";
    searchDiv.innerHTML = '';
})

//Handles errors if search goes wrong
function searchErrorHandler(e) {
    console.log('A search error occurred', e);
}

//Handles errors if displaying goes wrong
function displayErrorHandler(e) {
    console.log('A display error occurred', e);
}

//Handles the case when search query returns no result
function handleNullSearch() {
    searchForm.elements.userQuery.placeholder = 'No content...';
    setTimeout(function() {
        searchForm.elements.userQuery.placeholder = 'Search';
    }, 2500);
    console.log('No titles found');
}

//Displays full details of the film whose id (default) or title is given on the main display area
async function displayOnMainDisplayAreaBy(query, queryType = 'id') {
    if (!query) {
        alert('The title was not provided, so no result can be shown. If you believe this is an error, please register an issue at https://github.com/rohan843/webProject/issues');
        return;
    }
    try {
        const res = await getResultsBy(queryType, query, false);
        //TODO: display the content of res on a main display
        console.log(res);
    } catch (e) {
        displayErrorHandler(e);
    }
}

//adding submit event listener to search form
searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    e.stopPropagation();
    const query = searchForm.elements.userQuery.value;

    //clears the input text once query submitted in the search form
    searchForm.elements.userQuery.value = '';

    //Main body of function
    try {
        //obtains the search results
        const results = await getResultsBySearch(query);

        //validating results object
        if (results.status === 'error') {
            throw 'Some error occurred';
        } else if (results.status === 'empty') {
            handleNullSearch();
        } else if (results.status === 'fine') {
            //displays the titles of searched movies in the list
            for (let i = 0; i < results.res.length; i++) {
                let res = results.res[i];
                console.dir(res);
                const topLevelDiv = document.createElement('div');
                const imageSpan = document.createElement('span');
                const image = document.createElement('img');
                const contentDiv = document.createElement('div');
                const headSpan = document.createElement('span');
                const head = document.createElement('h2');
                const typeSpan = document.createElement('span');

                topLevelDiv.style.cursor = "pointer";
                topLevelDiv.classList.add('searchListClass1');
                topLevelDiv.style.paddingBottom = "0.5em";
                imageSpan.style.display = "inline-block";
                imageSpan.style.fontSize = "4rem";
                imageSpan.style.height = "6rem";
                image.style.height = "1.5em";
                image.style.width = "1em";
                if (res.Poster == 'N/A')
                    image.src = "https://images.pexels.com/photos/754194/pexels-photo-754194.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
                else
                    image.src = res.Poster;
                contentDiv.style.display = "inline-block";
                contentDiv.style.marginLeft = "0.5rem";
                headSpan.style.display = "block";
                if (res.Title.length <= 24)
                    head.innerHTML = res.Title;
                else
                    head.innerHTML = res.Title.slice(0, 23) + '...';
                head.style.fontSize = "1.5rem";
                typeSpan.style.display = "block";
                typeSpan.innerHTML = res.Type;
                typeSpan.style.fontSize = "0.6rem";
                typeSpan.style.color = "rgba(255, 255, 255, 0.33)";

                topLevelDiv.append(imageSpan);
                topLevelDiv.append(contentDiv);
                imageSpan.append(image);
                contentDiv.append(headSpan);
                contentDiv.append(typeSpan);
                headSpan.append(head);

                topLevelDiv.addEventListener('click', async function () {
                    await displayOnMainDisplayAreaBy(res.imdbID);
                    searchDiv.style.visibility = 'hidden';
                    searchDiv.innerHTML = '';
                });

                searchDiv.append(topLevelDiv);
            }
            searchDiv.style.visibility = 'visible';
        } else {
            throw 'Invalid status code';
        }
    } catch (e) {
        handleNullSearch();
        searchErrorHandler(e);
    }
});

