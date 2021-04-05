import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DropzoneDialogBase } from 'material-ui-dropzone';

function FileUploader(props) {
    const { isOpen, onAddClick, onCloseClick, onDeleteClick, onSaveClick, allFiles } = props;

    const dialogTitle = () => (
        <>
            <span>Upload file</span>
            <IconButton
                style={{ right: '12px', top: '8px', position: 'absolute' }}
                onClick={() => onCloseClick()}>
                <CloseIcon />
            </IconButton>
        </>
    )
    return (<div>
        <DropzoneDialogBase
            dialogTitle={dialogTitle()}
            fileObjects={allFiles}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={5000000}
            open={isOpen}
            onAdd={newFileObj => {
                onAddClick(newFileObj);
            }}
            onDelete={deleteFileObj => {
                onDeleteClick(deleteFileObj);
            }}
            onClose={() => onCloseClick()}
            onSave={() => {
                onSaveClick();
            }}
            showPreviews={true}
            showFileNamesInPreview={true}
        />
    </div >);
};

export default FileUploader;