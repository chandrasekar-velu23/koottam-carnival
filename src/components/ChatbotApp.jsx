import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatbotApp.css';

function ChatbotApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Koottam Carnival! How can I help you with your registration or event information?", sender: 'bot' }
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
      addMessage("Processing your registration...", 'bot');
      
      setTimeout(() => {
        addMessage("Thank you for registering for Koottam Carnival! We've received your information and will send you confirmation details shortly to " + formData.email, 'bot');
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

  const getEventInfo = (query) => {
    const text = query.toLowerCase();
    
    if (text.includes('date') || text.includes('when')) {
      return '🗓️ The Koottam Carnival will take place from April 25 to April 27, 2025. Each day will begin around 10 AM and continue until 9 PM.';
    }
    
    if (text.includes('location') || text.includes('where') || text.includes('venue')) {
      return '📍 The carnival will be hosted at Community Cultural Center, 123 Festival Plaza. It\'s easily accessible by public transportation and has ample parking.';
    }
    
    if (text.includes('event') || text.includes('activities') || text.includes('program')) {
      return '🎉 Koottam Carnival features:\n• Music & dance performances\n• Art & cultural exhibitions\n• Interactive workshops\n• Community storytelling\n• Food & local stalls\n• Street parades\n• Open mic shows';
    }
    
    if (text.includes('food') || text.includes('eat')) {
      return '😋 You\'ll find diverse food stalls offering regional delicacies, fusion treats, and sustainable eats. Food vendors will be available throughout the event hours!';
    }
    
    if (text.includes('ticket') || text.includes('cost') || text.includes('price') || text.includes('fee')) {
      return '🎟️ Entry to Koottam Carnival is completely free! Some special workshops may have small material fees that will be collected on-site.';
    }
    
    if (text.includes('volunteer')) {
      return '🙏 We\'d love your help! Volunteers are essential to making this event successful. During registration, you can indicate your interest in volunteering, and our team will reach out with more details.';
    }
    
    if (text.includes('about') || text.includes('what is koottam')) {
      return '🧡 Koottam Carnival is a vibrant community celebration organized by Volunteer for India. It\'s a 3-day cultural festival focused on bringing people together through music, dance, art, food, and workshops. The word "Koottam" means "gathering" in Tamil – this carnival is all about unity, culture, and collective joy!';
    }
    
    return null;
  };

  const handleNextStep = (userInput) => {
    // First check if the user is asking for event information instead of registering
    const eventInfo = getEventInfo(userInput);
    
    // If we're in welcome state or complete state, check for general questions
    if ((currentStep === 'welcome' || currentStep === 'complete') && eventInfo) {
      addMessage(eventInfo, 'bot');
      
      if (currentStep === 'welcome') {
        setTimeout(() => {
          addMessage("Would you like to register for the event now? (Yes/No)", 'bot');
        }, 1000);
      }
      return;
    }
    
    // Handle registration flow
    switch(currentStep) {
      case 'welcome':
        if (userInput.toLowerCase().includes('yes') || 
            userInput.toLowerCase().includes('register') || 
            userInput.toLowerCase().includes('sign up')) {
          addMessage("Great! To register for Koottam Carnival, I'll need some information. What's your full name?", 'bot');
          setCurrentStep('name');
        } else if (userInput.toLowerCase().includes('no')) {
          addMessage("No problem! Feel free to ask me any questions about Koottam Carnival, or let me know if you change your mind about registering.", 'bot');
        } else {
          addMessage("I'm here to help you register for Koottam Carnival or answer any questions about the event. Would you like to register now? (Yes/No)", 'bot');
        }
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
          processRegistration();
        } else {
          addMessage("Let's restart. What's your full name?", 'bot');
          setCurrentStep('name');
        }
        break;
      case 'complete':
        if (userInput.toLowerCase().includes('yes') || 
            userInput.toLowerCase().includes('more info') ||
            userInput.toLowerCase().includes('question')) {
          addMessage("What would you like to know about Koottam Carnival? You can ask about dates, venue, activities, food, or tickets.", 'bot');
        } else if (userInput.toLowerCase().includes('no') || 
                  userInput.toLowerCase().includes('goodbye') || 
                  userInput.toLowerCase().includes('bye')) {
          addMessage("Thank you for registering! We look forward to seeing you at Koottam Carnival. Have a great day!", 'bot');
        } else {
          const eventResponse = getEventInfo(userInput);
          if (eventResponse) {
            addMessage(eventResponse, 'bot');
          } else {
            addMessage("Is there anything else you'd like to know about Koottam Carnival?", 'bot');
          }
        }
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
              <p>Registration & Information</p>
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
