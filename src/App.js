import React from 'react';
import './App.css';
import { Route, Routes , Navigate} from 'react-router-dom';
import HomePage from './Component/HomePage/HomePage';
import PostDetails from './Component/PostDetails/PostDetails';
import GetDetails from './Component/GetDetails/GetDetails';



function App() {
  return (
    <Routes>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/get' element={<GetDetails/>}></Route>
        <Route path='/post' element={<PostDetails/>}></Route>
        <Route path='/*' element={<Navigate to="/home"/>}></Route>
      </Routes>
  );
}

export default App;
