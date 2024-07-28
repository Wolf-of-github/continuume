import React, { useEffect, useState } from 'react';

export default function Messages() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/auth/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow flex overflow-x-hidden">
          <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
            <div className="text-xs text-gray-400 tracking-wider">USERS</div>

            <div className="relative mt-2">
              <input
                type="text"
                className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
                placeholder="Search"
              />
              <svg
                viewBox="0 0 24 24"
                className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            <div className="space-y-4 mt-3">
              {users.map((user) => (
                <button key={user._id} className="p-3 w-full flex flex-col rounded-md dark:bg-gray-200 shadow">
                  <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                    <img src={user.avatar} className="w-7 h-7 mr-2 rounded-full" alt="profile picture" />
                    {user.username}
                  </div>
                  <div className="flex items-center w-full">
                    <div className="text-xs py-1 px-2 leading-none bg-indigo-500 text-white rounded-md">{user.role}</div>
                    <div className="ml-auto text-xs text-gray-500">{user.role === 'admin' ? 'Admin' : 'External'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto">
            {/* Main content area */}
          </div>
        </div>
      </div>
    </div>
  );
}
