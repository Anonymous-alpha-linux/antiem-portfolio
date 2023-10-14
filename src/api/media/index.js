const { APIClient } = require('../api_helper');
const { serialize } = require('object-to-formdata');

const url = {
    GET_ASSET_LIST: '/api/asset/list',
    GET_ASSET: '/api/asset',
    POST_ASSET: '/api/asset',
    PUT_ASSET: '/api/asset',
    DELETE_ASSET: '/api/asset',
};
const api = new APIClient();

export const getMedias = (request, config) => {
    return api.get(url.GET_ASSET_LIST, request, config);
};

export const getMedia = (id, request, config) => {
    return api.get(`${url.GET_ASSET}/${id}`, request, config);
};

export const postMedia = (body, config) => {
    const formData = serialize(body);

    return api.create(url.POST_ASSET, formData, {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const putMedia = (id, body, config) => {
    return api.put(url.PUT_ASSET + '/' + id, body, config);
};

export const deleteMedia = (id) => {
    return api.delete(`${url.DELETE_ASSET}/${id}`);
};
