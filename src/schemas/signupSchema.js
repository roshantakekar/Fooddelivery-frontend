import * as Yup from 'yup';
const signupSchema=Yup.object().shape({
    firstName:Yup.string()
    .required("First Name is Required.")
    .min(1, "First Name is Too Short."),
    lastName:Yup.string()
    .required("Last Name is Required.")
    .min(1, "Last Name is Too Short."),
    email:Yup.string().email().required("Email is Required."),
    password:Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
});
export default signupSchema;