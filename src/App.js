import Header from './components/Header/index.tsx';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Register from './pages/Register/index';
import Songs from './pages/Songs/index.tsx';
import Song from './pages/Song/index.tsx';
import Update from './pages/Update/index';

const appStyle = {
  paddingBottom: '20px',
};

function App() {
  return (
    <BrowserRouter>
      <div style={appStyle}>
        <Header />
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/songs/edit/:slug'>
            <Update />
          </Route>
          <Route path='/songs/:slug'>
            <Song />
          </Route>
          <Route path='/songs'>
            <Songs />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
