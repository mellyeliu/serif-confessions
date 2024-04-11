import logo from './logo.svg';
import './App.css';
import StoryHome from './Components/StoryHome';
import StoryList from './Components/StoryList';
import './Fonts/Fonts.css';
import './PageLayout.css';
import NavHeader from './Components/NavHeader';


function App() {
  return (
    <div className="App">
      <NavHeader />
      <StoryHome />
      <StoryList />
      {/* <header className="App-header">

      </header> */}
    </div>
  );
}

export default App;
