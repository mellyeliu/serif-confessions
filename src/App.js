import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import PageLayout from './Components/PageLayout';
import './Fonts/Fonts.css';
import './PageLayout.css';
import NavHeader from './Components/NavHeader';


function App() {
  return (
    <div className="App">
      <NavHeader />
      <Header />
      <PageLayout />
      {/* <header className="App-header">

      </header> */}
    </div>
  );
}

export default App;
