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
        // dispatch(deleteAsset(id));
        setState((i) => ({
            ...i,
            uploads: i.uploads.filter((_, ps) => ps !== id),
        }));
    };

    useEffect(() => {
        // API Call Get Assets list
        // dispatch(getAssetList({ skip: page, take: take }));
        let response = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGbzrhpTi4Q0o5o0JSRVDSZ6zifJth2yxXYg26zgW&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDROGYaiYK8k3pLOWnsrA9jJlRGsKOEAhAxvPWw8Ib&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s',
        ];
        setLoading(true);

        setTimeout(() => {
            setState((i) => ({
                ...i,
                uploads: response.map((i) => ({
                    assetLink: i,
                })),
            }));

            setLoading(false);
        }, 3000);
    }, [take, page]);

    return (
        <div>
            <article className="my-3 d-flex justify-content-between">
                <h3 className="d-inline">Your Assets</h3>
                {loading && <Spinner></Spinner>}
                <Button
                    variant="outline"
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
                APIPostAsset={({ file, setProgressPercent }) => {
                    let percentage = 10;

                    let interval = setInterval(() => {
                        if (percentage >= 100) {
                            clearInterval(interval);
                            return;
                        }
                        percentage += 30;
                        setProgressPercent?.(percentage);
                    }, 1000);
                }}
                APICallAssets={({ page, take, setUploads }) => {
                    let response = [
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGbzrhpTi4Q0o5o0JSRVDSZ6zifJth2yxXYg26zgW&s',
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52qqyY2Mosgxt-Pt00pZy4TqIhCanFTwyLwC-D0z5&s',
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDROGYaiYK8k3pLOWnsrA9jJlRGsKOEAhAxvPWw8Ib&s',
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNofDeymYIece5QEl4VAXCCtruE1skQo3TGRZuRoWJ&s',
                    ];

                    setTimeout(() => {
                        setUploads(
                            response.map((i) => ({
                                assetLink: i,
                            })),
                        );
                    }, 3000);
                }}
            ></UploadModal>

            <Row style={{ border: '1px solid #000', minHeight: '500px' }}>
                {loading && (
                    <Col>
                        {/* Coding the lazy loading of image here */}
                        <div style={{ width: '200px', height: '120px', backgroundColor: 'brown' }}></div>
                    </Col>
                )}

                {(uploads || [])?.map((upload, id) => {
                    return (
                        <Col xs="12" sm="6" md="4" lg="3" xxl="2" key={id} className="mb-2">
                            <FaTimes
                                onClick={() => handleDelete(upload?.assetId)}
                                style={{ cursor: 'pointer' }}
                            ></FaTimes>
                            <img src={upload?.assetLink} alt={'assets' + id} style={{ cursor: 'pointer' }}></img>
                        </Col>
                    );
                })}
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
