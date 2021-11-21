//selecting the search form
const searchForm = document.querySelector('#searchForm');

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
    //TODO: implement function 
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
            //TODO: implement displaying of search results, add a click listener to each search item, to display its specific contents via id - based search on api
            //debugging - displays the titles of searched movies
            for (res of results.res) {
                console.dir(res);
            }
        } else {
            throw 'Invalid status code';
        }
    } catch (e) {
        searchErrorHandler(e);
    }
});

