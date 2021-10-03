import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://api.getcountapp.com/api/v1/authenticate', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Popunite oba polja");
    });
  }
const mystyle = {
      color: "white",
      backgroundColor: "rgb(152,152,152)",
      fontFamily: "Arial",
      margin: "auto",
      width: "40%",
      border: "5px solid rgb(220,220,220)",
      padding: "10px",
      textAlign:"center", 
      height:"300px",
      borderRadius:"14px",

    }
 
    return (
      <div style={mystyle} id="formContent" className="wrapper fadeInDown col-md-6 col-md-offset-3">
      
      <h3>Login</h3><br />
      <div>
        Username: <br />
        <input type="text" style={{textAlign:"center"}} placeholder="Enter email" className="form-control" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password: <br />
        <input type="password" placeholder="Enter password" style={{textAlign:"center"}} className="form-control" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <button className="btn btn-success btn-sm" onClick={handleLogin} disabled={loading}>Login</button><br />
    </div>
    
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;