import './App.css';
import { useState } from 'react';
import Register from './components/register/Register';
import Login from './components/login/Login';
function App() {
  const [displayPage, setDisplayPage] = useState(null);
  const [user, setUser] = useState(null);

  function setUserDetails(userDetails) {
    setUser(userDetails);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={() => { user !== null ? setDisplayPage("Home") : setDisplayPage(null); }}>Auth-App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {user == null ? <>
              <a className="nav-link" href="#" onClick={(e) => setDisplayPage("Login")}>Login</a>
              <a className="nav-link" href="#" onClick={(e) => setDisplayPage("Register")}>Register</a>
            </> : <>
              <a className="nav-link" href="#" onClick={(e) => { setUser(null); setDisplayPage(null) }}>Logout</a>
            </>}
          </div>
        </div>
      </nav>
      <div className="App">
        {displayPage === "Register" && <Register navigateTo={(page) => setDisplayPage(page)} />}
        {displayPage === "Login" && <Login navigateTo={(page) => setDisplayPage(page)} setUserDetails={setUserDetails} />}
        {displayPage === "Home" && <>
          <h4 className='text-center'>
            Hello {user.name} !
          </h4>
        </>}
        {displayPage === null && <>
          <h4 className='text-center'>
            Login to View Content
          </h4>
        </>}

      </div>
    </>
  );
}

export default App;
