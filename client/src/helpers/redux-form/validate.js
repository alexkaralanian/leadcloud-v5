export const contactValidate = values => {
  const errors = {};
  if (!values.fullname) {
    errors.fullname = "Required";
  } else if (
    !/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+( )*$/i.test(values.fullname)
  ) {
    errors.fullname = "Please enter full name";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.phone) {
    errors.phone = "";
  } else if (
    !/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/i.test(
      values.phone
    )
  ) {
    errors.phone = "Please enter a valid phone number";
  }
  return errors;
};

export const pilotValidate = values => {
  const errors = {};
  if (!values.fullname) {
    errors.fullname = "";
  } else if (
    !/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+( )*$/i.test(values.fullname)
  ) {
    errors.fullname = "Please enter full name";
  }
  if (!values.email) {
    errors.email = "";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.phone) {
    errors.phone = "";
  } else if (
    !/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/i.test(
      values.phone
    )
  ) {
    errors.phone = "Please enter a valid phone number";
  }
  if (!values.address) {
    errors.address = "";
  }
  if (!values.housesSold) {
    errors.housesSold = "";
  } else if (!/^(?:0|[1-9]|[1-4][0-9]|50)$/.test(values.housesSold)) {
    errors.housesSold = "Please enter a valid number";
  }
  if (!values.experience) {
    errors.experience = "";
  }
  return errors;
};

export const pilotValidateEmail = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export const pilotValidateName = values => {
  const errors = {};

  if (!values.fullname) {
    errors.fullname = "Required";
  } else if (
    !/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+( )*$/i.test(values.fullname)
  ) {
    errors.fullname = "Please enter full name";
  }

  return errors;
};

export const pilotValidateAddress = values => {
  const errors = {};

  if (!values.address) {
    errors.address = "Required";
  }

  return errors;
};

export const getstartedValidate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export default {
  contactValidate,
  pilotValidate,
  pilotValidateEmail,
  pilotValidateName,
  pilotValidateAddress,
  getstartedValidate,
  email
};
