import { useRef, useState, useEffect } from 'react';
import "./Login.css";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const REGISTER_URL = 'https://localhost:7166/api/authentication/login';

const Login = () => {
   const { setAuth } = useAuth();

   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('Administrator');
   const [pwd, setPwd] = useState('1488228');
   const [errMsg, setErrMsg] = useState('');

   useEffect(() => {
      userRef.current.focus();
   }, [])

   useEffect(() => {
      setErrMsg('');
   }, [user, pwd])

   const handleSubmit = async (e) => {
      e.preventDefault();

      console.log({ user, pwd });

      try {
         const options = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
            },
            userName: user,
            password: pwd
         };
         const response = await axios.post(REGISTER_URL, options);

         console.log(response.data);
         //console.log(JSON.stringify(response));
         const token = response?.data?.token;
         const roles = response?.data?.user.roles;

         localStorage.setItem('auth', JSON.stringify({ user, pwd, roles, token }));
         setAuth({ user, pwd, roles, token });
         setUser('');
         setPwd('');
         navigate(from, { replace: true });
      } catch (err) {
         if (!err?.response) {
            setErrMsg('No Server Response');
         } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
         } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
         } else {
            setErrMsg('Login Failed');
         }
         errRef.current.focus();
      }
   }
   const onLogOut = () => {
      localStorage.setItem('auth', JSON.stringify({ user: null, pwd: null, roles: null, token: null }));
      setAuth({ user: null, pwd: null, roles: null, token: null });
   }
   return (
      <section className='form'>
         <div className='form-inner'>
            <>
               <section>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Sign In</h1>
                  <form onSubmit={handleSubmit}>
                     <label htmlFor="username">Username:</label>
                     <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                     />

                     <label htmlFor="password">Password:</label>
                     <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                     />
                     <button>Sign In</button>
                  </form>
                  <p>
                     Need an Account?<br />
                     <span className="line">
                        <Link to="/register">Sign Up</Link>
                     </span>
                     <span className="line">
                        <Link onClick={onLogOut}>Log Out</Link>
                     </span>
                  </p>
               </section>
            </>
         </div>
      </section>
   )
}

export default Login
