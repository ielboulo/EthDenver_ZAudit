// Assuming you're using a .tsx extension for TypeScript files

import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import React from 'react'; // Import React (might be optional depending on your setup)

// Define a type for the props
interface ChatIconProps {
  onClick: () => void; // Defines onClick as a function that returns nothing
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white hover:bg-primary-dark">
      <ChatBubbleLeftIcon className="h-5 w-5" />
    </button>
  );
};

export default ChatIcon;