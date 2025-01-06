import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
  };

  return (
    <div className="cookie-consent" style={{position:"fixed", bottom:"0", marginBottom:"10px", marginLeft:"10px", width: "30%", backgroundColor: "#f4f4f4", padding: "10px", textAlign: "left", borderRadius:"20px", padding:"2vh", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
      <p>
       En poursuivant sur le site vous acceptez que nous utilisons des cookies pour le fonctionnement du site. Vos données sont privées et ne sont pas partagées à des tiers.{" "}
        <a href={"/privacy-policy"}>En savoir plus.</a>
      </p>
      <button onClick={giveCookieConsent} className='btn' style={{backgroundColor:"#bbb"}}>
        J'accepte
      </button>
    </div>
  );
};

export default CookieConsent;
