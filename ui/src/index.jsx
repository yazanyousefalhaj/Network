import React from 'react'
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthPage } from "./pages/auth.jsx";
import { ProvideAuth } from './authContext.jsx'
import { NavBar } from './components/NavBar.jsx'
import { HomePage } from "./pages/home.jsx";
import { ProfilePage } from './pages/profile.jsx';
import { FollowingPage } from './pages/following.jsx';
import "./styles/main.css"


const queryClient = new QueryClient()


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <Router>
          <NavBar />

          <Switch>
            <Route exact path={`/login/`} component={AuthPage} />
            <Route exact path="/profile/:id" component={ProfilePage} />
            <Route exact path="/following/" component={FollowingPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
      </ProvideAuth>
    </QueryClientProvider>
  )
}


ReactDOM.render(<App />, document.getElementById("app"))
