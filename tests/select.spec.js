const valdiateForm = require("../");
const Field = require("./util/Field");
const ValidatedField = require("../ValidatedField");

describe("<Select />", () => {
  it("has a module", () => {
    expect(valdiateForm).toBeDefined();
  });

  it("returns an empty object if the form has no fields", () => {
    const expected = {};
    const actual = valdiateForm({}, {});
    expect(expected).toEqual(actual);
  });

  it("returns a validated field", () => {
    const type = "";
    const name = "username";
    const value = "foo";
    const form = {
      username: Field(type, name, value)
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
