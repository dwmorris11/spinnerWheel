import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../utils/common';
 
function Register({ history }) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const email = useFormInput('');
  const [error, setError] = useState(null);
 
  // handle button click of login form
  const handleRegister = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/register', { username: username.value, password: password.value, email: email.value })
    .then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.username);
      history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401 || error.response.status === 400) setError(error.response.data);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <div>
      Register<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="username" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Email<br />
        <input type="text" {...email} autoComplete="email" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
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
 
export default Register;