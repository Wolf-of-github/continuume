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

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/about' element={<About />} />
            {/* PrivateRoute wrapper for protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/form' element={<Form />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </BrowserRouter>
    </div>
  );
}
