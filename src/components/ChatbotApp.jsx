import React, { useState, useRef } from 'react';
import '../styles/ChatbotApp.css';

function ChatbotApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 How can I help you with the Koottam Carnival event today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = getBotReply(input.toLowerCase());
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: botReply }]);
      scrollToBottom();
    }, 600);

    setInput('');
    scrollToBottom();
  };

  const getBotReply = (message) => {
    const text = message.toLowerCase();
  
    if (
      text.includes('what is koottam') ||
      text.includes('koottam carnival') ||
      text.includes('about koottam')
    ) {
      return '🧡 **Koottam Carnival** is a vibrant community celebration organized by Volunteer for India. It’s a 3-day cultural festival focused on bringing people together through music, dance, art, food, and workshops. The word "Koottam" means “gathering” – and this carnival is all about unity, culture, and collective joy. Everyone’s welcome to participate, volunteer, and celebrate diversity!';
    }
    if (text.includes('register')) {
      return 'To register for Koottam Carnival, click the “Register Now” button on our homepage or scroll to the registration section. Limited spots available, so don’t miss out!';
    }
  
    if (text.includes('date') || text.includes('time')) {
      return '🗓️ The Koottam Carnival will take place from **April 25 to April 27, 2025**. Each day will begin around 10 AM and go on till evening.';
    }
  
    if (text.includes('location') || text.includes('venue')) {
      return '📍 The exact venue details will be shared soon. The carnival will be hosted across multiple vibrant community zones in the city to celebrate togetherness.';
    }
  
    if (text.includes('volunteer')) {
      return '🙏 Volunteers make it all happen! If you’d like to help, go to the registration section and choose “I want to volunteer.” You’ll receive an onboarding email with next steps.';
    }
  
    if (text.includes('event') || text.includes('activities') || text.includes('what will happen')) {
      return '🎉 Koottam Carnival is packed with vibrant activities like:\n• Music & dance performances\n• Art & cultural exhibitions\n• Interactive workshops\n• Community storytelling\n• Food & local stalls\n• Street parades\n• Open mic shows\nCome immerse yourself in a celebration of culture!';
    }
  
    if (text.includes('workshop') || text.includes('learn') || text.includes('skills')) {
      return '🎨 Explore creative workshops like mural painting, spoken word poetry, crafts, movement sessions, and more! Great for all ages and interests.';
    }
  
    if (text.includes('food') || text.includes('eat') || text.includes('cuisine')) {
      return '😋 You’ll find diverse food stalls offering regional delicacies, fusion treats, and sustainable eats. It’s a true flavor fest!';
    }
  
    if (text.includes('ticket') || text.includes('cost') || text.includes('price')) {
      return '🎟️ Entry to Koottam Carnival is **completely free**. Some special workshops may have small material fees.';
    }
  
    if (text.includes('children') || text.includes('kids') || text.includes('family')) {
      return '👨‍👩‍👧‍👦 The carnival is **super family-friendly**! Kids can enjoy storytelling corners, playful workshops, and community art zones.';
    }
  
    if (text.includes('dress') || text.includes('attire')) {
      return '👕 No strict dress code – but feel free to wear cultural or festive attire to vibe with the celebration! Comfort is key.';
    }
  
    if (text.includes('theme')) {
      return '🎭 The theme of Koottam Carnival is **“Community. Culture. Celebration.”** It’s about inclusivity, joy, and shared creativity across India’s diverse cultures.';
    }
  
    if (text.includes('history') || text.includes('origin') || text.includes('why')) {
      return '🧡 Koottam Carnival is an initiative by Volunteer for India to bring communities together through art, culture, and volunteerism. It’s a grassroots movement powered by YOU!';
    }
  
    if (text.includes('contact') || text.includes('support') || text.includes('help')) {
      return '📧 For support or questions, email us at **koottam@volunteerforindia.com**, or use the contact form on our website.';
    }
  
    return '🤔 I’m not sure I got that. Try asking about registration, event dates, venue, volunteering, workshops, or food!';
  };
  

  return (
    <div className="chatbot-container">
      <button
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>💬</span>
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <img src="/logo192.png" alt="Bot" className="header-logo" />
            <div className="header-text">
              <h3>Koottam Bot</h3>
              <p>Ask me anything!</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === 'bot' ? 'bot-message' : 'user-message'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSend}>
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatbotApp;
