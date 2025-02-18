import {useState} from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export const ChatInput = ({ chatMessages, setChatMessages }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const saveInputText = (event) => {
    setInputText(event.target.value)
  }

  const sendMessage = async () => {
    
    if(isLoading || inputText==='') {
      return
    }
    
    setInputText('');
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages)

    setChatMessages([
      ...newChatMessages,
      {
        message: 'Thinking...',
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ])
    const response = await Chatbot.getResponseAsync(inputText);

    // setTimeout(()=>{          // },2000)
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(false)
  }
  

  const handleKeyDown = (e) => {
    if(e.key==='Enter'){
      sendMessage()
    }
    if(e.key==='Escape'){
      setInputText('')
    }
  }


  return (
    <>
      <div className='input-container'>
        <input
          type="text"
          placeholder="Send a message to ChatBot"
          size="30"
          onChange={saveInputText}
          onKeyDown={handleKeyDown}
          value={inputText}
          className='chat-input'
        />
        <button
        onClick={sendMessage}
        className='send-button'
        >Send</button>
      </div>
    </>
  )
}