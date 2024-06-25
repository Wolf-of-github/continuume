// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer style={{borderTop: "0.5px solid white"}} className="bg-gray-800 p-2 text-center flex justify-between">
      <div className='text-white font-thin text-xs'>
        © 2024 Your Company. All rights reserved.
      </div>
      <div>
      <ul class="flex flex-wrap items-center mt-3 text-gray-500 font-thin text-xs sm:mt-0">
            <li>
                <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline">Contact</a>
            </li>
        </ul> 
      </div>        
    </footer>
  );
};

export default Footer;


// import React from 'react'

// export default function Footer() {
//   return (
    

//     <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
//         <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
//           <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Continuume</a>. All Rights Reserved.
//         </span>
//         <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
//             <li>
//                 <a href="#" class="hover:underline me-4 md:me-6">About</a>
//             </li>
//             <li>
//                 <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
//             </li>
//             <li>
//                 <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
//             </li>
//             <li>
//                 <a href="#" class="hover:underline">Contact</a>
//             </li>
//         </ul>
//         </div>
//     </footer>

//   )
// }
