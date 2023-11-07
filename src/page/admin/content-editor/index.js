import React from 'react';
// List of pages need to edit
import { list_pages } from '../../../router/public';
// Component
import { TextEditor, UploadModal } from '../../../component';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
// Component-Form
import { FieldArray, FormikProvider, useFormik } from 'formik';
// Component-Icons
import { FaTimes } from 'react-icons/fa';
import { BiAddToQueue, BiImage, BiImageAdd } from 'react-icons/bi';
import { Link, useSearchParams, createSearchParams } from 'react-router-dom';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css/navigation';
// Custom style
import './style.css';
import 'react-quill/dist/quill.snow.css';
import { getSetting, postSetting } from '../../../api';
import { FileUploader } from '../../../container/file-uploader';
// Internal Images
import errorImg from '../../../img/img-error.png';
import { toast } from 'react-toastify';

let list_of_websites = list_pages;

function ContentEditor() {
    const [params] = useSearchParams();

    let currentContent = params?.get?.('content');

    React.useEffect(() => {
        // Get setting API
    }, [currentContent]);

    return (
        <section>
            <div id="content-editor-heading">
                <h3>Trang</h3>
                <i>Bạn có tổng cộng {list_of_websites.length} trang để chỉnh sửa</i>

                <ListWebDropdownOptions></ListWebDropdownOptions>
            </div>

            <div id="content-editor-body">
                <PageDemonstration
                    nameOfPage={params.get('content')}
                    getWebContent={({ page, setPageContent }) => {
                        getSetting({
                            page: page,
                        })
                            .then((response) => {
                                if (response?.data?.isSuccess === false) {
                                    setPageContent({});
                                    return;
                                }
                                toast.success('');
                                setPageContent(JSON.parse(response));
                            })
                            .catch((error) => {});
                    }}
                    editWebContent={({ page, newContent, setPageContent }) => {
                        postSetting({
                            page,
                            body: newContent,
                        })
                            .then((response) => {
                                setPageContent(JSON.parse(response));
                            })
                            .catch((error) => {});
                    }}
                ></PageDemonstration>
            </div>
        </section>
    );
}

// Component Helpers
function PageDemonstration({ nameOfPage, getWebContent, editWebContent }) {
    const [_, setSections] = React.useState(null);
    const [editTool, setEditTool] = React.useState({
        sectionName: '',
        page: nameOfPage,
        show: false,
    });
    const [pageContent, setPageContent] = React.useState({
        title: '',
    });

    React.useEffect(() => {
        const elements = document.querySelectorAll('[id*="st-"]');
        setSections(elements);

        document.querySelectorAll('[id*="st-"]').forEach((section) => {
            if (!section.classList.contains('admin-control')) {
            }

            section.classList.add('admin-control');

            section.addEventListener('click', () => {
                let sectionName = section.id.replace('st-', '');
                setEditTool({
                    sectionName,
                    page: nameOfPage,
                    show: true,
                });
            });
        });

        // Get the content resource of page
        getWebContent({
            page: nameOfPage,
            setPageContent,
        });

        return () => {};
    }, [nameOfPage]);

    return (
        <>
            <EditTool
                show={editTool?.show}
                onHide={() => setEditTool((e) => (e.show = false))}
                sectionName={editTool.sectionName}
                page={editTool.page}
                content={pageContent?.[editTool?.sectionName]}
                APICallPostSetting={(sectionName, sectionContentObj) => {
                    editWebContent({
                        page: nameOfPage,
                        newContent: {
                            ...pageContent,
                            [sectionName]: sectionContentObj,
                        },
                        setPageContent,
                    });
                }}
            ></EditTool>

            <div style={{ overflowX: 'scroll' }}>
                {list_of_websites.map((website) => {
                    return nameOfPage === website.name && website.element;
                })}
            </div>
        </>
    );
}

