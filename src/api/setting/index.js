const { APIClient } = require('../api_helper');

const api = new APIClient();

const url = {
    GET_SETTING: '/api/settings',
    POST_SETTING: '/api/settings',
};

export const getSetting = (request, config) => {
    return api.get(`${url.GET_SETTING}`, request, config);
};

export const postSetting = ({ page, body }, config) => {
    return api.create(
        url.POST_SETTING,
        {
            page,
            body: JSON.stringify(body),
        },
        {
            ...config,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};
