import React from "react";
import PropTypes from "prop-types";
import TextInput from "./Inputs/TextInput";
import MobilePhone from "./Inputs/MobilePhone";
const FormElement = ({
  index,
  field: {
    fieldType,
    value,
    id,
    label,
    xmlName,
    isRequired,
    options,
    regex,
    errorMessage,
    placeHolder,
  },
  error,
  errorMessages,
  handleChange,
  defaultValue,
  handleBlur,
  disabled,
}) => {
  if (placeHolder.includes("Mobile Number")) {
    fieldType = "phoneNumber";
  }

  switch (fieldType) {
    case "text":
      return (
        <TextInput
          id={id}
          type={fieldType}
          name={xmlName}
          value={value}
          title={label}
          disabled={disabled}
          defaultValue={defaultValue}
          errorMessage={errorMessages[xmlName]}
          placeholder={placeHolder}
          required={isRequired}
          changeHandler={(event) => handleChange(xmlName, index, event)}
          blurHandler={(event) =>
            handleBlur(xmlName, event.target.value, regex, errorMessage)
          }
        />
      );
    case "password":
      return (
        <TextInput
          id={id}
          type={fieldType}
          name={xmlName}
          value={value}
          title={label}
          secured
          disabled={disabled}
          errorMessage={errorMessages[xmlName]}
          placeholder={placeHolder}
          required={isRequired}
          changeHandler={(event) => handleChange(xmlName, index, event)}
          blurHandler={(event) =>
            handleBlur(xmlName, event.target.value, regex, errorMessage)
          }
        />
      );
    case "phoneNumber":
      return (
        <MobilePhone
          select
          id={id}
          type={fieldType}
          name={xmlName}
          defaultValue={defaultValue}
          error={error}
          options={options}
          title={label}
          disabled={disabled}
          errorMessage={errorMessages[xmlName]}
          placeholder={placeHolder}
          required={isRequired}
          changeHandler={(event) => handleChange(xmlName, index, event)}
          blurHandler={(event) =>
            handleBlur(xmlName, event.target.value, regex, errorMessage)
          }
        />
      );
    case "date":
      return (
        <TextInput
          date
          id={id}
          type={fieldType}
          name={xmlName}
          value={value}
          options={options}
          title={label}
          disabled={disabled}
          errorMessage={errorMessages[xmlName]}
          placeholder={placeHolder}
          required={isRequired}
          changeHandler={(event) => handleChange(xmlName, index, event)}
          blurHandler={(event) =>
            handleBlur(xmlName, event.target.value, regex, errorMessage)
          }
        />
      );

    case "select":
      return (
        <TextInput
          select
          id={id}
          type={fieldType}
          name={xmlName}
          value={value}
          options={options}
          title={label}
          disabled={disabled}
          errorMessage={errorMessages[xmlName]}
          placeholder={placeHolder}
          required={isRequired}
          changeHandler={(event) => handleChange(xmlName, index, event)}
          blurHandler={(event) =>
            handleBlur(xmlName, event.target.value, regex, errorMessage)
          }
        />
      );
    default:
      return null;
  }
};
FormElement.propTypes = {
  index: PropTypes.number,
  field: PropTypes.object,
  currentField: PropTypes.object,
  errorMessages: PropTypes.object,
  dateHandler: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};
export default FormElement;
