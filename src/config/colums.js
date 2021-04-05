import { standardize, getDisplayValue } from '../utils/utility';

const columns = [
    { field: 'id', hide: true },
    { field: 'Name', headerName: 'Name', width: 130 },
    {
        field: 'EmployeeType', headerName: 'Emp. Type', width: 150, valueGetter: function (params) {
            return getDisplayValue('EmpType', params.value);
        }
    },
    {
        field: 'LocationId', headerName: 'Location', width: 130, valueGetter: function (params) {
            return getDisplayValue('Location', params.value);
        }
    },
    { field: 'MobileNo', headerName: 'Mobile', width: 130 },
    { field: 'Email', headerName: 'Email Id', width: 130 },
    { field: 'Section', headerName: 'Section', width: 130 },
    { field: 'Nationality', headerName: 'Nationality', width: 130 },
    { field: 'Designation', headerName: 'Designation', width: 130 },
    { field: 'EmiratesID', headerName: 'EmiratesID', width: 130 },
    {
        field: 'EmiratesIDExpiryDate', headerName: 'Expiry Date', width: 130, valueGetter: function (params) {
            return standardize(params.value);
        }
    },
    { field: 'PassportNo', headerName: 'Passport', width: 130 },
    {
        field: 'PassportExpiryDate', headerName: 'Expiry Date', width: 130, valueGetter: function (params) {
            return standardize(params.value);
        }
    },
    { field: 'DrivingLicence', headerName: 'Driving Licence', width: 150 },
    {
        field: 'DrivingLicenceExpiryDate', headerName: 'Expiry Date', width: 130, valueGetter: function (params) {
            return standardize(params.value);
        }
    },
    {
        field: 'ContractStartdate', headerName: 'Contract Start', width: 150, valueGetter: function (params) {
            return standardize(params.value);
        }
    },
    {
        field: 'ContractEndate', headerName: 'Contract End', width: 150, valueGetter: function (params) {
            return standardize(params.value);
        }
    }
];

export default columns;