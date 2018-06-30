const valdiateForm = require("../");
const Field = require("./util/Field");
const ValidatedField = require("../ValidatedField");

describe("<input type=radio />", () => {
  it("has a module", () => {
    expect(valdiateForm).toBeDefined();
  });

  it("returns an empty object if the form has no fields", () => {
    const expected = {};
    const actual = valdiateForm({}, {});
    expect(expected).toEqual(actual);
  });

  it("returns a validated field", () => {
    const type = "radio";
    const name = "username";
    const value = "foo";
    const field = Field(type, name, value);
    field.checked = true;
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

  it("returns a empty object if the radio button is not checked", () => {
    const type = "radio";
    const name = "username";
    const value = "foo";
    const field = Field(type, name, value);
    field.checked = false;
    const form = {
      username: field
    };
    const expected = {};
    const actual = valdiateForm(form, {});
    expect(expected).toEqual(actual);
  });
});
