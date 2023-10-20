import React from 'react';

import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { TextEditor, UploadModal } from '../../../component';
import CategoryModal from './category';

import * as yup from 'yup';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

let blogSchema = yup.object().shape({
    articleTitle: yup.string().required('This field is require field'),
    articleContent: yup.object().shape({
        value: yup.string().required('This field is require field'),
    }),
    categories: yup.array().required(),
    presentedImageId: yup.number().typeError('This field must be number').required('This field is require field'),
    status: yup.number().typeError('This field must be number').required('This field is require field'),
    metaKeywords: yup.string().required('This field is require field'),
    metaTitle: yup.string().required('This field is require field'),
    metaDescription: yup.string().required('This field is require field'),
    createdDate: yup.date().required(),
});

const UpdateBlog = ({ updateBlog }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [demo, setDemo] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const [showUploadModal, setShowUploadModal] = React.useState(false);
    const categoryIdsOptionRef = React.useRef();
    const [{ categories }, setState] = React.useState({
        categories: [],
    });

    const validation = useFormik({
        initialValues: {
            articleTitle: updateBlog?.articleTitle,
            articleContent: {
                value: updateBlog?.articleContent,
            },
            categories: updateBlog?.categories?.map((e) => e.categoryId),
            presentedImage: updateBlog?.presentedImage,
            status: updateBlog?.status,
            metaKeywords: updateBlog?.metaKeywords,
            metaTitle: updateBlog?.metaTitle,
            metaDescription: updateBlog?.metaDescription,
            createdDate: moment(),
        },
        validationSchema: blogSchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);

            // API Call Update Blog
            // dispatch(putBlog(itemId, values));
        },
    });

    React.useEffect(() => {
        // API Call getting category list
        // dispatch(getCategoryList());
    }, []);

    const { values, handleSubmit, handleChange, handleBlur, setFieldValue } = validation;

    return (
        <section>
            <Row>
                <Col sm="6">
                    <h3>
                        <BiArrowBack
                            onClick={() =>
                                setSearchParams({
                                    show: false,
                                    modal: 'update_blog',
                                })
                            }
                        ></BiArrowBack>{' '}
                        Edit the content
                    </h3>
                    <FormikProvider value={validation}>
                        <Form onSubmit={handleSubmit}>
                            <div className="sidebar-children-box mb-2">
                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3">Title</Form.Label>
                                    <Form.Control
                                        name="articleTitle"
                                        value={values.articleTitle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3">Content</Form.Label>
                                    <TextEditor
                                        name="articleContent.value"
                                        value={values?.articleContent?.value}
                                        onBlur={handleBlur}
                                        onChange={(htmlText) => {
                                            setFieldValue('articleContent.value', htmlText);
                                            setDemo(htmlText);
                                        }}
                                    ></TextEditor>
                                </Form.Group>
                            </div>

                            <div className="sidebar-children-box mb-2">
                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3">Tags</Form.Label>
                                    <Form.Control
                                        name="tags"
                                        value={values.articleTitle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3">Slug</Form.Label>
                                    <TextEditor
                                        name="articleContent.value"
                                        value={values?.articleContent?.value}
                                        onBlur={handleBlur}
                                        onChange={(htmlText) => {
                                            setFieldValue('articleContent.value', htmlText);
                                            setDemo(htmlText);
                                        }}
                                    ></TextEditor>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-3">Featured Image</Form.Label>

                                    <Button
                                        className="d-block"
                                        variant="success"
                                        onClick={() => setShowUploadModal(true)}
                                    >
                                        Upload your image
                                    </Button>

                                    <UploadModal
                                        show={showUploadModal}
                                        onSave={(hasShown) => {}}
                                        onSelected={(selected) => {}}
                                        selected={''}
                                        onHide={() => {
                                            setShowUploadModal(false);
                                        }}
                                        onCopyLink={(link) => {
                                            setFieldValue('presentedImage', link);
                                            setShowUploadModal(false);
                                        }}
                                    ></UploadModal>
                                    {values.presentedImage ? (
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
                                    ) : (
                                        <></>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <CategoryModal show={modal} hide={() => setModal(false)}></CategoryModal>
                                    <Form.Label>Category</Form.Label>
                                    <BiEdit
                                        className="mx-2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setModal(true)}
                                    ></BiEdit>
                                    <Form.Select
                                        // onChange={handleChange}
                                        placeholder="Enter service title"
                                        ref={categoryIdsOptionRef}
                                    >
                                        {categories?.map((item, index) => (
                                            <option key={index} value={item?.categoryId}>
                                                {item?.categoryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <FieldArray
                                        name="categories"
                                        value={values.categories}
                                        render={(array) => {
                                            return (
                                                <Button
                                                    onClick={() => {
                                                        const currentCategoryId = parseInt(
                                                            categoryIdsOptionRef.current.value,
                                                        );
                                                        if (!values.categories.includes(currentCategoryId)) {
                                                            array.push(currentCategoryId);
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            );
                                        }}
                                    />
                                    {values?.categories?.map((item, index) => {
                                        return (
                                            <Button variant="success" style={{ marginRight: '15px' }}>
                                                {categories.find((g) => item === g.categoryId)?.categoryName}
                                                &nbsp;
                                                <FaTimes
                                                    style={{ marginBottom: '1px', cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue(
                                                            'categories',
                                                            values.categories.filter((e) => e !== item),
                                                        );
                                                    }}
                                                ></FaTimes>
                                            </Button>
                                        );
                                    })}
                                </Form.Group>
                            </div>

                            <div className="sidebar-children-box mb-2">
                                <h3>SEO detail</h3>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta title</Form.Label>
                                    <Form.Control
                                        name="metaTitle"
                                        value={values?.metaTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter meta title"
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Keywords</Form.Label>
                                    <Form.Control
                                        name="metaKeywords"
                                        value={values?.metaKeywords}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter meta keywords"
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Description</Form.Label>
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
                        </Form>
                    </FormikProvider>
                </Col>
                <Col sm="6" style={{ position: 'sticky', top: 0, maxHeight: '720px', overflowY: 'scroll' }}>
                    <div>
                        <h4 className="mb-5">Demo</h4>
                        <article
                            className="w-100 demo p-2"
                            style={{ border: '1px solid var(--clr-border)', minHeight: '600px' }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: demo }}></div>
                        </article>
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default UpdateBlog;
