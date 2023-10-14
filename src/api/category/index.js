import { APIClient } from '../api_helper';

const api = new APIClient();
const url = {
    GET_CATEGORY_LIST: '/api/category/list',
    GET_SINGLE_CATEGORY: '/api/category',
    POST_NEW_CATEGORY: '/api/category',
    PUT_CATEGORY: '/api/category',
    DELETE_CATEGORY: '/api/category',
};

export const getCategoryList = (request, config) => {
    return api.get(url.GET_CATEGORY_LIST, request, config);
};

export const getSingleCategory = (id, config) => {
    return api.get(`${url.GET_SINGLE_CATEGORY}/${id}`, null, config);
};

export const postCategory = (body, config) => {
    return api.create(url.POST_NEW_CATEGORY, body, config);
};

export const putCategory = (id, body, config) => {
    return api.put(`${url.PUT_CATEGORY}/${id}`, body, config);
};

export const deleteCategory = (id, config) => {
    return api.delete(`${url.DELETE_CATEGORY}/${id}`, config);
};
