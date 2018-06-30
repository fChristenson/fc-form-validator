const ValidatedField = require("./ValidatedField");

const validateFormState = (formState, validators) => {
  const validatedState = Object.assign({}, formState);
  const validatorNames = Object.keys(validators);
  const fieldNames = Object.keys(formState);

  return fieldNames.reduce((validatedState, fieldName) => {
    const validator = validators[fieldName];
    const fieldValue = formState[fieldName];
    let valid = true;

    if (validatorNames.indexOf(fieldName) === -1) {
      validatedState[fieldName] = ValidatedField(valid, fieldValue);
    } else {
      try {
        valid = validator(fieldValue, formState);
        validatedState[fieldName] = ValidatedField(valid, fieldValue);
      } catch (error) {
        valid = false;
        validatedState[fieldName] = ValidatedField(valid, fieldValue, error);
      }
    }

    return validatedState;
  }, validatedState);
};

const isCheckedRadioButton = child => {
  return child.type === "radio" && child.checked !== false;
};

const getFieldValue = field => {
  if (field.type === "checkbox") return field.checked;
  return field.value;
};

const convertFieldsToFormState = fields => {
  return fields.reduce((state, field) => {
    state[field.name] = field.value;
    return state;
  }, {});
};

const validateForm = (form, validators) => {
  const fields = Object.values(form)
    .filter(child => child.name !== undefined && child.name !== "")
    .filter(child => child.type !== "radio" || isCheckedRadioButton(child))
    .map(child => {
      return { name: child.name, value: getFieldValue(child) };
    });

  const formState = convertFieldsToFormState(fields);
  return validateFormState(formState, validators);
};

module.exports = validateForm;
