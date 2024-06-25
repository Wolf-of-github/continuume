import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Form from './pages/Form';
import Footer from './components/Footer';
import Services from './pages/Services';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import Console from './pages/Console';


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="flex-grow h-dvh">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            {/* PrivateRoute wrapper for protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/form' element={<Form />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route path='/console' element={<Console />} />
            </Route>
          </Routes>
        </div>
        {/* <Footer className="" /> */}
      </BrowserRouter>
    </div>
  );
}
