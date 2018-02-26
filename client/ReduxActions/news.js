import $ from 'jquery';
import _ from 'underscore';

export function fetchNews() {
    return dispatch => {
        dispatch(requestNews());

        return $.ajax('/api/news')
            .done(function(data) {
                dispatch(receiveNews(data));
            });
    };
}

export function requestNews() {
    return {
        type: 'REQUEST_NEWS'
    };
}

export function receiveNews(news) {
    return {
        type: 'RECEIVE_NEWS',
        news: news
    };
}

export function loadNews(options) {
    let params = {};

    if(options && options.limit) {
        params.limit = options.limit;
    }

    return {
        types: ['REQUEST_NEWS', 'RECEIVE_NEWS'],
        shouldCallAPI: (state) => {
            return _.size(state.news.news) === 0 || (options && !!options.forceLoad);
        },
        APIParams: { url: '/api/news/', cache: false, data: params }
    };
}

export function addNews(newsText) {
    return {
        types: ['ADD_NEWS', 'NEWS_ADDED'],
        shouldCallAPI: (state) => {
            return state.news.news;
        },
        APIParams: {
            url: '/api/news',
            type: 'POST',
            data: { text: newsText }
        }
    };
}

export function saveNews(id, text) {
    return {
        types: ['SAVE_NEWS', 'NEWS_SAVED'],
        shouldCallAPI: () => true,
        APIParams: {
            url: `/api/news/${id}`,
            type: 'PUT',
            data: { text: text }
        }
    };
}

export function deleteNews(id) {
    return {
        types: ['DELETE_NEWS', 'NEWS_DELETED'],
        shouldCallAPI: () => true,
        APIParams: {
            url: `/api/news/${id}`,
            type: 'DELETE'
        }
    };
}

export function clearNewsStatus() {
    return {
        type: 'CLEAR_NEWS_STATUS'
    };
}
