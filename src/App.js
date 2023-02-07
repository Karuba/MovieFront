//import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from './routes/Home';
import About from "./routes/About";
import Detail from './components/Detail';
import "./components/Clear.css";
import CreateMovie from './components/CreateMovie';
import Login from './components/Login'
import Register from './components/Register'
import RequireAuth from './context/RequireAuth';
import Unauthorized from "./components/Unauthorized";
import EditMovie from "./components/EditMovie";
import Empty from "./components/Empty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="empty" element={<Empty />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='movie/:id' element={<Detail />} />
          <Route element={<RequireAuth allowedRoles={["Administrator"]} />}>
            <Route path='movie/create' element={<CreateMovie />} />
            <Route path='movie/edit/:id' element={<EditMovie />} />
          </Route>
          <Route path='*' element={<h1>Page not found!</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
