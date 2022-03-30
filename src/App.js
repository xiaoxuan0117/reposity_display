import Search from './Search';
import {Routes, Route} from 'react-router-dom'
import Users from './Result/Users';
import FindNoUser from './Result/Users/FindNoUser';
import Repos from './Result/Repos';
import Repo from './Result/Repo';
import Start from './start';
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Search/>
      <div className='container'>
        <div className='row'>
          <Routes>
            <Route path='users' element={<Users/>}/>
            <Route path='findNoUser' element={<FindNoUser/>}/>
            <Route path='users/:username/repos' element={<Repos/>}/>
            <Route path='users/:username/repos/:repo' element={<Repo/>}/>
            <Route path="/" element={<Start/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
