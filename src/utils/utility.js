export const EmployeeTypeStore = [
    { id: 0, displayValue: 'Select' },
    { id: 1, displayValue: 'Full-Time' },
    { id: 2, displayValue: 'Part-Time' },
    { id: 3, displayValue: 'Temporary' },
    { id: 4, displayValue: 'Seasonal' }
];

export const LocationStore = [
    { id: 0, displayValue: 'Select' },
    { id: 1, displayValue: 'Dubai' },
    { id: 2, displayValue: 'Abu Dhabi' },
    { id: 3, displayValue: 'Ajman' },
    { id: 4, displayValue: 'Fujairah' },
    { id: 5, displayValue: 'Umm al-Quwain' },
    { id: 6, displayValue: 'Ras Al Khaimah' }
];

export const standardize = (input) => {
    let date = new Date(input);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + dt;
};

export const sanitizeFormData = (formData) => {
    let tempData = {};
    Object.assign(tempData, formData);
    for (var key in formData) {
        if (formData.hasOwnProperty(key) && key.toLowerCase().endsWith('date')) {
            tempData[key] = standardize(tempData[key]);
        }
    }
    return tempData;
};

export const getDisplayValue = (type, filterId) => {
    let foundObject = {};
    switch (type) {
        case 'Location':
            foundObject = LocationStore.find(obj => {
                return obj.id === filterId
            });
            break;
        case 'EmpType':
            foundObject = EmployeeTypeStore.find(obj => {
                return obj.id === filterId
            });
            break;
        default:
            break;
    }
    return foundObject.displayValue;
};

export const validateForm = (fielValue, fieldName) => {

    let errors = { message: '', isValid: false };

    switch (fieldName) {
        case "emailid":
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fielValue)) {
                errors.message = "*Please enter valid email-ID.";
                errors.isValid = false;
            }
            else { errors.message = ""; errors.isValid = true; }
            break;
        default:
            break;
    }
    return errors;
};

export const validateUserDetails = (object) => {
    let errorMessage = "";
    const requiredFields = ["ContractEndate",
        "ContractStartdate",
        "Designation",
        "DrivingLicence",
        "DrivingLicenceExpiryDate",
        "Email",
        "EmiratesID",
        "EmiratesIDExpiryDate",
        "EmployeeType",
        "LocationId",
        "Name",
        "PassportExpiryDate",
        "PassportNo"];
    requiredFields.forEach(element => {
        if (object[element] === undefined || object[element] === "") {
            errorMessage = element + " is a required field, please correct error.";
            return errorMessage;
        }
    });
    return errorMessage;
}