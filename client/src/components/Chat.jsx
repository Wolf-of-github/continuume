import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserIdToView } from '../redux/form/formSlice';

export default function Chat() {
  
  const { currentUser } = useSelector((state) => state.user);
  const userIdToView = useSelector(selectUserIdToView);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = userIdToView !== null ? userIdToView : currentUser._id;
      const res = await fetch(`/api/chat/read/${userId}`);
      const data = await res.json();

      if (!res.ok) {
        if (res.status !== 404) {
          throw new Error(data.message || 'Failed to fetch chat data');
        }
      } else {
        setChats(data);
      }
    } catch (error) {
      console.error('Error fetching chat data:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = userIdToView !== null ? userIdToView : currentUser._id;
      const res = await fetch(`/api/chat/create/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setMessage('');
      fetchData();
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 grid grid-rows-10 grid-cols-1 bg-gray-800 h-screen">
      <div className="row-span-9 overflow-auto col-span-1 custom-scrollbar">
        <div className="flex flex-col mt-5 ml-2 mr-2">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`flex justify-${chat.messageFrom === 'admin' ? 'end' : 'start'} mb-4`}
            >
              <div
                className={`${
                  chat.messageFrom === 'admin' ? 'bg-blue-400' : 'bg-gray-400'
                } mr-2 py-3 px-4 rounded-3xl text-white`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1 flex justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 rounded bg-gray-300"
            placeholder="Enter message"
          />
          {/* No need for a submit button */}
        </form>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
