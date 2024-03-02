import React, { useState } from 'react';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

interface FunctionData {
  id: number;
  contractAddress: string;
  name: string;
  securityLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  details: string;
}

const mockedFunctions: FunctionData[] = [
  {
    id: 1,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: 'transferFrom',
    securityLevel: 'Medium',
    details: 'This function exposes user data without proper authentication checks.',
  },
  // Add more functions as needed for the demonstration
];

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
  
      setTimeout(() => {
        let response = "I'm here to help with your security inquiries. You can ask me about specific functions, their security levels, or details.";
  
        // Simple pattern matching: Check if the user's message contains specific keywords
        if (message.toLowerCase().includes("restake")) {
            response = "The restake function has a threat level of Low.\n\nDetails: While this function includes basic checks, it does not verify the new email address against a known list of malicious domains, which could lead to phishing attacks.";
        } else if (message.toLowerCase().includes("security")) {
          response = "To improve security, regularly audit your smart contracts, adhere to best practices in development, and ensure thorough testing.";
        }
  
        setMessages(messages => [...messages, { text: response, sender: 'bot' }]);
      }, 1000);
    }
  };
  
  
  
  
  
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 mb-16 mr-4 max-w-xs w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">ZTrust Chat</h3>
        <button onClick={onClose} className="text-sm text-gray-600 dark:text-gray-400">Close</button>
      </div>
      <ul className="overflow-auto p-4 h-64">
        {messages.map((msg, index) => (
          <li key={index} className={`p-2 rounded-lg m-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800'} ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            {msg.text}
          </li>
        ))}
      </ul>
      <div className="p-4 border-t dark:border-gray-700">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyDown={sendMessage}
          placeholder="Type your message here..."
          className="input input-bordered w-full dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

export default ChatBot;