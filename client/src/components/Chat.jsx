import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserIdToView } from '../redux/form/formSlice';

export default function Chat({ selectedForm }) {
  const { currentUser } = useSelector((state) => state.user);
  const userIdToView = useSelector(selectUserIdToView);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, [selectedForm]); // Trigger fetchData whenever selectedForm changes

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
        setChats(data); // Store all fetched messages in state
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
        body: JSON.stringify({ message, section: selectedForm }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setMessage('');
      fetchData(); // Refetch all messages after sending a new message
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex-1 grid grid-rows-10 grid-cols-1 bg-gray-800 h-screen">
      <div className="row-span-9 overflow-auto col-span-1 custom-scrollbar mb-2">
        <div className="flex flex-col mt-5 ml-2 mr-2">
          {chats
            .filter((chat) => chat.section === selectedForm) // Filter messages based on selectedForm
            .map((chat) => (
              <div
                key={chat._id}
                className={`flex justify-${chat.messageFrom === 'admin' ? 'end' : 'start'} mb-4`}
              >
                <div className="relative max-w-xl px-4 py-2 text-white">
                  <div
                    className={`block relative ${
                      chat.messageFrom === 'admin' ? 'bg-blue-400' : 'bg-gray-400'
                    } px-4 py-2 rounded-lg`}
                  >
                    {chat.message}
                    <span className="text-xs text-gray-300 flex">
                      {formatTimestamp(chat.timestamp)}
                    </span>
                  </div>
                  <span
                    className={`absolute w-3 h-3 transform rotate-45 ${
                      chat.messageFrom === 'admin' ? 'bg-blue-400' : 'bg-gray-400'
                    } ${chat.messageFrom === 'admin' ? 'bottom-0 right-0 mr-1' : 'bottom-0 left-0 ml-1'}`}
                  ></span>
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
            className="w-full px-4 py-2 rounded bg-gray-300 focus:outline-none"
            placeholder="Enter message"
          />
          {/* No need for a submit button */}
        </form>
      </div>
      <style jsx="true">{`
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
