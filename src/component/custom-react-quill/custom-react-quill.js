import React from 'react';

// Text Editor
import ReactQuill from 'react-quill';

// Upload Modal
import UploadModal from '../upload-modal/upload-modal';

class CustomReactQuill extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isImageModalShow: false };
        this.imageInputRef = React.createRef(null);
        this.quillRef = React.createRef(null);
    }

    imageHandler = async () => {
        this.setState({
            isImageModalShow: true,
        });
    };

    render() {
        return (
            <>
                <ReactQuill
                    value={this.props?.value}
                    onChange={(content, delta, source, editor) => {
                        this.props?.onChange?.(content);
                    }}
                    modules={{
                        toolbar: {
                            container: [
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                                [{ align: [] }],
                                ['link', 'image'],
                                ['clean'],
                            ],
                            handlers: {
                                image: this.imageHandler,
                            },
                        },
                    }}
                    formats={[
                        'header',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'bullet',
                        'indent',
                        'link',
                        'image',
                    ]}
                    ref={this.quillRef}
                ></ReactQuill>

                <UploadModal
                    show={this.state.isImageModalShow}
                    onCopyLink={(link) => {}}
                    onHide={() => {
                        this.setState({ isImageModalShow: false });
                    }}
                    onSelected={(image) => {
                        if (this.quillRef.current) {
                            const range = this.quillRef.current.getEditorSelection();

                            this.quillRef.current.getEditor().insertEmbed(range?.index, 'image', image);
                        }
                    }}
                ></UploadModal>
            </>
        );
    }
}

export default CustomReactQuill;
