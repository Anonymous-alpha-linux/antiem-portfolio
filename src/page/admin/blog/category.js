// Component
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

let categorySchema = yup.object().shape({
    categoryName: yup.string().required('This field is require field'),
});

const CategoryModal = ({ show, hide }) => {
    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);

            // Post new category
            // dispatch(
            //     postCategory({
            //         categoryName: values.categoryName,
            //     }),
            // );
        },
    });

    return (
        <Modal
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
            show={show}
            onHide={hide}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header style={{ margin: '0 auto', width: '80%', background: 'white' }} closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    margin: '0 auto',
                    maxWidth: 'unset',
                    background: 'white',
                    width: '80%',
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            name="categoryName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.categoryName && !!errors?.categoryName}
                            placeholder="Enter Category Name"
                        ></Form.Control>
                    </Form.Group>
                    <Button variant="success">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CategoryModal;
