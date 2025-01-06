import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import registerimage from '../assets/1-1024x580.webp'


function Loginpage() {

  const {loginUser} = useContext(AuthContext)
  const handleSubmit = e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)

    console.log(email)
    console.log(password)
   
  }

  return (
    <div>
      <>
  <section className="vh-100" style={{ backgroundColor: "#fff" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src={registerimage}
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem", minWidth:"100%", minHeight:"100%" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h2 fw-bold mb-0">Bienvenue ! 👋</span>
                      </div>
                    </div>
                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: 1 }}
                    >
                      Connectez vous
                    </h5>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example17"
                        className="form-control form-control-lg"
                        name='email'
                      />
                      <label className="form-label" htmlFor="form2Example17">
                        Adresse mail
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        name='password'
                      />
                      <label className="form-label" htmlFor="form2Example27">
                        Mot de passe
                      </label>
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <a className="small text-muted" href="#!">
                      Mot de passe oublié ?
                    </a>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Vous n'avez pas de compte?{" "}
                      <Link to="/register" style={{ color: "#393f81" }}>
                        Crée un compte maintenant
                      </Link>
                    </p>
                    <a href="#!" className="small text-muted">
                      Conditions d'utilisations
                    </a>
                    <a href="#!" className="small text-muted" style={{marginLeft:"5px"}}>
                        Politique de vie privée
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="bg-light text-center text-lg-start">
    <div
      className="text-center p-3"
      style={{ backgroundColor: "#f2f2f7" }}
    >
      © 2024 
      <a className="text-dark" href="" style={{marginLeft:"5px"}}> 
         Barathon
      </a>
    </div>
  </footer>
</>

    </div>
  )
}

export default Loginpage