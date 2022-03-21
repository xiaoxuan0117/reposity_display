import Search from './Search';
import {Routes, Route} from 'react-router-dom'
import Users from './Result/Users';
import Repos from './Result/Repos';
import Repo from './Result/Repo';
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Search/>
      <Routes>
        <Route path='users' element={<Users/>}/>
        <Route path='users/:username/repos' element={<Repos/>}/>
        <Route path='users/:username/repos/:repo' element={<Repo/>}></Route>
      </Routes>
    </div>
  );
}
