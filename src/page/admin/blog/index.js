import React, { useState } from 'react';
// Components
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
// Component - Icons
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
// Local Components
import CreateBlog from './create-blog';
import './adminBlog.css';
import UpdateBlog from './update-blog';
// API
import { getBlogList } from '../../../api';

const BlogOrderBy = {
    CreatedDate: 'CreatedDate',
    AZ: 'AZ',
    ZA: 'ZA',
    Opening: 'Opening',
    Closing: 'Closing',
    None: 'None',
};

const BlogSearchBy = {
    None: 'None',
    Date: 'Date',
    Category: 'Category',
    Status: 'Status',
};

const BlogStatus = {
    Opening: 'Opening',
    Closed: 'Closed',
};

function AdminBlog() {
    const [searchParams, setSearchParams] = useSearchParams();
    let paramQueries = {
        show: false,
        activeIndex: null,
    };
    const [take, setTake] = useState(5);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [orderBy, setOrderBy] = useState(BlogOrderBy.CreatedDate);
    const [searchBy, setSearchBy] = useState(BlogSearchBy.None);

    const [{ posts, categories, totalPost }, setState] = useState({
        posts: [],
        totalPost: 0,
        categories: [],
    });

    React.useEffect(() => {
        let query = {
            skip: page,
            take: take,
            keyword: keyword,
            orderBy: orderBy,
            searchBy: searchBy,
        };
        if (!!searchParams.get('category')) {
            query = {
                ...query,
                keyword: searchParams.get('category'),
                searchBy: BlogSearchBy.Category,
            };
        }

        // API Call Get Blog List
        getBlogList(query)
            .then((response) => {
                let blogList = response.list;
                setState((i) => ({
                    ...i,
                    posts: blogList,
                }));
            })
            .catch((err) => {});
    }, [searchParams, take, page, keyword, searchBy, orderBy]);

    const handleDeleteBlog = (id) => {
        // dispatch(deleteBlog(id));
    };

    return (
        <section>
            <Tabs
                defaultActiveKey="blog"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{
                    backgroundColor: '#f1f1f1',
                    zIndex: 1000,
                }}
            >
                <Tab eventKey="blog" title="Blog">
                    {searchParams.get('modal') === 'update_blog' &&
                    searchParams.get('blog_id') !== null &&
                    searchParams.get('show') === 'true' ? (
                        <UpdateBlog></UpdateBlog>
                    ) : (
                        posts?.map((item, index) => {
                            return (
                                <div className="admin-blog my-5" key={index}>
                                    <div className="admin-blog-btn-form">
                                        <Button
                                            variant="warning"
                                            onClick={() =>
                                                setSearchParams({
                                                    show: true,
                                                    modal: 'update_blog',
                                                    blog_id: index,
                                                })
                                            }
                                        >
                                            Update
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteBlog(item?.blogId)}>
                                            Delete
                                        </Button>
                                    </div>

                                    <div className="admin-blog-img-form">
                                        <img src={item?.presentedImage} className="w-100" />
                                    </div>
                                    <div className="admin-blog-title">{item?.articleTitle}</div>
                                    <div className="admin-blog-date">
                                        <b>Posted:</b>
                                        <i>{moment(item?.createdDate).format(' yyyy - MM - DD')}</i>
                                    </div>
                                    <div
                                        className="admin-blog-content"
                                        dangerouslySetInnerHTML={{ __html: item?.articleContent }}
                                    ></div>
                                    <div className="admin-blog-seo">
                                        <label>SEO Title:</label>
                                        <span>{item?.metaTitle}</span>|<label>SEO Keywords:</label>
                                        <span>{item?.metaKeywords}</span>|<label>SEO Description:</label>
                                        <span>{item?.metaDescription}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <ReactPaginate
                        previousLabel={<AiOutlineLeft></AiOutlineLeft>}
                        nextLabel={<AiOutlineRight></AiOutlineRight>}
                        pageCount={Math.ceil(totalPost / take)}
                        onPageChange={({ selected }) => {
                            setPage(selected + 1);
                        }}
                        containerClassName={'pagination'}
                        previousLinkClassName={'pagination-arrow-hover'}
                        nextLinkClassName={'pagination-arrow-hover'}
                        pageClassName="px-3"
                        disabledClassName={'pagination__link--disabled'}
                        activeClassName={'pagination-item-active'}
                    ></ReactPaginate>
                </Tab>
                <Tab eventKey="create_blog" title="Create Blog">
                    <CreateBlog></CreateBlog>
                </Tab>
            </Tabs>
        </section>
    );
}

export default AdminBlog;
