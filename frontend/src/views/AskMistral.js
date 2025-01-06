import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import './style/AskMistral.css';
import deletesvg from '../assets/delete.svg';
const AskMistral = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('askMistralMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    localStorage.setItem('askMistralMessages', JSON.stringify(messages));
  }, [messages]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSendMessage = async () => {
    setQuestion('');
    if (question.trim()) {
      const newMessage = { question, answer: '', timestamp: new Date().toLocaleString(), fromUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        setLoading(true);
        setError(null);
        setIsTyping(true);

        const response = await axiosInstance.post('/ask-mistral/', {
          question,
          mode: selectedMode
        });

        if (response.status === 200) {
          const botResponse = { question: '', answer: response.data.answer, timestamp: new Date().toLocaleString(), fromUser: false };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          setQuestion('');
          setIsTyping(false);
        } else {
          setError('Une erreur s\'est produite lors du traitement de la requête.');
        }
      } catch (error) {
        setError('Une erreur s\'est produite lors de l\'envoi de la requête.');
      } finally {
        setLoading(false);
      }
    }
  };

  const defaultMode = 'passif';
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [selectedMode, setSelectedMode] = useState(defaultMode);

  const handleToggleModeMenu = () => {
    setShowModeMenu(!showModeMenu);
  };

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
  };

  const deleteChat = () => {
    // Clear messages state
    setMessages([]);
    // Clear local storage
    localStorage.removeItem('askMistralMessages');
  };

  return (
    <div className="ask-mistral-container">
      <h1 className='titlejob'>Posez votre question à JobBot</h1>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.fromUser ? 'user' : 'bot'}`}>
              <div className="message-content">
                <div className="message-text">{message.question}</div>
                {message.answer && <div className="message-text">JobBot: {message.answer}</div>}
              </div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span>JobBot est entrain d'écrire...</span>
            </div>
          )}
        </div>
      </div>
      <div className="chat-controls">
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Entrez votre question..."
          className="input-text"
        />
        <button onClick={handleSendMessage} disabled={loading || !question.trim()} className="send-button">Envoyer</button>
        <button onClick={handleToggleModeMenu} className="mode-button">
          {showModeMenu ? 'Fermer' : 'Voir les niveaux'}
        </button>
        <button onClick={deleteChat} className="mode-button">
          <img src={deletesvg} alt="Delete icon" className="delete-icon" />
        </button>
      </div>
      <div className={`modemenu ${showModeMenu ? '' : 'hidden'}`}>
        <label>
          <input
            type="radio"
            name="mode"
            value="passif"
            checked={selectedMode === 'passif'}
            onChange={() => handleSelectMode('passif')}
          />
          <span className={`buttonmodepassif ${selectedMode === 'passif' ? 'selected' : ''}`}>Neutre</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="neutre"
            checked={selectedMode === 'neutre'}
            onChange={() => handleSelectMode('neutre')}
          />
          <span className={`buttonmodeneutre ${selectedMode === 'neutre' ? 'selected' : ''}`}>Passif</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="agressif"
            checked={selectedMode === 'agressif'}
            onChange={() => handleSelectMode('agressif')}
          />
          <span className={`buttonmodeagressif ${selectedMode === 'agressif' ? 'selected' : ''}`}>Agressif</span>
        </label>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AskMistral;
