const { APIClient } = require('../api_helper');

const api = new APIClient();

const url = {
    GET_SETTING: '/api/setting',
    POST_SETTING: '/api/setting',
};

export const getSetting = (request, config) => {
    return api.get(`${url.GET_SETTING}`, request, config);
};

export const postSetting = (body, config) => {
    return api.create(
        url.POST_SETTING,
        {
            ...body,
            body: JSON.stringify(body.body),
        },
        {
            ...config,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};
