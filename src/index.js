class FormValidation {
  constructor(frmName, errorMessages) {
    this.formName = frmName;
    this.errorMessage = "Required";
    this.requiredFields = {};
  }

  getAllRequiredFields() {
    let requiredFields = {};
    const formName = document.getElementById(this.formName);
    const fields = formName.querySelectorAll("input");

    fields.forEach(field => {
      const isRequired = field.hasAttribute("required");
      const errorMessage = isRequired ? field.getAttribute("error") : undefined;
      const regex = isRequired ? field.getAttribute("regex") : undefined;

      requiredFields[field.name] = {
        isRequired: isRequired || false,
        value: field.value,
        error: isRequired ? errorMessage : undefined,
        regex: isRequired ? regex : undefined
      };
    });
    this.requiredFields = requiredFields;
    return requiredFields;
  }

  validate() {
    const formName = document.getElementById(this.formName);
    const submitButtonName = formName.querySelectorAll("button[type=submit]");
    submitButtonName[0].addEventListener(
      "click",
      e => {
        e.preventDefault();
        this.getAllRequiredFields();
        this.validateField();
      },
      false
    );
  }

  validateField() {
    let fields = { ...this.requiredFields };
    let errors = {};

    for (let field in fields) {
      const regex = new RegExp(fields[field]["regex"]);

      if (
        fields[field]["isRequired"] &&
        regex.test(fields[field]["value"]) === false
      ) {
        errors[field] = {};
        errors[field] = fields[field];
      }
    }
    console.log(errors);
    this.printErrors(errors);
  }

  printErrors(errors) {
    const formName = document.getElementById(this.formName);

    for (let error in errors) {
      const errorTag = document.createElement("p");
      errorTag.className = "error";
      errorTag.append(
        document.createTextNode(`${error} : ${errors[error]["error"]}`)
      );
      if (
        formName
          .querySelectorAll(`input[name=${error}]`)[0]
          .parentNode.querySelector(".error")
      ) {
        formName
          .querySelectorAll(`input[name=${error}]`)[0]
          .parentNode.removeChild(
            formName
              .querySelectorAll(`input[name=${error}]`)[0]
              .parentNode.querySelector(".error")
          );
      }

      formName
        .querySelectorAll(`input[name=${error}]`)[0]
        .parentNode.appendChild(errorTag);
    }
  }
}

const firsForm = new FormValidation("firstForm");
firsForm.validate();
