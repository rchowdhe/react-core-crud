import { TextField } from '@material-ui/core';

const TextInput = (props) => {
    const { label, value, property, handleChange } = props;
    return (<TextField size="small"
        className="mb-3"
        required
        label={label}
        autoFocus
        name={property}
        value={value || ''}
        onChange={(event) =>
            handleChange(property, event.target.value)
        }
        variant="outlined"
        fullWidth
    />);
};

export default TextInput;