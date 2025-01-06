import React from 'react'
import { useCookies } from 'react-cookie';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './views/Dashboard'
import Navbar from './views/Navbar'
import Todo from './views/Todo'
import Message from './views/Message'
import MessageDetail from './views/MessageDetail'
import SearchUsers from './views/SearchUsers'
import AskMistral from './views/AskMistral'
import CookieConsent from './components/Cookieconsent'
import PrivacyPolicy from './views/Privacy';
function App() {
  const [cookies] = useCookies(["cookieConsent"]);
  return (
    <Router>
      <AuthProvider>
        < Navbar/>
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" exact />
          <Route component={Homepage} path="/" exact />
          <Route component={Todo} path="/todo" exact />
          <Route component={Message} path="/inbox" exact />
          <Route component={MessageDetail} path="/inbox/:id" exact />
          <Route component={SearchUsers} path="/search/:username" exact />
          <Route component={AskMistral} path="/ask-mistral" exact />
          <Route path="/privacy-policy" component={PrivacyPolicy}/>
        </Switch>
      </AuthProvider>
      
      {!cookies.cookieConsent && <CookieConsent />}
    </Router>
  )
}

export default App