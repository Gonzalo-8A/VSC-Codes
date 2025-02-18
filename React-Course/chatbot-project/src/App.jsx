import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(
    [
  // {
  //   message: 'hello chatbot',
  //   sender: 'user',
  //   id: crypto.randomUUID()
  // }, {
  //   message: 'Hello! How can I help you?',
  //   sender: 'robot',
  //   id: crypto.randomUUID()
  // }, {
  //   message: 'Can you get me todays date?',
  //   sender: 'user',
  //   id: crypto.randomUUID()
  // }, {
  //   message: 'Sure! Today is September 27',
  //   sender: 'robot',
  //   id: crypto.randomUUID()
  // }
]
  );
  
  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
