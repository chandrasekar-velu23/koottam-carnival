// src/components/ChatbotApp.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatbotApp.css';
// Import a default chatbot icon if you don't have a logo yet
// You can replace this with your actual logo later

function ChatbotApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Koottam Carnival! How can I help you with your registration?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventInterest: '',
    registrationComplete: false
  });
  const [currentStep, setCurrentStep] = useState('welcome');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const processRegistration = async () => {
    try {
      // This is where you'd integrate with Google Sheets API
      // For now, we'll simulate a successful registration
      setTimeout(() => {
        addMessage("Thank you for registering for Koottam Carnival! We've received your information and will send you confirmation details shortly.", 'bot');
        setFormData({...formData, registrationComplete: true});
        setCurrentStep('complete');
      }, 1500);
      
      // Uncomment and update when you have your Google Sheets API ready
      /*
      const response = await fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        addMessage("Thank you for registering for Koottam Carnival! We've received your information and will send you confirmation details shortly.", 'bot');
        setFormData({...formData, registrationComplete: true});
        setCurrentStep('complete');
      } else {
        addMessage("There was an issue with your registration. Please try again or contact us directly at info@koottamcarnival.com", 'bot');
      }
      */
    } catch (error) {
      addMessage("Sorry, we encountered an error. Please try again later or email us at info@koottamcarnival.com", 'bot');
    }
  };

  const handleNextStep = (userInput) => {
    switch(currentStep) {
      case 'welcome':
        addMessage("Great! To register for Koottam Carnival, I'll need some information. What's your full name?", 'bot');
        setCurrentStep('name');
        break;
      case 'name':
        setFormData({...formData, name: userInput});
        addMessage("Thanks, " + userInput + "! What's your email address?", 'bot');
        setCurrentStep('email');
        break;
      case 'email':
        // Basic email validation
        if (userInput.includes('@') && userInput.includes('.')) {
          setFormData({...formData, email: userInput});
          addMessage("Great! Now, what's your phone number?", 'bot');
          setCurrentStep('phone');
        } else {
          addMessage("That doesn't look like a valid email. Please provide a valid email address.", 'bot');
        }
        break;
      case 'phone':
        setFormData({...formData, phone: userInput});
        addMessage("Which events at Koottam Carnival are you most interested in? (Music, Dance, Art, Food, Workshops, or All)", 'bot');
        setCurrentStep('events');
        break;
      case 'events':
        setFormData({...formData, eventInterest: userInput});
        addMessage(`Thank you for your information! Let me confirm:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Interested in: ${userInput}

Is this correct? (Yes/No)`, 'bot');
        setCurrentStep('confirm');
        break;
      case 'confirm':
        if (userInput.toLowerCase() === 'yes' || userInput.toLowerCase() === 'y') {
          addMessage("Processing your registration...", 'bot');
          processRegistration();
        } else {
          addMessage("Let's restart. What's your full name?", 'bot');
          setCurrentStep('name');
        }
        break;
      case 'complete':
        addMessage("Is there anything else you'd like to know about Koottam Carnival?", 'bot');
        break;
      default:
        addMessage("I'm here to help you register for Koottam Carnival. Do you want to start registration?", 'bot');
        setCurrentStep('welcome');
    }
  };

  const addMessage = (text, sender) => {
    setMessages(prevMessages => [...prevMessages, { text, sender }]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    addMessage(input, 'user');
    handleNextStep(input);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      {/* Chat toggle button */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
      >
        {isOpen ? (
          <span>&times;</span>
        ) : (
          <div className="chat-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-logo">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <div className="header-text">
              <h3>Koottam Carnival Assistant</h3>
              <p>Registration Bot</p>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatbotApp;
