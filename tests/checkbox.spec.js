const valdiateForm = require("../");
const Field = require("./util/Field");
const ValidatedField = require("../ValidatedField");

describe("<input type=checkbox />", () => {
  it("has a module", () => {
    expect(valdiateForm).toBeDefined();
  });

  it("returns an empty object if the form has no fields", () => {
    const expected = {};
    const actual = valdiateForm({}, {});
    expect(expected).toEqual(actual);
  });

  it("returns a validated field if the checkbox is checked", () => {
    const type = "checkbox";
    const name = "username";
    const value = true;
    const field = Field(type, name, value);
    field.checked = value;
    const form = {
      username: field
    };
    const valid = true;
    const error = undefined;
    const expected = {
      username: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, {});
    expect(expected).toEqual(actual);
  });

  it("returns a false if the checkbox button is not checked", () => {
    const type = "checkbox";
    const name = "username";
    const value = false;
    const field = Field(type, name, value);
    field.checked = value;
    const form = {
      username: field
    };
    const valid = true;
    const error = undefined;
    const expected = {
      username: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, {});
    expect(expected).toEqual(actual);
  });
});
