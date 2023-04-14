export const getFirstValidationError = (error) => {
  let validationErrors;
  if (!error.response.data.errors) {
    validationErrors = error.response.data.message;
  } else {
    validationErrors = error.response.data.errors;
  }

  const objString = JSON.stringify(validationErrors);

  return objString;
};
