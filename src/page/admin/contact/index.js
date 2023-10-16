import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { getSetting, postSetting } from '../../../api';
import { useEffect } from 'react';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlinePhone } from 'react-icons/ai';
import { FaTelegramPlane, FaTiktok } from 'react-icons/fa';
import { useState } from 'react';

function ContactInformationEditor() {
    // API Layer
    function APICallPostContact(values) {
        postSetting({
            page: 'contact',
            body: values,
        });
    }

    function APICallGetContact() {
        getSetting({
            page: 'contact',
        })
            .then((response) => {
                setInitialValues(JSON.parse(response));
            })
            .catch((error) => {});
    }

    // Component Solving Layer
    const [initialValues, setInitialValues] = useState({
        phone: '',
        facebook: '',
        instagram: '',
        zalo: '',
        telegram: '',
        tiktok: '',
    });
    const validation = useFormik({
        initialValues: {
            phone: initialValues?.phone,
            facebook: initialValues?.facebook,
            instagram: initialValues?.instagram,
            zalo: initialValues?.zalo,
            telegram: initialValues?.telegram,
            tiktok: initialValues?.tiktok,
        },
        enableReinitialize: true,
        onSubmit: (values, formikHelpers) => {
            formikHelpers.setSubmitting(false);

            APICallPostContact(values);
        },
    });

    useEffect(() => {
        APICallGetContact();
    }, []);

    const { values, errors, handleChange, handleSubmit, handleBlur } = validation;

    // Component Layer
    return (
        <section>
            <h3>Contact Information</h3>
            <div className="sidebar-children-box">
                <FormikProvider value={validation}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup id="form-control-phone">
                            <Form.Label className="fw-bold">
                                <AiOutlinePhone className="me-2"></AiOutlinePhone>
                                <span className="align-middle">Phone</span>
                            </Form.Label>
                            <Form.Control
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
                        </FormGroup>

                        <FormGroup id="form-control-fb">
                            <Form.Label className="fw-bold">
                                <AiOutlineFacebook className="me-2"></AiOutlineFacebook>
                                <span className="align-middle">Facebook</span>
                            </Form.Label>
                            <Form.Control
                                name="facebook"
                                value={values.facebook}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                        </FormGroup>

                        <FormGroup id="form-control-ins">
                            <Form.Label className="fw-bold">
                                <AiOutlineInstagram className="me-2"></AiOutlineInstagram>
                                <span className="align-middle">Instagram</span>
                            </Form.Label>
                            <Form.Control
                                name="instagram"
                                value={values.instagram}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                        </FormGroup>

                        <FormGroup id="form-control-zalo">
                            <Form.Label className="fw-bold">Zalo</Form.Label>
                            <Form.Control
                                name="zalo"
                                value={values.zalo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                        </FormGroup>

                        <FormGroup id="form-control-telegram">
                            <Form.Label className="fw-bold">
                                <FaTelegramPlane className="me-2"></FaTelegramPlane>
                                <span className="align-middle">Telegram</span>
                            </Form.Label>
                            <Form.Control
                                name="telegram"
                                value={values.telegram}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                        </FormGroup>

                        <FormGroup id="form-control-tiktok">
                            <Form.Label className="fw-bold">
                                <FaTiktok className="me-2"></FaTiktok>
                                <span className="align-middle">Tiktok</span>
                            </Form.Label>
                            <Form.Control
                                name="tiktok"
                                value={values.tiktok}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></Form.Control>
                        </FormGroup>

                        <div className="my-2">
                            <Button type="submit" className="me-2" variant="outline-success">
                                Published Contact
                            </Button>
                            <Button type="submit" className="me-2" variant="outline-primary">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </section>
    );
}

export default ContactInformationEditor;
