import React, { Component, useEffect } from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import StackOverflow from "./Components/StackOverflow";
import Question from "./Components/Add-Question/Question";
import ViewQuestion from "./Components/ViewQuestion";
import Auth from "./Components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./feature/userSlice";

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])


  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );


  return (
    <div className="App">
      
      <Router>
      <Header />
      <Switch>
           <Route exact path={user ? "/" : "/auth"}
           component = {user ? StackOverflow : Auth} />
            
            
            <PrivateRoute exact path="/add-question" component = {Question} />
            <PrivateRoute exact path="/question" component = {ViewQuestion}  />
            
            </Switch>
      </Router>
    </div>
  );
}

export default App;

