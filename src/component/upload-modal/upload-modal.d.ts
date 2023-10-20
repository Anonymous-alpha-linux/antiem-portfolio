type UploadModalProps = {
    onCopyLink: (link: string) => void;
    show: boolean;
    onHide: (hasShown: boolean) => void;
    onSelected: (selected: string) => void;
    loading?: boolean;
    APICallAssets: (args: {
        take: number;
        page: number;
        setUploads: (uploads: { assetLink: string }[], total: number) => void;
    }) => void;
    APIPostAsset: (args: { file: File; setProgressPercent: (percentage: number) => void }) => void;
};

declare const UploadModal: React.FunctionComponent<UploadModalProps>;

export default UploadModal;
