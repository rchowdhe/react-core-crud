import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, Paper, TextField, Typography, Container } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import React, { useEffect } from 'react';
import styles from "./style";
import { login } from '../../redux/actions/login';
import { connect } from 'react-redux';
import { validateForm } from '../../utils/utility';
import Loader from "react-loader-spinner";
import inMemoryJWT from '../../utils/inMemoryJwt';
import { useHistory } from 'react-router-dom';

function LoginForm({ token, isLoggedIn, isLoading, error, login, onLoginSuccess }) {
    const classes = styles();
    const history = useHistory();

    /*
    * Here using dummy login email, Not validating with database username password.
    */
    const [email, setEmail] = React.useState('admin@admin.com');
    const [emailValid, setEmailValid] = React.useState(true);

    /*
    * On login click, Call api method to retrive JWT token.
    */
    const onHandleLogin = () => {
        login(email);
    };

    /*
    * Check if token value is changed, Need to store token for future (here we are using CLosure to keep token reference).
    */
    useEffect(() => {
        if (token) {
            inMemoryJWT.setToken(token);
            onLoginSuccess(true);
        }
    }, [token, history]);

    const onEmailChange = (event) => {
        let returnObj = validateForm(event.target.value);
        setEmail(event.target.value);
        setEmailValid(returnObj.isValid)
    };

    return (
        <Container className={classes.container}>
            {!isLoading ?
                <Paper className={classes.innerPadding} >
                    <Typography variant="h6" className="mt-16 mb-32" spacing={3}>
                        LOGIN TO YOUR ACCOUNT
                </Typography>
                    <div className={classes.innerMargin}>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField
                                    className="mt-8 mb-16"
                                    error={!emailValid}
                                    required
                                    label="Email/Username"
                                    autoFocus
                                    id="emailOrUsername"
                                    name="emailOrUsername"
                                    value={email}
                                    onChange={onEmailChange}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <EmailIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    disableFocusRipple
                                    disableRipple
                                    style={{ textTransform: 'none' }}
                                    variant="text"
                                    color="primary">
                                    Forgot password ?
                        </Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button
                                onClick={onHandleLogin}
                                variant="outlined"
                                className="btn btn-primary btn-block mt-3"
                                style={{ textTransform: 'none' }}>
                                Login
                    </Button>
                        </Grid>
                    </div>
                </Paper> :
                <Loader className={classes.loader}
                    type="Oval"
                    color="#2D4275"
                    height={80}
                    width={80}
                />}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login.data,
        token: state.login.data || '',
        isLoading: state.login.isLoading,
        error: state.login.error,
    }
}
const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);