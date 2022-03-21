import Search from './Search';
import {Routes, Route} from 'react-router-dom'
import Users from './Result/Users';

export default function App() {
  return (
    <div className="App">
      <Search/>
      <Routes>
        <Route path='users' element={<Users/>}/>
        <Route></Route>
        <Route></Route>
      </Routes>
    </div>
  );
}
