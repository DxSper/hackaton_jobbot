import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function PrivacyPolicy() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // 100% de la hauteur de la fenêtre
  };

  const contentStyle = {
    margin: '20px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '800px' // Pour éviter que le contenu soit trop large
  };

  const titleStyle = {
    fontSize: '2em',
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  const headingStyle = {
    fontSize: '1.5em',
    color: '#444',
    marginTop: '20px',
    marginBottom: '10px'
  };

  const textStyle = {
    fontSize: '1em',
    color: '#666',
    lineHeight: '1.6'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Politique de confidentialité</h1>
        <p style={textStyle}>Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site.</p>
        <h2 style={headingStyle}>Collecte des informations</h2>
        <p style={textStyle}>Nous collectons des informations personnelles telles que votre nom, adresse e-mail et autres données que vous choisissez de nous fournir lors de l'utilisation de notre site. Nous ne stockons pas les messages que vous avez avec JobBot sauf si vous decidez de les partager avec un membre du site via l'option "partager". Les historiques de conversations avec l'IA sont stocké sur votre navigateur nous avons pas acces a vos messages avec l'IA.</p>
        <h2 style={headingStyle}>Utilisation des informations</h2>
        <p style={textStyle}>Les informations que nous collectons sont utilisées dans le but de vous fournir des services personnalisés, d'améliorer notre site et de répondre à vos demandes.</p>
        <h2 style={headingStyle}>Protection des données</h2>
        <p style={textStyle}>Nous mettons en place des mesures de sécurité pour protéger vos informations personnelles contre tout accès non autorisé ou toute divulgation.</p>
        <h2 style={headingStyle}>Consentement</h2>
        <p style={textStyle}>En utilisant notre site, vous consentez à notre politique de confidentialité et à la collecte et l'utilisation de vos informations telles que décrites ici.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
