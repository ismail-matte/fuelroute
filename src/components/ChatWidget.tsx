'use client';

import { useState, useEffect, useRef } from 'react';
import { getChatResponse, sendEmailInquiry, saveChatHistory, loadChatHistory, type ChatMessage } from '../lib/chatbot';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history
    const history = loadChatHistory();
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Welcome message
      setMessages([{
        id: '1',
        role: 'assistant',
        content: 'Hi! 👋 I\'m your FuelRoute assistant. Ask me anything about using the app, fuel calculations, or our features!',
        timestamp: Date.now(),
      }]);
    }
  }, []);

  useEffect(() => {
    // Save chat history whenever messages change
    if (messages.length > 1) {
      saveChatHistory(messages);
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(inputValue);
      
      setMessages(prev => [...prev, response]);
      
      if (response.needsHumanReview) {
        setShowEmailForm(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or email us at info@tech-center.com',
        timestamp: Date.now(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!userEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) return;

    const success = await sendEmailInquiry(userEmail, lastUserMessage.content, messages);
    
    if (success) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Thank you! We've received your inquiry and will respond to ${userEmail} within 24 hours. 📧`,
        timestamp: Date.now(),
      }]);
      setShowEmailForm(false);
      setUserEmail('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button 
          className="chat-widget-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
          </svg>
          <span className="chat-widget-badge">{messages.length > 1 ? messages.length - 1 : ''}</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-header-content">
              <div className="chat-widget-avatar">🤖</div>
              <div>
                <div className="chat-widget-title">FuelRoute Assistant</div>
                <div className="chat-widget-status">Online • Instant replies</div>
              </div>
            </div>
            <button 
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chat-widget-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`chat-message ${message.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}
              >
                {message.role === 'assistant' && (
                  <div className="chat-message-avatar">🤖</div>
                )}
                <div className="chat-message-content">
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="chat-message-avatar">👤</div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-message-avatar">🤖</div>
                <div className="chat-message-content">
                  <div className="chat-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Email Form */}
          {showEmailForm && (
            <div className="chat-email-form">
              <p>Please provide your email for a detailed response:</p>
              <input 
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your@email.com"
                className="chat-email-input"
              />
              <button 
                onClick={handleEmailSubmit}
                className="chat-email-submit"
              >
                Submit
              </button>
            </div>
          )}

          {/* Input */}
          <div className="chat-widget-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="chat-widget-textarea"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="chat-widget-send"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="chat-widget-quick-actions">
            <button onClick={() => setInputValue('How to use FuelRoute?')}>How to use?</button>
            <button onClick={() => setInputValue('Is it free?')}>Is it free?</button>
            <button onClick={() => setInputValue('Contact support')}>Contact</button>
          </div>
        </div>
      )}
    </>
  );
}
