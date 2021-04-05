import { TextField } from '@material-ui/core';

const DateInput = (props) => {
    const { label, value, property, handleChange } = props;
    return (<TextField size="small"
        className="mb-3"
        required
        label={label}
        autoFocus
        name={property}
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{ shrink: true }}
        value={value || '2017-05-24'}
        onChange={(event) =>
            handleChange(property, event.target.value)
        }
        variant="outlined"
        fullWidth
    />);
};

export default DateInput;