// App.js
import React from 'react';
import './App.css';
import ChatbotApp from './components/ChatbotApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Koottam Carnival</h1>
        <p>Join us for the celebration of culture and community!</p>
      </header>
      
      <main className="event-content">
        <section className="hero-section">
          <h2>Register for Koottam Carnival</h2>
          <p>Experience the magic of cultural unity</p>
          <button className="register-button">Register Now</button>
        </section>
        
        <section className="event-info">
          <h3>April 25-27, 2025</h3>
          <p>Join us for three days of music, dance, art, food, and workshops celebrating our cultural heritage.</p>
        </section>
      </main>
      
      {/* Add the Chatbot component here */}
      <ChatbotApp />
    </div>
  );
}

export default App;