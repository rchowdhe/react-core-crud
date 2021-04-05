import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    button: {
        margin: theme.spacing(1),
    },
    bottomButton: {
        margin: theme.spacing(1),
        marginTop: '20px',
        float: 'right'
    },
    loader: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}));