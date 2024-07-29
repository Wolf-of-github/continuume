import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Messages() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/message/userlist');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      throw new Error('Error fetching users:');
    }
  };

  const fetchMessages = async (selectedUser) => {
    try {
      const response = await fetch('/api/message/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1: currentUser.username, user2: selectedUser }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  // Function to handle sending the message
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (!messageInput.trim()) return; // Prevent sending empty messages
    setSendingMessage(true);

    try {
      const response = await fetch('api/message/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user1:currentUser.username,
          user2: selectedUser,
          sender: currentUser.username,
          content: messageInput
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessageInput('');
      await fetchMessages(selectedUser);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString()}`;
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const renderMessage = (message) => {
    const isCurrentUser = message.sender === currentUser.username;

    return (
      <div key={message._id} className={`flex justify-${isCurrentUser ? 'end' : 'start'} mb-4`}>
        <div className="relative max-w-xl px-4 py-2 text-black">
          <div
            className={`block text-xl relative ${isCurrentUser ? 'bg-indigo-500' : 'bg-gray-200'} px-4 py-2 rounded-lg`}
          >
            {message.content}
            <span className="text-black flex text-xs">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          <span
            className={`absolute w-3 h-3 transform rotate-45 ${isCurrentUser ? 'bg-indigo-500' : 'bg-gray-200'} ${isCurrentUser ? 'bottom-0 right-0 mr-1' : 'bottom-0 left-0 ml-1'}`}
          ></span>
        </div>
      </div>
    );
  };

  const handleUserSelect = (username) => {
    setSelectedUser(username);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  


  return (
    <div className="h-screen flex overflow-hidden text-sm">
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="flex-grow flex overflow-x-hidden">
          <div className="w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-300 h-full overflow-y-auto lg:block hidden p-5">
            <div className="text-xs text-gray-400 tracking-wider">USERS</div>

            <div className="relative mt-2">
              <input
                type="text"
                className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 w-full rounded-md text-sm"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
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
              {filteredUsers.map((user) => (
                <button key={user.username} className={`p-3 w-full flex flex-col rounded-md dark:bg-gray-200 shadow ${user.username === selectedUser && 'border-2 border-indigo-300'}`}>
                  <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full" onClick={() => handleUserSelect(user.username)}>
                    <img src={user.avatar} className="w-7 h-7 mr-2 rounded-full" alt="profile picture" />
                    {user.fullname}
                  </div>
                  <div className="flex items-center w-full overflow-hidden">
                    <div className="text-xs py-1 px-2 leading-none bg-indigo-500 text-white rounded-md">{user.role}</div>
                    <div className="ml-auto text-xs text-gray-500">{user.username}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto">
            <div className="w-full flex flex-col h-screen max-h-screen overflow-hidden">
              <div className="messages flex-1 overflow-y-scroll border-box">
                {
                  messages != null ? (
                    messages.length > 0 ? (
                      Object.entries(groupMessagesByDate(messages)).map(([date, messages]) => (
                        <div key={date}>
                          <div className="date-separator text-center text-gray-400 my-4">{date}</div>
                          {messages.map(renderMessage)}
                        </div>
                      ))
                    ) : (
                      <div className='h-full flex items-center justify-center'>
                        <p className='text-lg text-gray-400'>Start a conversation</p>
                      </div>
                    )
                  ) : (
                    <div className='h-full flex items-center justify-center'>
                      <p className='text-lg text-gray-400'>Please select chat</p>
                    </div>
                  )
                }
              </div>
              <form className="message-input bg-gray-100 p-4 flex flex-row" onSubmit={handleSendMessage}>
                <input
                  className="flex-1 p-2 rounded"
                  type="text"
                  value={messageInput}
                  onChange={handleInputChange}
                  disabled={sendingMessage}
                />
                <button
                  className="w-16 border-2 bg-gray-200"
                  type="submit"
                  disabled={sendingMessage}
                >
                  {sendingMessage ? 'Sending' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
