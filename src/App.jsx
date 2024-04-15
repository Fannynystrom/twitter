import { useState } from 'react';
import './App.css';

function App() {
  // Skapar en state-variabel för att hålla användarnamnet och lösenordet
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Funktion som hanterar inloggningen när formuläret skickas
  const handleLogin = (event) => {
    event.preventDefault();  // Förhindrar sidan från att ladda om
    console.log("Användarnamn:", username, "Lösenord:", password);
    // Här kan du lägga till logik för att verifiera användaren
  };

  return (
    <div className='app-container'>
      <img className='logo' src="img/twitter.logo.png" alt="Twitter logotyp" />
      <form className='login-form' onSubmit={handleLogin}>
        <label>
          Användarnamn:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ange ditt användarnamn"
          />
        </label>
        <label>
          Lösenord:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ange ditt lösenord"
          />
        </label>
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}

export default App;

