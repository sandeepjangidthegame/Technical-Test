import React, { useEffect } from 'react'
import {useFormik} from 'formik';
import { registerSchema } from '../schema/index';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    userName : "",
    email : "",
    password:"",
    dept : "",
  }


  const Register = () => {

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
        validationSchema:registerSchema,
        onSubmit:(values) => {
            registerUser()
        }
      });


      const registerUser = async () => {
        try {
            const res = await fetch('/register', {
                method : "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    user_name : values.userName,
                    user_email : values.email,
                    user_passwd  : values.password,
                    dept : values.dept
                }),
            });

            const msg = await res.json();
            if (msg.msg === "User registered successfully!"){
                alert("Registration successful!");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);            
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
          <input type="text" className={errors.userName && touched.userName ? ("form-control is-invalid") : "form-control"} name='userName' placeholder="Name"
            value={values.username}
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


        <div class="form-group">
                        <label>Select Department</label>
                        <select class="form-control" name="dept" value={values.dept} onChange={handleChange} onBlur={handleBlur}>
                          <option value="Team">Team</option>
                          <option value="Manager">Manager</option>
                          <option value="Acount">Acount</option>
                        </select>
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

        <div className="input-group mb-3">
          <input type="password" className={errors.cpassword && touched.cpassword ? ("form-control is-invalid") : "form-control"} name='cpassword' placeholder="Confirm Password"
            value={values.cpassword}
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
              <input className='mr-1' type="checkbox" id="remember" required />
              <label htmlFor="remember">
                Agree Terms and Condition
              </label>
            </div>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </div>
          
        </div>
      </form>
      <p className="mb-0">
        <a href="/login" className="text-center">Sign In</a>
      </p>
    </div>
  </div>
</div>
</section>
    </>
  )
}

export default Register