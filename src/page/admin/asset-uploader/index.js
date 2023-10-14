import React, { useEffect, useState } from 'react';

// UI
import { UploadModal } from '../../../component';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

// Icon
import { FaTimes } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// Style
import './style.css';

// API
import { deleteMedia, getMedias, postMedia } from '../../../api';

function AssetUpload() {
    const [showUploadModal, setShowUploadModal] = React.useState(false);

    const [{ uploads, totalAsset }, setState] = useState({
        uploads: [],
        totalAsset: 0,
    });
    const [loading, setLoading] = useState(false);
    const [take] = useState(10);
    const [page, setPage] = useState(1);

    const handleDelete = (id) => {
        // API Call Delete Asset
        setState((i) => ({
            ...i,
            uploads: i.uploads.filter((_, ps) => ps !== id),
        }));
        deleteMedia(id);
    };

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

    useEffect(() => {
        // API Call Get Assets list
        APICallMediaList({
            skip: page,
            take,
        });
    }, [take, page]);

    return (
        <div>
            <article className="my-3 d-flex justify-content-between">
                <h3 className="d-inline">{'Your Assets '}</h3>
                {loading && <Spinner></Spinner>}

                <Button
                    variant="outline-dark"
                    className="btn ms-auto mb-2 btn-primary-outline"
                    onClick={() => setShowUploadModal((i) => !i)}
                >
                    + Upload new assets
                </Button>
            </article>

            {/* Upload Place */}
            <UploadModal
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                onCopyLink={(link) => {}}
                onSelected={(item) => {}}
                APIPostAsset={({ file, setProgressPercent, setNewUpload }) => {
                    setLoading(true);
                    postMedia(
                        {
                            file,
                        },
                        {
                            onUploadProgress: function (progressEvent) {
                                setProgressPercent(Math.round(100 * progressEvent.loaded) / progressEvent.total);
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

            <Row className="m-2" style={{ border: '1px solid #000', minHeight: '500px' }}>
                {uploads?.map?.((upload, id) => {
                    return (
                        <Col xs="12" sm="6" md="4" lg="3" xxl="2" key={id} className="mt-2 mb-1 position-relative">
                            <FaTimes
                                onClick={() => handleDelete(upload?.assetId)}
                                style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    transform: 'translate(-100%)',
                                }}
                            ></FaTimes>
                            <img
                                src={upload?.assetLink}
                                alt={'assets' + id}
                                style={{ cursor: 'pointer' }}
                                width="100%"
                            ></img>
                        </Col>
                    );
                })}

                {loading && (
                    <Col xs="12" sm="6" md="4" lg="3" xxl="2" className="mt-2 mb-1">
                        {/* Coding the lazy loading of image here */}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',

                                backgroundColor: '#cdc9c9',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <Spinner></Spinner>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>

            <ReactPaginate
                previousLabel={<AiOutlineLeft></AiOutlineLeft>}
                nextLabel={<AiOutlineRight></AiOutlineRight>}
                pageCount={Math.ceil(totalAsset / take)}
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
        </div>
    );
}

export default AssetUpload;
