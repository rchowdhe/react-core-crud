import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findAll, removeById } from '../../redux/actions/userdetails';
import IconLabelButtons from '../../components/others/IconLabelButtons';
import columns from './../../config/colums';
import Loader from "react-loader-spinner";
import styles from "./style";

const selectedIds = [];
function UsersGrid({ users, isLoading, isRemoved, error, findAll, removeById }) {

    /*
    * Call server api endpoint to fecth all records.
    */
    const classes = styles();
    const fetchDataFromApi = () => {
        findAll()
    };

    useEffect(() => {
        fetchDataFromApi();
    }, [isRemoved]);

    const history = useHistory();

    /*
    * Control toolbar enable/disable status.
    */
    const [toolBarStatus, setToolBarStatus] = React.useState({ newEnabled: true, editEnabled: false, deleteEnabled: false, reloadEnabled: true });

    /*
    * Attach action toolbar at top of Grid.
    */
    const attachToolBar = () => {
        return (
            <IconLabelButtons
                toolBarStatus={toolBarStatus}
                onNewClick={addNewRecord}
                onEditClick={editRecord}
                onReloadClick={reloadGridData}
                onDelteClick={deleteRecord}>
            </IconLabelButtons>
        );
    };

    const addNewRecord = () => {
        history.push('/users/add');
    };
    const editRecord = () => {
        history.push(`/users/${ selectedIds[0] }/edit`);
    };
    const reloadGridData = () => {
        fetchDataFromApi();
    };
    const deleteRecord = () => {
        removeById(selectedIds[0]);
    };

    const onRowSelection = (selModel) => {
        selModel.isSelected ? selectedIds.unshift(selModel.data.id) : selectedIds.splice(selectedIds.indexOf(selModel.data.id), 1);
        let selectedRows = selModel.api.current.getSelectedRows();
        if (selModel.isSelected || (!selModel.isSelected && selectedRows.length > 1)) {
            setToolBarStatus(prev => ({ ...prev, editEnabled: true, deleteEnabled: true }));
        }
        else {
            setToolBarStatus(prev => ({ ...prev, editEnabled: false, deleteEnabled: false }));
        }
    };

    return (
        <div style={{ height: 850, width: '100%' }}>
            {!isLoading ?
                <DataGrid
                    headerHeight={50}
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    checkboxSelection
                    disableMultipleSelection={true}
                    onRowSelected={onRowSelection}
                    components={{
                        Toolbar: attachToolBar,
                    }} /> :
                <Loader className={classes.loader}
                    type="Oval"
                    color="#2D4275"
                    height={80}
                    width={80}
                />}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isRemoved: state.removeUser.data,
        users: state.findAllUsers.data || [],
        isLoading: state.findAllUsers.isLoading || state.removeUser.loading,
        error: state.findAllUsers.error || state.removeUser.error,
    }
}
const mapDispatchToProps = { findAll, removeById }

export default connect(mapStateToProps, mapDispatchToProps)(UsersGrid)