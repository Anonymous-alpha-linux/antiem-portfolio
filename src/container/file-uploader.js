import React, { useState } from 'react';

import { UploadModal } from '../component';
import { getMedias, postMedia } from '../api';

export function FileUploader({ show, onHide, onCopyLink, onSelected, afterGetMediaList, afterPostNewMedia }) {
    const [loading, setLoading] = useState(false);

    function APICallPostNewMedia({ file, setProgressPercent, setNewUpload }) {
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
                setNewUpload(response);
                afterPostNewMedia(response);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    function APICallMediaList(request, callback) {
        setLoading(true);
        getMedias(request)
            .then((response) => {
                console.log(response);
                afterGetMediaList?.(response?.list);
                callback?.(response?.list, response?.total);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    return (
        <UploadModal
            show={show}
            onHide={onHide}
            loading={loading}
            onCopyLink={onCopyLink}
            onSelected={onSelected}
            APIPostAsset={(params) => {
                APICallPostNewMedia(params);
            }}
            APICallAssets={({ page, take, setUploads }) => {
                APICallMediaList(
                    {
                        skip: page,
                        take,
                    },
                    (uploads, total) => setUploads(uploads, total),
                );
            }}
        ></UploadModal>
    );
}
