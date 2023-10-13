import React, { useEffect, useRef, useState } from 'react';
// Components
import { Button, Col, Form, Modal, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
// Components - Icon
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import './upload-modal.css';
// Components - Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// App Configurations
import config from '../../config';

function UploadModal({ onCopyLink, show, onHide, onSelected, APICallAssets, APIPostAsset }) {
    const [{ uploads, total }, setState] = useState({
        uploads: [],
        total: 0,
    });
    let uploadInputRef = useRef(null);

    function postAssetToServer(file, index) {
        // API call post assets here
        // dispatch(
        //     postAsset(values.file, {
        //         onUploadProgress: (event) => {
        //             console.log('Uploaded ', event);
        //             setProgressPercent(Math.round(100 * event.loaded) / event.total);
        //         },
        //         onDownloadProgress: (event) => {
        //             console.log('Downloaded ', event);
        //         },
        //     }),
        // );
        APIPostAsset({
            setProgressPercent: (percentage) =>
                setRecents((lst) => {
                    return lst?.map?.((i, ps) => {
                        return ps === index
                            ? {
                                  ...i,
                                  percentage,
                              }
                            : i;
                    });
                }),
        });
    }

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            file: null,
            url: '',
        },
        validationSchema: yup.object({
            file: yup
                .mixed()
                .test('FILE SIZE', 'the file is too large', (value) => {
                    if (!value) {
                        return true;
                    }

                    return value.size <= config.rules.PERMIT_SUBMIT_SIZE * 1024 * 1024;
                })
                .test(
                    'FILE FORMAT',
                    `the file format should be ${config.rules.PERMIT_FILE_FORMATS.join()}`,
                    (value) => {
                        if (!value) {
                            return true;
                        }
                        return config.rules.PERMIT_FILE_FORMATS.includes(value.type);
                    },
                ),
            url: yup.string().required(),
        }),
        onSubmit: (values) => {
            // call api post file to server
            postAssetToServer(values.file, recents.length);
        },
    });

    const [recents, setRecents] = useState([]);
    const [take] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // API call get uploads here
        APICallAssets?.({
            take,
            page,
            setUploads: (uploads) =>
                setState((i) => {
                    return { ...i, uploads };
                }),
        });
    }, [take, page]);

    return (
        <Modal
            size="xxl"
            show={show}
            onHide={onHide}
            animation={true}
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Assets Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <Tabs className="mb-3">
                    <Tab eventKey="library" title="Library">
                        <Row id="asset-list">
                            {(uploads || []).map((upload, index) => {
                                console.log(upload);
                                return (
                                    <Col
                                        className="position-relative mb-2"
                                        xs="12"
                                        sm="6"
                                        md="4"
                                        lg="3"
                                        xxl="2"
                                        key={index}
                                        style={{ height: 'fit-content' }}
                                    >
                                        <div className="position-relative">
                                            <img
                                                className="position-relative"
                                                src={upload?.assetLink}
                                                alt={'asset' + index}
                                            ></img>
                                            <div
                                                className="position-absolute top-0 start-0"
                                                style={{
                                                    background: 'linear-gradient(45deg, black, transparent)',
                                                    width: '100%',
                                                    height: '100%',
                                                    zIndex: 2,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <span
                                                    className="position-absolute top-50 start-50"
                                                    style={{ transform: 'translate(-50%, -50%)', color: '#fff' }}
                                                    onClick={() => {
                                                        const link = upload?.assetLink;
                                                        navigator.clipboard.writeText(link);
                                                        onSelected(link);
                                                        onCopyLink(link);
                                                    }}
                                                >
                                                    Copy this link
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                        <ReactPaginate
                            previousLabel={<AiOutlineLeft></AiOutlineLeft>}
                            nextLabel={<AiOutlineRight></AiOutlineRight>}
                            pageCount={Math.ceil(total / take)}
                            onPageChange={({ selected }) => {
                                setPage(selected + 1);
                            }}
                            containerClassName={'pagination my-2'}
                            previousLinkClassName={'pagination-arrow-hover'}
                            nextLinkClassName={'pagination-arrow-hover'}
                            pageClassName="px-3"
                            disabledClassName={'pagination__link--disabled'}
                            activeClassName={'pagination-item-active'}
                        ></ReactPaginate>
                    </Tab>

                    <Tab eventKey="upload" title="Upload new asset">
                        <Form onSubmit={validation.handleSubmit} className="mb-2">
                            <div className="text-center p-2" style={{ border: '2px solid var(--clr-border)' }}>
                                <h3>Drop Files to upload</h3>
                                or
                                <Button
                                    variant="outline"
                                    className="btn btn-primary d-block mx-auto"
                                    onClick={() => {
                                        if (uploadInputRef.current) {
                                            uploadInputRef.current.click();
                                        }
                                    }}
                                >
                                    Select Files
                                </Button>
                            </div>

                            <p className="my-2">Maximum upload file size: 1.8GB</p>

                            <Form.Group id="upload_file_form_control">
                                <Form.Control
                                    type="file"
                                    className="d-none"
                                    ref={uploadInputRef}
                                    onBlur={validation.handleBlur}
                                    onChange={(e) => {
                                        let file = e.currentTarget?.files?.[0];

                                        if (file) {
                                            validation.setFieldTouched('file', true);

                                            const fileReader = new FileReader();

                                            fileReader.onloadend = () => {
                                                const url = fileReader.result;

                                                setRecents((list) => [
                                                    ...(list || []),
                                                    {
                                                        file,
                                                        url,
                                                        percentage: 0,
                                                    },
                                                ]);
                                            };

                                            fileReader.readAsDataURL(file);

                                            postAssetToServer(file, recents.length);
                                        }
                                    }}
                                    isInvalid={validation.touched.file && validation.values.file}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Error: {validation.errors.file}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row className="justify-content-between">
                                {recents?.map?.((o, index) => {
                                    return (
                                        <Col sm="12" className="mb-3" key={index}>
                                            <Row className="align-items-center">
                                                <Col sm="auto">
                                                    <img
                                                        src={o.url}
                                                        className="d-inline"
                                                        alt={`Demo-${index + 1}`}
                                                        width={'80'}
                                                    ></img>
                                                </Col>

                                                <Col className="d-inline-block p-2">
                                                    <h5>Asset {index + 1}</h5>
                                                    <p>{o.file.type || 'image/null'}</p>
                                                </Col>

                                                <Col sm="3" className="d-inline-block p-2">
                                                    <ProgressBar
                                                        now={o?.percentage}
                                                        label={`${o?.percentage}%`}
                                                        animated
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}

export default UploadModal;
