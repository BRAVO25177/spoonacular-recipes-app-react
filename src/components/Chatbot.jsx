import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const botMessage = { role: 'bot', content: response.data.choices[0].message.content };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
    }

    setInput('');
  };

  return (
    <ChatContainer>
      <ChatWindow>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role}>
            {msg.content}
          </Message>
        ))}
      </ChatWindow>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ role }) => (role === 'user' ? '#007bff' : '#e9ecef')};
  color: ${({ role }) => (role === 'user' ? '#fff' : '#000')};
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

export default Chatbot;