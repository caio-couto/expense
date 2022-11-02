import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProjects from './components/pages/NewProjects';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass='min_height'>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/company' element={<Company/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/newprojects' element={<NewProjects/>}></Route>
          <Route path='/projects/:id' element={<Project/>}></Route>
        </Routes>
      </Container>
      <Footer></Footer>
    </Router>
  );
}

export default App;
