import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));

    return () => {
    unsubscribe();
    }
  }, []);
  return (
    <div className="App">
      <Header user={user} />
      <Main user={user}/>
    </div>
  );
}

export default App;
