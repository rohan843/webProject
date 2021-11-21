function errorHandler(errorString, e) {
    if (errorString.toLowerCase() === 'search') {
        console.log('An error occurred while getting search results', e);
    } else if (errorString.toLowerCase() === 'getbyid') {
        console.log('An error occurred while getting the movie with given id', e);
    } else if (errorString.toLowerCase() === 'getbytitle') {
        console.log('An error occurred while getting the movie with given title', e);
    } else {
        console.log('An error occurred. That\'s all we know', e);
    }
}

//accepts a search string, returns an object with a status string and the search results array
async function getResultsBySearch(query) {
    const url = `http://www.omdbapi.com/?apikey=642ed49d&s=${query}`;
    try {
        const result = await axios.get(url);
        // console.dir(result);
        return {
            status: result.data.Search.length > 0 ? 'fine' : 'empty',
            res: result.data.Search,
        };
    }
    catch (e) {
        errorHandler('search', e);
        return {
            status: "error",
            res: [],
        };
    }
}