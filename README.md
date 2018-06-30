# fc-form-validator

## Description

`npm install fc-form-validator`

A library to validate a html form

## Example

### Html

```
<form onsubmit="onSubmit()" onchange="onChange()">
  <div>
    <input type="text" name="username" />
    <input type="checkbox" name="spam" />
    <select name="city">
      <option>City</option>
      <option>Gothenburg</option>
      <option>Stockholm</option>
    </select>
  </div>
  <input type="submit" />
</form>
```

### JavaScript

```
const validateForm = require('fc-form-validator');

const validators = {
  username: (username, formState) => {
    if (username === "") throw new Error("you must have a username");

    if (username && username.length < 3)
      throw new Error("username must be at least 3 letters");

    if (username && username.length > 5)
      throw new Error("username must not be more than 5 letters");

    return true;
  },
  spam: (shouldSpam, formState) => {
    if (!shouldSpam) throw new Error("We must be allowed to spam you");
    return true;
  },
  city: (city, { spam }) => {
    if (city === "City") throw new Error("City must be selected");
    if (city !== "City" && spam !== true)
      throw new Error("Don't forget to let us spam you");

    return true;
  }
};

  function onChange(event) {
    const formState = validateForm(event.target.form, validators);
    ...
  }

  function onSubmit(event) {
    event.preventDefault();
    const formState = validateForm(event.target, validators);
    ...
  }

```

### FormState

```
{
  username: {
    valid: <Boolean>,
    value: <field value>,
    error: [Error]
  },
  spam: {
    valid: <Boolean>,
    value: <field value>,
    error: [Error]
  },
  city: {
    valid: <Boolean>,
    value: <field value>,
    error: [Error]
  }
}
```