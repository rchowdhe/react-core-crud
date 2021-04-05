import { Button, Grid, InputLabel, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import MSelect from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { findById, save } from '../../redux/actions/userdetails';
import { EmployeeTypeStore, LocationStore, sanitizeFormData, validateUserDetails } from '../../utils/utility';
import FileUploader from './../../components/fileupload/FileUploader';
import DateInput from './../../components/inputs/DateInput';
import TextInput from './../../components/inputs/TextInput';
import TabPanel from './../../components/tabpanel/TabPanel';
import styles from "./style";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${ index }`,
        'aria-controls': `scrollable-auto-tabpanel-${ index }`
    };
};

function CreateEditUser({ isLoading, user, savedUser, findById, save }) {
    /*
    *   Common data manuplation related to component
    */
    const { id } = useParams();
    const classes = styles();
    const [userInformation, setUserInformation] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const [value, setValue] = useState(0);
    const [errorMessage, setError] = useState('');
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    /*
    *   If id is provided in parameter then call server method to pull record against that id.
    */
    useEffect(() => {
        if (id) {
            findById(parseInt(id));
        }
    }, [id, findById]);

    /*
    * Set retrived data from server to UI controls (form).
    */
    useEffect(() => {
        if (id && user) {
            setUserInformation(sanitizeFormData(user));
        }
    }, [id, user])

    /*
    * After save redirect to home.
    */
    useEffect(() => {
        if (savedUser) {
            history.push('/');
        }

    }, [savedUser, history])

    /*
    *   Prepare form data to submit
    */
    const onSaveNewUser = () => {
        console.log('value', userInformation);
        let errorMessage = validateUserDetails(userInformation);
        if (errorMessage.length === 0) {
            console.log('value', userInformation);
            save(userInformation);
        } else {
            setOpenAlert(true);
            setError(errorMessage);
        }
    };
    const onCancelClick = () => {
        history.push('/');
    }
    /*
    *   Input Fields handler to process/sanitize values
    */
    const handleInputChange = (field, value) => {
        console.log('event and value', field, value);
        setUserInformation((prev) => {
            return { ...prev, [field]: value };
        });
    };

    /*
    *   File Upload changes related methods
    */
    const [fileUploaderOpen, setFileUploaderOpen] = useState(false);
    const [fileObjects, setFileObjects] = useState([]);
    const [activeFileField, setActiveFileField] = useState('');

    const openFileUploader = (fieldName) => {
        setActiveFileField(fieldName);
        setFileUploaderOpen(true);
    };
    const onAddClick = (newFileObj) => {
        setUserInformation((prev) => {
            return { ...prev, [activeFileField]: newFileObj[0]["file"] };
        });
        setFileObjects([].concat(fileObjects, newFileObj));
    };
    const onCloseClick = () => {
        setFileUploaderOpen(false);
    };
    const onDeleteClick = () => {
    };
    const onSaveClick = () => {
        setFileUploaderOpen(false);
    };


    return (
        <div className={classes.root}>
            {!isLoading ?
                <div>
                    <AppBar
                        position="static"
                        color="default"
                        className="mb-3"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tabs
                            value={value} onChange={handleChange} indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto">
                            <Tab label="General Information" {...a11yProps(0)} />
                            <Tab label="Detail Information" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    <FileUploader
                        allFiles={fileObjects}
                        isOpen={fileUploaderOpen}
                        onAddClick={onAddClick}
                        onCloseClick={onCloseClick}
                        onSaveClick={onSaveClick}
                        onDeleteClick={onDeleteClick}
                    />
                    <TabPanel value={value} index={0}>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextInput value={userInformation.Name} handleChange={handleInputChange} property='Name' label="Employee Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel htmlFor="employeeType">Employee Type</InputLabel>
                                <MSelect style={{ height: '40px' }} required fullWidth autoFocus
                                    value={userInformation.EmployeeType || ''}
                                    onChange={(event) =>
                                        handleInputChange('EmployeeType', event.target.value)
                                    }
                                    variant="outlined"
                                    name="EmployeeType">
                                    {
                                        EmployeeTypeStore.map((each) => (
                                            <MenuItem key={each.id} value={each.id}>{each.displayValue}</MenuItem>
                                        ))
                                    }
                                </MSelect>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={6}>
                                <InputLabel htmlFor="locationId">Location</InputLabel>
                                <MSelect style={{ height: '40px' }} required fullWidth autoFocus
                                    value={userInformation.LocationId || ''}
                                    onChange={(event) =>
                                        handleInputChange('LocationId', event.target.value)
                                    }
                                    className="w-full"
                                    name="LocationId"
                                    variant="outlined">
                                    {
                                        LocationStore.map((each) => (
                                            <MenuItem key={each.id} value={each.id}>{each.displayValue}</MenuItem>
                                        ))
                                    }
                                </MSelect>
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput value={userInformation.MobileNo} handleChange={handleInputChange} property='MobileNo' label="Mobile Number" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextInput value={userInformation.Email} handleChange={handleInputChange} property='Email' label="Email Id" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput value={userInformation.Section} handleChange={handleInputChange} property='Section' label="Section" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextInput value={userInformation.Nationality} handleChange={handleInputChange} property='Nationality' label="Nationality" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput value={userInformation.Designation} handleChange={handleInputChange} property='Designation' label="Designation" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={6}>
                                <DateInput value={userInformation.ContractStartdate} handleChange={handleInputChange} property='ContractStartdate' label="Contract Start Date" />
                            </Grid>
                            <Grid item xs={6}>
                                <DateInput value={userInformation.ContractEndate} handleChange={handleInputChange} property='ContractEndate' label="Contract End Date" />
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={4}>
                                <TextInput value={userInformation.EmiratesID} handleChange={handleInputChange} property='EmiratesID' label="Emirates Id" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={() => openFileUploader('EmiratesIDFile')} name="new" variant="contained" color="primary" className={classes.button} startIcon={<AddCircleOutlineIcon />}>
                                    Upload Emirate ID
                        </Button>

                            </Grid>
                            <Grid item xs={6}>
                                <DateInput value={userInformation.EmiratesIDExpiryDate} handleChange={handleInputChange} property='EmiratesIDExpiryDate' label="Emirate ID Expiry Date" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={4}>
                                <TextInput value={userInformation.PassportNo} handleChange={handleInputChange} property='PassportNo' label="Passport Number" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={() => openFileUploader('PassportNoFile')} name="new" variant="contained" color="primary" className={classes.button} startIcon={<AddCircleOutlineIcon />}>
                                    Upload Passport
                        </Button>

                            </Grid>
                            <Grid item xs={6}>
                                <DateInput value={userInformation.PassportExpiryDate} handleChange={handleInputChange} property='PassportExpiryDate' label="Passport Expiry Date" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="flex-end">
                            <Grid item xs={4}>
                                <TextInput value={userInformation.DrivingLicence} handleChange={handleInputChange} property='DrivingLicence' label="Driving Licence" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={() => openFileUploader('DrivingLicenceFile')} name="new" variant="contained" color="primary" className={classes.button} startIcon={<AddCircleOutlineIcon />}>
                                    Upload Licence
                        </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <DateInput value={userInformation.DrivingLicenceExpiryDate} handleChange={handleInputChange} property='DrivingLicenceExpiryDate' label="Driving Licence Expiry Date" />
                            </Grid>
                        </Grid>
                        <Divider variant="fullWidth" style={{ marginTop: 40 }} />
                        <Grid container alignItems="flex-end" spacing={10}>
                            <Grid item xs={12}>
                                <Button
                                    className={classes.bottomButton}
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={onSaveNewUser}
                                    startIcon={<SaveIcon />}
                                >Save</Button>
                                <Button
                                    className={classes.bottomButton}
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={onCancelClick}
                                    startIcon={<CloseIcon />}
                                >Cancel</Button>

                            </Grid>
                        </Grid>
                    </TabPanel>
                </div> :
                <Loader className={classes.loader}
                    type="Oval"
                    color="#2D4275"
                    height={80}
                    width={80}
                />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.findUserById.data,
        isLoading: state.findUserById.isLoading,
        savedUser: state.saveUser.data,
        error: state.findUserById.error,
    }
};

const mapDispatchToProps = { findById, save }
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditUser)
