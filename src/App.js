import './App.css';

import Header from './components/template/Header';
import Banner from './components/template/Banner';
import Content from './components/template/Content';
import Modal from './components/template/Modal';
import CreateUserForm from './components/CreateUserForm';
import LoginUserForm from './components/LoginUserForm';


function App() {
  return (
    <div className="App">
      {/* <Modal title="Increva-se">
        <CreateUserForm />
      </Modal> */}
      {/* <Modal title="Entrar">
        <LoginUserForm />
      </Modal> */}
        <Header />
        <Banner />
        <Content />
    </div>
  );
}

export default App;
