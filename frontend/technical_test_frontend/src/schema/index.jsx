import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Please Enter Your Email ID'),
    password:Yup.string().required('Please Enter Your Password.')
});


export const registerSchema = Yup.object({
    userName: Yup.string().required('Please Enter Your Name'),
    email: Yup.string().email('Invalid Email').required('Please Enter Your Email ID'),
    password:Yup.string().required('Please Enter Your Password.'),
    cpassword : Yup.string().required('Please Confirm Your Password').oneOf([Yup.ref("password"), null], "Password Miss Matched")
});

