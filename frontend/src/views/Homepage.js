import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div>
      <>
  <main role="madin" style={{ marginTop: 50 }}>
    {/* Main jumbotron for a primary marketing message or call to action */}
    <div className="jumbotron" style={{backgroundColor:"#fff"}}>
      <div className="container" style={{backgroundColor:"#f4f4f4", borderRadius:"20px", padding:"2vh", backdropFilter:"blur(50px)"}}>
        <h1 className="display-3 titlejob" style={{marginTop:"3px"}}>JobBot</h1>
          <p>
            Le personnel militaire peut bénéficier d'une formation pour se réintegré efficacement dans le monde professionnel civil avec les systèmes d'intelligence artificielle.
          </p>
        </div>
    </div>
    <div className="container">
      {/* Example row of columns */}
      <div className="row">
        <div className="col-md-4">
          <h2>Messagerie instantané</h2>
          <p>
          Sur le site JobBot, une plateforme d'aide à la reconversion professionnelle pour les militaires, il existe une fonctionnalité de messagerie entre membres qui permet aux utilisateurs de communiquer et d'échanger des informations de manière privée. Cette fonction de messagerie offre aux membres la possibilité de discuter de leurs expériences, de poser des questions, de partager des conseils et des ressources, et de se soutenir mutuellement dans leur transition vers le monde professionnel civil.{" "}
          </p>
          <p>
            <a className="btn btn-secondary" href="Register" role="button">
              ✅ Inscrivez-vous !
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>Discussion avec une IA</h2>
          <p>
          JobBot guide les militaires à travers des discussions interactives, les aidant à explorer des opportunités de carrière, à acquérir de nouvelles compétences, à rédiger des CV et lettres de motivation adaptés au secteur civil, et à se préparer aux entretiens d'embauche. Grâce à JobBot, les militaires en reconversion peuvent bénéficier d'un soutien personnalisé et d'outils pratiques pour réussir leur transition professionnelle avec succès.{" "}
          </p>
          <p>
            <a className="btn btn-secondary" href="#" role="button">
              🔐 Vos données sont protégés
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>Différente difficulté</h2>
          <p>
          Dans le rôle d'examinateur lors d'entretiens d'embauche, l'IA, représentée par JobBot, peut adopter une approche plus stricte en termes d'échanges avec le candidat. En fonction du niveau de difficulté choisi par le militaire.{" "}
          </p>
          <p>
            <a className="btn btn-secondary" href="#" role="button">
              🎯 Adaptabilité personnalisée
            </a>
          </p>
        </div>
      </div>
      <hr />
    </div>{" "}
    {/* /container */}
  </main>
  <footer className="container">
    <p>© Barathon 2024</p>
    <a href="/privacy-policy" role='button'>Politque de vie privée</a>
  </footer>
</>


    </div>
  )
}

export default Homepage