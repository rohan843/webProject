function errorHandler(errorString, e) {
    if (errorString.toLowerCase() === 'search') {
        console.log('An error occurred while getting search results', e);
    } else if (errorString.toLowerCase() === 'getbyid') {
        console.log('An error occurred while getting the movie with given id', e);
    } else if (errorString.toLowerCase() === 'getbytitle') {
        console.log('An error occurred while getting the movie with given title', e);
    } else if (errorString === 'searchtype') {
        console.log('Wrong search type given');
    } else if (errorString === 'noquery') {
        console.log('no search query provided');
    } else {
        console.log('An error occurred. That\'s all we know', e);
    }
}

//accepts a search string, returns an object with a status string and the search results array
async function getResultsBySearch(query) {
    const url = `http://www.omdbapi.com/?apikey=642ed49d&s=${encodeURIComponent(query)}`;
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

//accepts a query, which can be IMDb id or movie title, searchType can be either 'id' or 'title'
//make shortPlot false for full plot, returns an object with a status string and the search result
async function getResultsBy(searchType, query, shortPlot = true) {
    if (!query) {
        errorHandler('noquery');
    }
    else if (searchType == 'id') {
        const url = `http://www.omdbapi.com/?apikey=642ed49d&i=${encodeURIComponent(query)}&plot=${shortPlot.toString()}`;
        try {
            const result = await axios.get(url);
            if (result.data.Response === 'False') {
                throw result.data.Error;
            }
            result.data.status = 'fine';
            return result.data;
        } catch (e) {
            errorHandler('getbyid', e);
            return {
                status: 'error',
            };
        }
    } else if (searchType == 'title') {
        const url = `http://www.omdbapi.com/?apikey=642ed49d&t=${encodeURIComponent(query)}&plot=${shortPlot.toString()}`;
        try {
            const result = await axios.get(url);
            if (result.data.Response === 'False') {
                throw result.data.Error;
            }
            result.data.status = 'fine';
            return result.data;
        } catch (e) {
            errorHandler('getbytitle', e);
            return {
                status: 'error',
            };
        }
    } else {
        errorHandler('searchtype');
        return {
            status: 'error',
        };
    }
}