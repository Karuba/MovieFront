import { useState } from "react"
import "./Navigation.css";
import { Outlet, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from "react-router-dom";

function Navigation() {
   const { auth } = useAuth();
   const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('filter')));
   const location = useLocation();
   const navigate = useNavigate();
   const handleSubmit = async (event) => {
      event.preventDefault();
      localStorage.setItem('filter', JSON.stringify(filter));
      console.log('s', location);

      if (location.pathname === "/") {
         navigate("/empty");
      }
      else {
         navigate("/");
      }
   }
   return (
      <>
         <nav className='navigation'>
            <div className='log-wrapper'>
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     id="filter"
                     autoComplete="off"
                     onChange={(e) => setFilter(e.target.value)}
                     value={filter}
                  />
               </form>
            </div>
            <ul>
               <li>
                  <Link className='navigation-link' to="/"><span>Home</span></Link>
               </li>
            </ul>
            <div className='log-wrapper log-in'>
               <div className='log-in'>
                  <Link className='navigation-link' to="/login"><span>{auth?.user ? auth?.user : "Log In"}</span></Link>
               </div>
            </div>
         </nav>
         <Outlet />
      </>
   )
}

export default Navigation;