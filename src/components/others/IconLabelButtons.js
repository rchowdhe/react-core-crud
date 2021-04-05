import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function IconLabelButtons(props) {
    const classes = useStyles();
    const { newEnabled, editEnabled, deleteEnabled, reloadEnabled } = props.toolBarStatus;
    const handleClickEvent = (event) => {
        switch (event.currentTarget.name) {
            case "new":
                props.onNewClick();
                break;
            case "edit":
                props.onEditClick();
                break;
            case "reload":
                props.onReloadClick();
                break;
            case "delete":
                props.onDelteClick();
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Button disabled={!newEnabled} onClick={handleClickEvent} name="new" variant="contained" color="primary" className={classes.button} startIcon={<AddCircleOutlineIcon />}>
                NEW
            </Button>
            <Button disabled={!editEnabled} onClick={handleClickEvent} name="edit" variant="contained" color="primary" className={classes.button} startIcon={<EditIcon />}>
                EDIT
            </Button>
            <Button disabled={!deleteEnabled} onClick={handleClickEvent} name="delete" variant="contained" color="primary" className={classes.button} startIcon={<DeleteOutlineIcon />}>
                Delete
            </Button>
            <Button disabled={!reloadEnabled} onClick={handleClickEvent} name="reload" variant="contained" color="primary" className={classes.button} startIcon={<RefreshIcon />}>
                RELOAD
            </Button>
        </div>
    );
}
