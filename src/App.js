import './App.css';

import Header from './components/template/Header';
import Banner from './components/template/Banner';
import Content from './components/template/Content';
import Modal from './components/template/Modal';
import CreateUserForm from './components/CreateUserForm';
import LoginUserForm from './components/LoginUserForm';
import { LearnAuthProvider } from './contexts/AuthContextApiHook';
import { LearnModalProvider } from './contexts/ModalContextApiHook';


function App() {
  return (
    <div className="App">
      <LearnAuthProvider>
          <LearnModalProvider>
            <Modal id="createUser" title="Increva-se">
              <CreateUserForm />
            </Modal>
            <Modal id="loginUser" title="Entrar">
              <LoginUserForm />
            </Modal>
            <Header />
            <Banner />
            <Content />
          </LearnModalProvider>
      </LearnAuthProvider>
    </div>
  );
}

export default App;
