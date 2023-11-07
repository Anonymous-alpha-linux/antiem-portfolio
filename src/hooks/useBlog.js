import { useEffect, useState } from 'react';

import { getBlogList } from '../api';

export function useBlog() {
    const [{ blogs, total }, setState] = useState({
        blogs: [],
        total: 0,
    });

    const [page, setPage] = useState(0);
    const [take, setTake] = useState(5);

    useEffect(() => {
        getBlogList({
            skip: page,
            take,
            orderBy: 'CreatedDate',
            searchBy: 'None',
            keyword: '',
        })
            .then((response) => {
                console.log(response);
                if (response?.list) {
                    setState((i) => ({
                        ...i,
                        blogs: response?.list || [],
                        total: response?.total,
                    }));
                    return;
                }
            })
            .catch((error) => {});
    }, [page, take]);

    return {
        page,
        take,
        setPage,
        setTake,
        blogs,
        total,
    };
}
