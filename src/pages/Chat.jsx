// src/pages/chat.js
import React from 'react';
import ChatLayout from '@/components/ChatLayout/ChatLayout';
import { useRouter } from 'next/router';

export default function ChatPage() {
  const router = useRouter();

  const handleCallClick = () => {
    router.push('/Call');
  };

  return (
    <div>
      <ChatLayout />
      {/* Example button to initiate a call */}
      <button
        className="p-4 bg-primary-blue text-white rounded-full hover:bg-primary-dark"
        onClick={handleCallClick}
      >
        Start Call
      </button>
    </div>
  );
}