function ListWebDropdownOptions() {
    const linkStyle = {
        color: 'initial',
        textDecoration: 'none',
    };
    return (
        <Dropdown className="my-2">
            <Dropdown.Toggle id="dropdown-basic" variant="outline-dark" className="btn-primary-outline">
                Chọn trang để chỉnh sửa
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {list_of_websites.map((website) => {
                    return (
                        <Dropdown.Item>
                            <Link
                                to={{
                                    search: createSearchParams({
                                        content: website.name,
                                    }).toString(),
                                }}
                                style={linkStyle}
                            >
                                {website.display_name.toUpperCase()}
                            </Link>
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

// Form Editors Component
function EditTool({ sectionName, page, show, onHide, content, APICallPostSetting }) {
    const validation = useFormik({
        initialValues: {
            title: content?.title,
            subtitle: content?.subtitle,
            content: content?.content,
            images: content?.images || [],
            children: content?.children || [],
        },
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);

            // post setting API here
            APICallPostSetting(sectionName, values);

            onHide();
        },
        enableReinitialize: true,
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = validation;

    // Handle Images
    const [uploadModal, setUploadModal] = React.useState(false);
    const [uploadModalChildImage, setUploadModalChildImage] = React.useState(null);

    return (
        <Modal
            size="lg"
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa nội dung trang</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <p>
                    <b>Tên phần nội dung: </b>
                    {sectionName}
                </p>
                <p>
                    <b>Tên trang:</b> {page}
                </p>
                <FormikProvider value={validation}>
                    <Form onSubmit={handleSubmit} className="edit-form-content">
                        <Form.Group className="mb-3" id="title_of_page">
                            <Form.Label className="fw-bold">Tiêu đề</Form.Label>
                            <Form.Control
                                name={`title`}
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched?.title && !!errors?.title}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" id="subtitle_of_page">
                            <Form.Label className="fw-bold">Tiêu đề mô tả</Form.Label>
                            <Form.Control
                                name={`subtitle`}
                                value={values.subtitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched?.subtitle && !!errors?.subtitle}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors?.subtitle}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" id="content_of_page">
                            <Form.Label className="fw-bold">Nội dung</Form.Label>
                            <TextEditor
                                name="content"
                                value={values?.content}
                                onChange={(htmlText) => {
                                    setFieldValue('content', htmlText);
                                }}
                            ></TextEditor>
                        </Form.Group>

                        <Form.Group className="mb-3" id="images_of_page">
                            <div className="py-4">
                                <Form.Label className="fw-bold">Hình ảnh đại diện</Form.Label>

                                <Button variant="success" className="ms-2" onClick={() => setUploadModal(true)}>
                                    <BiImage className="me-2 fs-2"></BiImage>
                                    <span className="align-middle">Đăng ảnh tại đây</span>
                                </Button>

                                <FileUploader
                                    show={uploadModal}
                                    onCopyLink={(link) => {
                                        setFieldValue('images', [...values.images, link]);
                                        setUploadModal(false);
                                    }}
                                    onSelected={() => {}}
                                    onHide={() => setUploadModal(false)}
                                    afterGetMediaList={(uploads) => {}}
                                    afterPostNewMedia={(newMedia) => {}}
                                ></FileUploader>

                                <Row>
                                    {values?.images?.map((image, index) => {
                                        return (
                                            <Col
                                                xs="auto"
                                                sm="6"
                                                md="4"
                                                lg="3"
                                                style={{ textAlign: 'right' }}
                                                key={index}
                                            >
                                                <FaTimes
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue(
                                                            'images',
                                                            values.images.filter((e) => e !== values.images[index]),
                                                        );
                                                    }}
                                                ></FaTimes>
                                                <img src={image} width={'100%'} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                        </Form.Group>

                        <Row>
                            {values?.children?.map((item, index) => {
                                return (
                                    <Col sm="12" lg="4" className="section-3-card my-2 px-0" key={index}>
                                        <div className="section-3-form">
                                            <div className="section-3-card-img">
                                                {(item?.image && (
                                                    <img
                                                        src={item?.image}
                                                        height={'100%'}
                                                        width={'100%'}
                                                        loading="lazy"
                                                    />
                                                )) || (
                                                    <img
                                                        src={errorImg}
                                                        height={'100%'}
                                                        width={'100%'}
                                                        loading="lazy"
                                                    ></img>
                                                )}
                                            </div>
                                            <div className="section-3-card-content">
                                                <h2 className="my-1">{item?.title}</h2>
                                                <h6>{item?.subtitle}</h6>
                                                <p
                                                    style={{ fontSize: '16px' }}
                                                    dangerouslySetInnerHTML={{ __html: item?.content }}
                                                ></p>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>

                        <FieldArray name="children">
                            {(arrayHelpers) => (
                                <Form.Group>
                                    <Form.Label className="fw-bold">Nội dung con</Form.Label>

                                    <BiAddToQueue
                                        style={{ margin: '0 10px', cursor: 'pointer', fontSize: '20px' }}
                                        onClick={() => {
                                            arrayHelpers.push({
                                                title: '',
                                                subtitle: '',
                                                content: '',
                                                image: '',
                                            });
                                        }}
                                        title="Thêm nội dung hiển thị"
                                    ></BiAddToQueue>

                                    <Swiper
                                        pagination={{
                                            type: 'fraction',
                                        }}
                                        cssMode={true}
                                        allowSlideNext={true}
                                        allowSlidePrev={true}
                                        mousewheel={true}
                                        navigation={true}
                                        keyboard={true}
                                        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
                                        className="mySwiper"
                                        name="child"
                                    >
                                        {values?.children?.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index} className="child-content-swiper">
                                                    <div className="px-5">
                                                        <Form.Group id="form-children-title">
                                                            <Form.Label>Title</Form.Label>
                                                            <Form.Control
                                                                name={`children.${index}.title`}
                                                                value={item?.title}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={
                                                                    touched?.children?.[index]?.title &&
                                                                    !!errors?.children?.[index]?.title
                                                                }
                                                            ></Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors?.children?.[index]?.title}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group id="form-children-subtitle">
                                                            <Form.Label>Subtitle</Form.Label>
                                                            <Form.Control
                                                                name={`children.${index}.subtitle`}
                                                                value={item?.subtitle}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={
                                                                    touched?.children?.[index]?.subtitle &&
                                                                    !!errors?.children?.[index]?.subtitle
                                                                }
                                                            ></Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors?.children?.[index]?.subtitle}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group id="form-content-message">
                                                            <Form.Label>Content</Form.Label>

                                                            <TextEditor
                                                                name="content"
                                                                value={item?.content}
                                                                onChange={(htmlText) => {
                                                                    setFieldValue(
                                                                        `children.${index}.content`,
                                                                        htmlText,
                                                                    );
                                                                }}
                                                            ></TextEditor>
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors?.children?.[index]?.content}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>

                                                        <Form.Group className="py-4" id="form-content-image">
                                                            <Form.Label className="fw-bold">Image</Form.Label>

                                                            <Button
                                                                variant="success"
                                                                className="d-block"
                                                                onClick={() => setUploadModalChildImage(index)}
                                                            >
                                                                Upload your image
                                                            </Button>

                                                            <FileUploader
                                                                show={
                                                                    uploadModalChildImage !== null &&
                                                                    uploadModalChildImage === index
                                                                }
                                                                onHide={() => setUploadModalChildImage(null)}
                                                                onCopyLink={(link) => {
                                                                    setFieldValue(`children.${index}.image`, link);
                                                                    setUploadModal(null);
                                                                }}
                                                                onSelected={() => {}}
                                                                afterGetMediaList={(uploads) => {}}
                                                                afterPostNewMedia={(newMedia) => {}}
                                                            ></FileUploader>

                                                            <div className="admin-images-form">
                                                                <div style={{ textAlign: 'right' }}>
                                                                    {item?.image && (
                                                                        <FaTimes
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => {
                                                                                setFieldValue(
                                                                                    `children.${index}.image`,
                                                                                    '',
                                                                                );
                                                                            }}
                                                                        ></FaTimes>
                                                                    )}
                                                                    {values?.children?.[index]?.image && (
                                                                        <img
                                                                            src={values?.children?.[index]?.image}
                                                                            width={'100%'}
                                                                            loading="lazy"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Form.Group>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </Form.Group>
                            )}
                        </FieldArray>

                        <Button type="submit" variant="primary" className="my-4">
                            Published Content
                        </Button>
                    </Form>
                </FormikProvider>
            </Modal.Body>
        </Modal>
    );
}

export default ContentEditor;
