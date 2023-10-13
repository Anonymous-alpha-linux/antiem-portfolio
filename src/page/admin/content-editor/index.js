import React from 'react';

// List of pages need to edit
import {} from '../../../page';

// Component
import { TextEditor, UploadModal } from '../../../component';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';

// Component-Form
import { FieldArray, FormikProvider, useFormik } from 'formik';

// Component-Icons
import { FaTimes } from 'react-icons/fa';
import { BiAddToQueue } from 'react-icons/bi';
import { Link, useSearchParams, createSearchParams } from 'react-router-dom';
//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css/navigation';

// Custom style
import './style.css';
import 'react-quill/dist/quill.snow.css';

let list_of_websites = [
    {
        name: 'landing page',
        display_name: 'Landing Page',
        component: (
            <section id="st-section-1">
                <h2>Sample title</h2>
                <p>Sample Subtitle</p>
            </section>
        ),
    },
    {
        name: 'menu_1',
        display_name: 'Danh mục 1',
        component: <></>,
    },
    {
        name: 'menu_2',
        display_name: 'Danh mục 2',
        component: <></>,
    },
    {
        name: 'menu_3',
        display_name: 'Danh mục 3',
        component: <></>,
    },
];

function ContentEditor() {
    const [params] = useSearchParams();

    let currentContent = params?.get?.('content');

    React.useEffect(() => {
        // Get setting API
    }, [currentContent]);

    return (
        <section>
            <div id="content-editor-heading">
                <h3>WEB CONTENT EDITOR</h3>
                <i>Edit the title, subtitle and message in each section of page</i>
                <div className="mb-3 border border-1">
                    <ListWebDropdownOptions></ListWebDropdownOptions>
                </div>
            </div>

            <div id="content-editor-body">
                {!params.get('content') || params.get('content') === 'contact' ? (
                    <ContactInformation></ContactInformation>
                ) : (
                    <PageDemonstration nameOfPage={params.get('content')}></PageDemonstration>
                )}
            </div>
        </section>
    );
}

