const { APIClient } = require('../api_helper');

const url = {
    GET_TAG_LIST: '/api/tag/list',
    GET_TAG: '/api/tag',
    POST_TAG: '/api/tag',
    PUT_TAG: '/api/tag',
    DELETE_TAG: '/api/tag',
};
const api = new APIClient();

export const getTags = (request, config) => {
    return api.get(url.GET_TAG_LIST, request, config);
};

export const getTag = (id, request, config) => {
    return api.get(`${url.GET_TAG}/${id}`, request, config);
};

export const postTag = (body, config) => {
    return api.create(url.POST_TAG, body, {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const putTag = (id, body, config) => {
    return api.put(url.PUT_TAG + '/' + id, body, config);
};

export const deleteTag = (id, config) => {
    return api.delete(`${url.DELETE_TAG}/${id}`, config);
};
