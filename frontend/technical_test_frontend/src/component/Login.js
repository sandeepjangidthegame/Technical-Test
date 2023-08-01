import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import {loginSchema} from '../schema/index';

const initialValues = {
  email : "",
  password:""
}

const Login = () => {

  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      const res = await fetch('/cookies', {
        method : 'GET',
        headers: {
          Accept : 'application.json',
          'Content-Type': 'application/json'
        },
        credentials:'include'
      });
      const user = await res.json();
      console.log(user);
      if (user.msg !== "Error!!!"){
        navigate('/')
      }
    } catch (error) {
      console.log("Error: "+error);
    }
  }

  const {values, errors, touched, handleSubmit, handleBlur, handleChange} = useFormik({
    initialValues:initialValues,
    validationSchema:loginSchema,
    onSubmit:(values) => {
      loginUser();
    }
  })

  const loginUser = async () => {
    const res = await fetch('/login', {
      method : 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        email: values.email,
        password: values.password
      })
    });

    const msg = await res.json();
    if (msg.msg === "Success"){
      navigate('/');
    }
  }

  useEffect(() => {
    checkLogin();
  }, [])

  return (
    <>
    <section className="hold-transition login-page">
      <div className="login-box">
  <div className="login-logo">
    <a href="/">Technical Test</a>
  </div>
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>

      <form onSubmit={handleSubmit} method="post">
        <div className="input-group mb-3">
          <input type="email" className={errors.email && touched.email ? ("form-control is-invalid") : "form-control"} name='email' placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className={errors.password && touched.password ? ("form-control is-invalid") : "form-control"} name='password' placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input className='mr-1' type="checkbox" id="remember"/>
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </div>
          
        </div>
      </form>
      <p className="mb-0">
        <a href="/register" className="text-center">Register a new membership</a>
      </p>
    </div>
  </div>
</div>
</section>
    </>
  )
}

export default Login