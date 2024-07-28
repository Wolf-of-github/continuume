import React, { useState, useEffect } from 'react';
import { selectUserIdToView, setUserToView, clearUserToView } from '../redux/form/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Users = () => {
  
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate();


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

  const handleUserToView = (userId) =>{
    dispatch(setUserToView(userId));
    navigate('/form')
  }

  return (
    <div>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">User Accounts</h2>
            <span className="text-xs text-gray-500">View accounts of registered users</span>
          </div>
        </div>

        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Username</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Created At</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {users.map(user => (
                  <tr key = {user.email}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.username}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-full w-full rounded-full" src= {user.avatar} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.role}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </td>

                    <td className = "border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <button className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900 hover:bg-gray-300" onClick={()=>handleUserToView(user._id)}>
                        View form
                      </button>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm"> Showing {users.length} Entries </span>
            <div className="mt-2 inline-flex sm:mt-0">
              {/* Implement pagination controls here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
