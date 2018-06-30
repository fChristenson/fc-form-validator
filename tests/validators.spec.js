const valdiateForm = require("../");
const Field = require("./util/Field");
const ValidatedField = require("../ValidatedField");

describe("validators", () => {
  it("has a module", () => {
    expect(valdiateForm).toBeDefined();
  });

  it("returns an empty object if the form has no fields", () => {
    const expected = {};
    const actual = valdiateForm({}, {});
    expect(expected).toEqual(actual);
  });

  it("returns a validated field", () => {
    const type = "text";
    const name = "username";
    const value = "foo";
    const validators = {
      username: () => true
    };
    const form = {
      username: Field(type, name, value)
    };
    const valid = true;
    const error = undefined;
    const expected = {
      username: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });

  it("returns an false for a invalid field", () => {
    const type = "text";
    const name = "username";
    const value = "foo";
    const validators = {
      username: () => false
    };
    const form = {
      username: Field(type, name, value)
    };
    const valid = false;
    const error = undefined;
    const expected = {
      username: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });

  it("returns a error for a invalid field", () => {
    const type = "text";
    const name = "username";
    const value = "foo";
    const error = new Error("my error");
    const validators = {
      username: () => {
        throw error;
      }
    };
    const form = {
      username: Field(type, name, value)
    };
    const valid = false;
    const expected = {
      username: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });

  it("returns a the first error for a invalid field", () => {
    const type = "text";
    const name = "username";
    const value = "foo";
    const error = new Error("my error");
    const error2 = new Error("my error2");
    const validators = {
      username: value => {
        if (value === "foo") throw error;
        if (value === "bar") throw error2;
      }
    };
    const form = {
      username: Field(type, name, value)
    };
    const valid = false;
    const expected = {
      username: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });

  it("returns a the second error for a invalid field", () => {
    const type = "text";
    const name = "username";
    const value = "bar";
    const error = new Error("my error");
    const error2 = new Error("my error2");
    const validators = {
      username: value => {
        if (value === "foo") throw error;
        if (value === "bar") throw error2;
      }
    };
    const form = {
      username: Field(type, name, value)
    };
    const valid = false;
    const expected = {
      username: ValidatedField(valid, value, error2)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });

  it("returns multiple errors for a invalid fields", () => {
    const type = "text";
    const type2 = "password";
    const name = "username";
    const name2 = "password";
    const value = "foo";
    const error = new Error("my error");
    const validators = {
      username: () => {
        throw error;
      },
      password: () => {
        throw error;
      }
    };
    const form = {
      username: Field(type, name, value),
      password: Field(type2, name2, value)
    };
    const valid = false;
    const expected = {
      username: ValidatedField(valid, value, error),
      password: ValidatedField(valid, value, error)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });

  it("returns both valid and invalid fields with errors", () => {
    const type = "text";
    const type2 = "password";
    const type3 = "number";
    const name = "username";
    const name2 = "password";
    const name3 = "age";
    const value = "foo";
    const error = new Error("my error");
    const error2 = undefined;
    const validators = {
      username: () => {
        return true;
      },
      password: () => {
        throw error;
      },
      age: () => {
        return false;
      }
    };
    const form = {
      username: Field(type, name, value),
      password: Field(type2, name2, value),
      age: Field(type3, name3, value)
    };
    const valid = false;
    const valid2 = true;
    const expected = {
      username: ValidatedField(valid2, value, error2),
      password: ValidatedField(valid, value, error),
      age: ValidatedField(valid, value, error2)
    };
    const actual = valdiateForm(form, validators);
    expect(expected).toEqual(actual);
  });
});
