// src/components/ChatSidebar.js
import React from 'react';

const contacts = [
  { id: 1, name: 'Dr. Jessica Anavheoba', specialization: 'Gynaecologist' },
  { id: 2, name: 'Dr. Abraham Anavheoba', specialization: 'Cardiovascular Surgeon' },
  { id: 3, name: 'Dr. Joshua Anavheoba', specialization: 'Neuro Surgeon' },
  // Add more contacts here
];

const ChatSidebar = ({ setActiveChat }) => {
  return (
    <div className="w-1/4 bg-gray-100 dark:bg-gradient-to-b from-purple-900 to-pink-500 p-5 border-r border-gray-200 dark:border-pink-500">
      <h3 className="text-lg font-medium mb-4 text-purple-900 dark:text-white">Contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="cursor-pointer p-2 mb-2 border-b border-gray-200 dark:border-pink-300"
            onClick={() => setActiveChat(contact)}
          >
            <p className="font-semibold dark:text-white">{contact.name}</p>
            <p className="text-sm text-gray-500 dark:text-pink-200">
              {contact.specialization}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;