// Component Helpers
function PageDemonstration({ nameOfPage }) {
    const [_, setSections] = React.useState(null);
    const [editTool, setEditTool] = React.useState({
        sectionName: '',
        page: nameOfPage,
        show: false,
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

        return () => {};
    }, [nameOfPage]);

    return (
        <>
            <EditTool
                show={editTool?.show}
                onHide={() => setEditTool((e) => (e.show = false))}
                sectionName={editTool.sectionName}
                page={editTool.page}
            ></EditTool>

            <div style={{ overflowX: 'scroll' }}>
                {list_of_websites.map((website) => {
                    return nameOfPage === website.name && website.component;
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
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant="outline" className="btn-primary-outline">
                Select page to edit
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

                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'contact',
                            }).toString(),
                        }}
                        style={linkStyle}
                    >
                        CONTACT
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

// Form Editors Component
function ContactInformation() {
    return (
        <section>
            <h2>Edit Contact Information</h2>
        </section>
    );
}

function EditTool({ sectionName, page, show, onHide, content }) {
    const validation = useFormik({
        initialValues: {
            title: content?.[sectionName]?.title,
            subtitle: content?.[sectionName]?.subtitle,
            content: content?.[sectionName]?.content,
            images: content?.[sectionName]?.images || [],
            childImage: content?.[sectionName]?.childImage || [],
            child: content?.[sectionName]?.child || [],
        },
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);

            // post setting API here

            // dispatch(
            //     postSetting(
            //         {
            //             ...content,
            //             [sectionName]: { ...content?.[sectionName], ...values },
            //         },
            //         page,
            //     ),
            // );

            onHide();
        },
        enableReinitialize: true,
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = validation;

    // Handle Images
    const [uploadModal, setUploadModal] = React.useState(false);
    const [uploadModalChild, setUploadModalChild] = React.useState(false);
    const [uploadModalChildImage, setUploadModalChildImage] = React.useState(false);

    return (
        <Modal
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <p>
                    <h4>Section name: </h4>
                    {sectionName}
                </p>
                <p>
                    <h4>Page:</h4> {page}
                </p>
                <FormikProvider value={validation}>
                    <Form onSubmit={handleSubmit} className="edit-form-content">
                        <Form.Group className="mb-3" id="title_of_page">
                            <Form.Label>Title</Form.Label>
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
                            <Form.Label>Subtitle</Form.Label>
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
                            <Form.Label>Content</Form.Label>
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
                                <div className="admin-image-form-title">Image</div>
                                <Button variant="success" onClick={() => setUploadModal(true)}>
                                    Upload your image
                                </Button>
                                <UploadModal
                                    show={uploadModal}
                                    onSave={(hasShown) => {}}
                                    onSelected={(selected) => {}}
                                    selected={''}
                                    onHide={() => {
                                        setUploadModal(false);
                                    }}
                                    onCopyLink={(link) => {
                                        setFieldValue('images', [...values.images, link]);
                                        setUploadModal(false);
                                    }}
                                ></UploadModal>
                                <div className="admin-images-form">
                                    {values?.images?.map((item, index) => {
                                        return (
                                            <div style={{ textAlign: 'right' }} key={index}>
                                                <FaTimes
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue(
                                                            'images',
                                                            values.images.filter((e) => e !== values.images[index]),
                                                        );
                                                    }}
                                                ></FaTimes>
                                                <img src={item} width={'100%'} />;
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="admin-image-form-title">Child Image</div>
                                <Button variant="success" onClick={() => setUploadModalChild(true)}>
                                    Upload your child images
                                </Button>
                                <UploadModal
                                    show={uploadModalChild}
                                    onSave={(hasShown) => {}}
                                    onSelected={(selected) => {}}
                                    selected={''}
                                    onHide={() => {
                                        setUploadModalChild(false);
                                    }}
                                    onCopyLink={(link) => {
                                        setFieldValue('childImage', [...values.childImage, link]);
                                        setUploadModalChild(false);
                                    }}
                                ></UploadModal>
                                <div className="admin-images-form">
                                    {values?.childImage?.map((item, index) => {
                                        return (
                                            <div style={{ textAlign: 'right' }} key={index}>
                                                <FaTimes
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue(
                                                            'childImage',
                                                            values.childImage.filter(
                                                                (e) => e !== values.childImage[index],
                                                            ),
                                                        );
                                                    }}
                                                ></FaTimes>
                                                <img src={item} width={'100%'} />;
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Form.Group>
                        <FieldArray name="child">
                            {(arrayHelpers) => (
                                <Form.Group>
                                    <Form.Label className="admin-image-form-title">Child Content</Form.Label>

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
                                        {values?.child?.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index} className="child-content-swiper">
                                                    <Form.Group>
                                                        <Form.Label>Title</Form.Label>
                                                        <Form.Control
                                                            name={`child.${index}.title`}
                                                            value={item?.title}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={
                                                                touched?.child?.[index]?.title &&
                                                                !!errors?.child?.[index]?.title
                                                            }
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors?.child?.[index]?.title}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Subtitle</Form.Label>
                                                        <Form.Control
                                                            name={`child.${index}.subtitle`}
                                                            value={item?.subtitle}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={
                                                                touched?.child?.[index]?.subtitle &&
                                                                !!errors?.child?.[index]?.subtitle
                                                            }
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors?.child?.[index]?.subtitle}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Content</Form.Label>

                                                        <TextEditor
                                                            name="content"
                                                            value={values?.content}
                                                            onChange={(htmlText) => {
                                                                setFieldValue(`child.${index}.content`, htmlText);
                                                            }}
                                                        ></TextEditor>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors?.child?.[index]?.content}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <div className="py-4">
                                                        <div className="">Image</div>
                                                        <Button
                                                            variant="success"
                                                            onClick={() => setUploadModalChildImage(true)}
                                                        >
                                                            Upload your image
                                                        </Button>
                                                        <UploadModal
                                                            show={uploadModalChildImage}
                                                            onSave={(hasShown) => {}}
                                                            onSelected={(selected) => {}}
                                                            selected={''}
                                                            onHide={() => {
                                                                setUploadModalChildImage(false);
                                                            }}
                                                            onCopyLink={(link) => {
                                                                setFieldValue(`child[${index}].image`, link);
                                                                setUploadModalChildImage(false);
                                                            }}
                                                        ></UploadModal>
                                                        <div className="admin-images-form">
                                                            <div style={{ textAlign: 'right' }}>
                                                                {item.image ? (
                                                                    <FaTimes
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => {
                                                                            setFieldValue(`child[${index}].image`, '');
                                                                        }}
                                                                    ></FaTimes>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {values?.child?.[index]?.image ? (
                                                                    <img
                                                                        src={values?.child?.[index]?.image}
                                                                        width={'100%'}
                                                                        loading="lazy"
                                                                    />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </Form.Group>
                            )}
                        </FieldArray>
                        <Button type="submit" variant="primary" className="my-4">
                            Submit
                        </Button>
                    </Form>
                </FormikProvider>
            </Modal.Body>
        </Modal>
    );
}

export default ContentEditor;
