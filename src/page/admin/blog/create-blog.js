import React from 'react';
import { Badge, Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';

import { TextEditor, UploadModal } from '../../../component';
import CategoryModal from './category';

import * as yup from 'yup';
import moment from 'moment';

import { postTag, postCategory, getCategoryList, getTags, postBlog, getTag, postMedia, getMedias } from '../../../api';

let blogSchema = yup.object().shape({
    articleTitle: yup.string().required('This field is require field'),
    articleContent: yup.object().shape({
        value: yup.string().required('This field is require field'),
    }),
    categories: yup.array().required(),
    presentedImage: yup.string().required('This field is require field'),
    status: yup.string().required('This field is require field'),
    metaKeywords: yup.string().required('This field is require field'),
    metaTitle: yup.string().required('This field is require field'),
    metaDescription: yup.string().required('This field is require field'),
    createdDate: yup.date().required(),
});

const CreateBlog = () => {
    const [demo, setDemo] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const [showUploadModal, setShowUploadModal] = React.useState(false);
    const [preferedTags, setPreferedTags] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    let blogStatus = ['Publised', 'Draft', 'Pending'];

    const categoryIdsOptionRef = React.useRef();
    const typingTagTimeout = React.useRef();

    const [{ categories, tags }, setState] = React.useState({
        categories: [],
        tags: [],
    });

    const validation = useFormik({
        initialValues: {
            articleTitle: '',
            articleContent: {
                value: '',
            },
            tags: [],
            slug: '',
            categories: [],
            presentedImage: '',
            status: 0,
            metaKeywords: '',
            metaTitle: '',
            metaDescription: '',
            createdDate: moment(),
            newTagName: '',
        },
        validationSchema: blogSchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);

            // API Call Create Blog
            APICallPostBlog(values, (response) => {});
        },
    });

    function APICallPostBlog(newBlog, callback) {
        postBlog(newBlog)
            .then(callback)
            .catch((error) => {});
    }

    function APICallPostNewtag(tagName, callback) {
        postTag(tagName)
            .then((response) => {
                setState((i) => ({ ...i, tags: [...i.tags, response] }));
                callback?.(response);
            })
            .catch((error) => {});
    }

    function APICallPostNewCategory(newCategory, callback) {
        postCategory(newCategory)
            .then(callback)
            .catch((error) => {});
    }

    function APICallGetCategories() {
        getCategoryList({ skip: 0, take: 100 })
            .then((response) => {
                console.log(response);
                setState((i) => ({
                    ...i,
                    categories: response,
                }));
            })
            .catch((error) => {});
    }

    function APICallGetTags() {
        getTags({
            skip: 0,
            take: 100,
        })
            .then((response) => {
                let tags = response?.map?.((tag) => ({
                    tagId: tag?.tagId,
                    tagName: tag?.tagName,
                }));
                setState((s) => ({
                    ...s,
                    tags,
                }));
            })
            .catch((error) => {});
    }

    function APICallGetPreferedTags(tagName) {
        getTags({
            skip: 0,
            take: 100,
            keyword: tagName,
        })
            .then((response) => {
                let tags = response?.map?.((tag) => ({
                    tagId: tag?.tagId,
                    tagName: tag?.tagName,
                }));
                setPreferedTags(tags);
            })
            .catch((error) => {});
    }

    function APICallMediaList(request, callback) {
        setLoading(true);
        getMedias(request)
            .then((response) => {
                setState((i) => ({
                    ...i,
                    uploads: response?.list?.map((i) => ({
                        assetLink: i.assetLink,
                    })),
                }));
                callback?.(response?.list);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    React.useEffect(() => {
        // API Call getting category list
        APICallGetCategories();

        APICallGetTags();
    }, []);

    function onTypingTag(tagName) {
        validation.setFieldValue('newTagName', tagName);
        if (typingTagTimeout.current) {
            clearTimeout(typingTagTimeout.current);
        }
        typingTagTimeout.current = setTimeout(() => {
            APICallGetPreferedTags(tagName);
        }, 300);
    }

    const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue } = validation;

    return (
        <>
            <h3 className="mb-3">Post your new blog</h3>
            <pre>{JSON.stringify(values, 4, 4)}</pre>
            <pre>{JSON.stringify(errors, 4, 4)}</pre>
            <FormikProvider value={validation}>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm="6">
                            <div className="sidebar-children-box mb-2">
                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3 fw-bold">Title</Form.Label>
                                    <Form.Control
                                        name="articleTitle"
                                        placeholder="Title"
                                        value={values.articleTitle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3 fw-bold">Content</Form.Label>
                                    <TextEditor
                                        name="articleContent.value"
                                        value={values?.articleContent?.value}
                                        onBlur={handleBlur}
                                        onChange={(htmlText) => {
                                            setFieldValue('articleContent.value', htmlText);
                                            setDemo(htmlText);
                                        }}
                                        APIPostAsset={({ file, setProgressPercent, setNewUpload }) => {
                                            setLoading(true);
                                            postMedia(
                                                {
                                                    file,
                                                },
                                                {
                                                    onUploadProgress: function (progressEvent) {
                                                        setProgressPercent(
                                                            Math.round(100 * progressEvent.loaded) /
                                                                progressEvent.total,
                                                        );
                                                    },
                                                },
                                            )
                                                .then((response) => {
                                                    setNewUpload({
                                                        assetLink: response.assetLink,
                                                    });
                                                    setState((i) => ({
                                                        ...i,
                                                        uploads: response,
                                                    }));
                                                    setLoading(false);
                                                })
                                                .catch((error) => {
                                                    setLoading(false);
                                                });
                                        }}
                                        APICallAssets={({ page, take, setUploads }) => {
                                            APICallMediaList(
                                                {
                                                    skip: page,
                                                    take,
                                                },
                                                (uploads) => setUploads(uploads),
                                            );
                                        }}
                                    ></TextEditor>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col sm="6" style={{ position: 'sticky', top: 0, maxHeight: '720px', overflowY: 'scroll' }}>
                            <div className="sidebar-children-box mb-2">
                                <Form.Group className="mb-3">
                                    <FieldArray
                                        name="tags"
                                        render={({ push, remove }) => {
                                            return (
                                                <>
                                                    <Form.Label className="mb-3 me-2 fw-bold">Tags</Form.Label>
                                                    <div className="admin-blog-menu d-inline-flex">
                                                        {tags?.map?.(({ tagId, tagName }) => {
                                                            return (
                                                                values.tags.some((val) => val === tagId) && (
                                                                    <Badge>
                                                                        {tagName}
                                                                        <FaTimes
                                                                            className="ps-auto"
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() =>
                                                                                remove(
                                                                                    values.tags.findIndex(
                                                                                        (val) => val === tagId,
                                                                                    ),
                                                                                )
                                                                            }
                                                                        ></FaTimes>
                                                                    </Badge>
                                                                )
                                                            );
                                                        })}
                                                    </div>
                                                    <Form.Control
                                                        name="newTagName"
                                                        value={values.newTagName}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            onTypingTag(e.target.value);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // if you type text with 'enter' key
                                                            if (e.keyCode === 13) {
                                                                APICallPostNewtag(values.newTagName, (response) => {
                                                                    push(response?.tagId);
                                                                });
                                                            }
                                                        }}
                                                    ></Form.Control>
                                                    <ul className="admin-blog-menu my-1">
                                                        {preferedTags.map(({ tagId, tagName }) => {
                                                            return (
                                                                !values.tags.some((val) => val === tagId) && (
                                                                    <li
                                                                        className="admin-blog-menu-item pe-2"
                                                                        onClick={() => push(tagId)}
                                                                    >
                                                                        {tagName}
                                                                    </li>
                                                                )
                                                            );
                                                        })}
                                                    </ul>
                                                </>
                                            );
                                        }}
                                    ></FieldArray>
                                    <Form.Control.Feedback type="invalid">{errors.tags}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3 fw-bold">Slug</Form.Label>
                                    <Form.Control
                                        name="slug"
                                        value={values.slug}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3 fw-bold">Featured Image</Form.Label>

                                    <Button
                                        className="d-block"
                                        variant="success"
                                        onClick={() => setShowUploadModal(true)}
                                    >
                                        Upload your image
                                    </Button>

                                    <UploadModal
                                        show={showUploadModal}
                                        onSelected={(selected) => {}}
                                        selected={''}
                                        onHide={() => {
                                            setShowUploadModal(false);
                                        }}
                                        onCopyLink={(link) => {
                                            setFieldValue('presentedImage', link);
                                            setShowUploadModal(false);
                                        }}
                                        APIPostAsset={({ file, setProgressPercent, setNewUpload }) => {
                                            setLoading(true);
                                            postMedia(
                                                {
                                                    file,
                                                },
                                                {
                                                    onUploadProgress: function (progressEvent) {
                                                        setProgressPercent(
                                                            Math.round(100 * progressEvent.loaded) /
                                                                progressEvent.total,
                                                        );
                                                    },
                                                },
                                            )
                                                .then((response) => {
                                                    setNewUpload({
                                                        assetLink: response.assetLink,
                                                    });
                                                    setState((i) => ({
                                                        ...i,
                                                        uploads: response,
                                                    }));
                                                    setLoading(false);
                                                })
                                                .catch((error) => {
                                                    setLoading(false);
                                                });
                                        }}
                                        APICallAssets={({ page, take, setUploads }) => {
                                            APICallMediaList(
                                                {
                                                    skip: page,
                                                    take,
                                                },
                                                (uploads) => setUploads(uploads),
                                            );
                                        }}
                                    ></UploadModal>
                                    {values.presentedImage && (
                                        <div className="admin-images-form">
                                            <div style={{ textAlign: 'right' }}>
                                                <FaTimes
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue('presentedImage', '');
                                                    }}
                                                ></FaTimes>
                                                <img src={values.presentedImage} width={'100%'} />;
                                            </div>
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Category</Form.Label>
                                    <BiEdit
                                        className="mx-2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setModal(true)}
                                    ></BiEdit>
                                    <CategoryModal show={modal} hide={() => setModal(false)}></CategoryModal>

                                    <FieldArray
                                        name="categories"
                                        value={values.categories}
                                        render={({ push, remove }) => {
                                            return (
                                                <Row>
                                                    {categories?.map?.(({ categoryId, categoryName }) => {
                                                        return (
                                                            values.categories.some((val) => categoryId === val) && (
                                                                <Col xs="auto">
                                                                    <Badge>
                                                                        {categoryName}
                                                                        <FaTimes
                                                                            className="ms-auto"
                                                                            onClick={() =>
                                                                                remove(
                                                                                    values.categories.findIndex(
                                                                                        (val) => val === categoryId,
                                                                                    ),
                                                                                )
                                                                            }
                                                                        ></FaTimes>
                                                                    </Badge>
                                                                </Col>
                                                            )
                                                        );
                                                    })}
                                                    <Col xs="auto">
                                                        <Form.Select
                                                            onChange={(e) => push(parseInt(e.target.value))}
                                                            className="d-inline-block"
                                                            placeholder="Enter service title"
                                                            ref={categoryIdsOptionRef}
                                                        >
                                                            <option>Null</option>
                                                            {categories?.map((item, index) => {
                                                                return (
                                                                    !values.categories?.some(
                                                                        (val) => val === item.categoryId,
                                                                    ) && (
                                                                        <option key={index} value={item?.categoryId}>
                                                                            {item?.categoryName}
                                                                        </option>
                                                                    )
                                                                );
                                                            })}
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            );
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Status</Form.Label>
                                    <Form.Select>
                                        {blogStatus.map((status) => {
                                            return <option value={status}>{status}</option>;
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="sidebar-children-box mb-2">
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Meta title</Form.Label>
                                    <Form.Control
                                        name="metaTitle"
                                        value={values?.metaTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter meta title"
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Meta Keywords</Form.Label>
                                    <Form.Control
                                        name="metaKeywords"
                                        value={values?.metaKeywords}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter meta keywords"
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Meta Description</Form.Label>
                                    <Form.Control
                                        name="metaDescription"
                                        value={values.metaDescription}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter meta Description"
                                    ></Form.Control>
                                </Form.Group>
                            </div>

                            <Stack direction="horizontal" className="gap-1">
                                <Button variant="primary" type="submit" className="my-4">
                                    Publish Post
                                </Button>
                                <Button variant="secondary"> Save to draft</Button>
                            </Stack>
                        </Col>
                    </Row>
                </Form>
            </FormikProvider>
        </>
    );
};

export default CreateBlog;
