import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logo.png" className="h-8" alt="Flowbite Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Ledge</span> */}
        </Link>
        
        <button
          onClick={toggleMenu}
          className="md:hidden text-black focus:outline-none"
        >
          <FaBars className="h-6 w-6" />
        </button>

        <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent bg-white border-gray-200">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 md:p-0 rounded ${
                  location.pathname === '/' ? 'bg-gray-200' : 'text-black'
                } hover:bg-gray-200`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 md:p-0 rounded ${
                  location.pathname === '/about' ? 'bg-gray-200' : 'text-black'
                } hover:bg-gray-200`}
              >
                About
              </Link>
            </li>
            {/* <li>
              <Link
                to="/services"
                className={`block py-2 px-3 md:p-0 rounded ${
                  location.pathname === '/services' ? 'bg-gray-200' : 'text-black'
                } hover:bg-gray-200`}
              >
                Services
              </Link>
            </li> */}
            
            <li>
              <Link
                to="/messages"
                className={`block py-2 px-3 md:p-0 rounded ${
                  location.pathname === '/messages' ? 'bg-gray-200' : 'text-black'
                } hover:bg-gray-200`}
              >
                Messages
              </Link>
            </li>

            {currentUser && currentUser.role === 'admin' && (
              <li>
                <Link
                  to="/console"
                  className={`block py-2 px-3 md:p-0 rounded ${
                    location.pathname === '/console' ? 'bg-gray-200' : 'text-black'
                  } hover:bg-gray-200`}
                >
                  Console
                </Link>
              </li>
            )}
            <li>
              <Link to="/profile">
                {currentUser ? (
                  <>
                    {/* Hidden on mobile, shown on md and larger screens */}
                    <img
                      className="hidden md:block rounded-full h-7 w-7 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    {/* Shown on mobile, hidden on md and larger screens */}
                    <span className="block md:hidden py-2 px-3">
                      Profile
                    </span>
                  </>
                ) : (
                  <span
                    className={`block py-2 px-3 md:p-0 rounded ${
                      location.pathname === '/profile' || location.pathname === '/sign-in' ? 'bg-gray-200' : 'text-black'
                    } hover:bg-gray-200`}
                  >
                    Sign in
                  </span>
                )}
              </Link>
            </li>          
          </ul>
        </div>
      </div>
    </nav>
  );
}
