import React, { useState, useEffect } from 'react';
import WeaveDB from 'weavedb-sdk';
import { BsFillTelephoneFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

const ChatWindow = ({ activeChat }) => {
  const router = useRouter();
  const [db, setDb] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const initDB = async () => {
      const contractTxId = 'DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames'; // Replace with your actual contract ID
      const weavedb = new WeaveDB({ contractTxId });
      await weavedb.init();
      setDb(weavedb);
    };
    initDB();
  }, []);

  const sendMessage = async () => {
    if (!db || !newMessage.trim()) return;

    const message = {
      text: newMessage,
      sender: 'user', // You might want to use a real user ID here
      timestamp: new Date().toISOString(),
    };

    try {
      await db.add(message, 'anavheoba');
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    if (!db) return;

    try {
      const result = await db.get('anavheoba', ['timestamp', 'desc']);
      setMessages(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (db) {
      fetchMessages();
      // Set up polling for updates
      const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [db]);

  const handleCallClick = () => {
    router.push('/Call');
  };

  const handleVideoClick = () => {
    router.push('/Video');
  };

  if (!activeChat) {
    return (
      <div className="w-3/4 flex items-center justify-center">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col">
      {/* Header */}
      <div className="p-5 bg-gray-800 border-b border-purple-600 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-white">{activeChat.name}</h3>
          <p className="text-sm text-pink-400">{activeChat.specialization}</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors"
            onClick={handleCallClick}
          >
            <BsFillTelephoneFill className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors"
            onClick={handleVideoClick}
          >
            <BsFillCameraVideoFill className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 bg-gray-900 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                message.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 p-5 bg-gray-800">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="w-full p-3 border border-purple-600 rounded-lg bg-gray-700 text-white"
        />
        <button
          onClick={sendMessage}
          className="mt-2 p-2 bg-pink-500 text-white rounded-md hover:bg-pink-400 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;