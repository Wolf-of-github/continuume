import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (

    <nav style={{borderBottom: "0.5px solid white"}} className = "bg-gray-50 dark:bg-gray-800">
      
      <div className = "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <Link to = '/' className = "flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg " className = "h-8" alt="Flowbite Logo" />
            <span className = "self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Continuume</span>
        </Link>

        <div className = "hidden w-full md:block md:w-auto" id="navbar-solid-bg">

          <ul className = "flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

            <li>
              <Link to = '/' className = "block py-2 px-3 md:p-0 text-white md:bg-transparent  md:dark:hover:text-blue-500 md:dark:bg-transparent" aria-current="page">Home</Link>
            </li>

            <li>
              <Link to = '/about' className = "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
            </li>

            <li>
              <Link to = '/services'>
                <div className = "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</div>
              </Link>
            </li>

            <li>
              <Link to='/profile'>
                {currentUser ? (
                  <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
                ) : (
                  <span className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'> Sign in</span>
                )}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
