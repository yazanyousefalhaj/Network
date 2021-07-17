import React from 'react'
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthPage } from "./pages/auth";
import { ProvideAuth } from './authContext'
import { NavBar } from './components/NavBar'
import { HomePage } from "./pages/home";
import { ProfilePage } from './pages/profile';
import { FollowingPage } from './pages/following';
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
