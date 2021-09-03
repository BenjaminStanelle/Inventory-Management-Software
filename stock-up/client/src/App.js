import React, {useState} from 'react';
import './App.css';
import LoginForm from './components/LoginFrom'

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password:"123Qwe"
  }

  const [user, setUser] = useState({userName: "", password: ""});
  const[error, setError] = useState("");

  const Login = details => {
    console.log(details);
  }

  const Logout = () => {
    console.log("Logout");
  }
  return (
    <div className="App">
      {(user.email != "") ? (
        <div className = "welcome">
          <h2> Welcome, <span>{user.userName}</span></h2>
          <button>Logout</button>
          </div>
      ):(
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;
