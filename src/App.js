import './App.css';

import Header from './components/template/Header';
import Banner from './components/template/Banner';
import Content from './components/template/Content';
import Modal from './components/template/Modal';
import CreateUserForm from './components/CreateUserForm';
import LoginUserForm from './components/LoginUserForm';
import { LearnAuthProvider } from './contexts/AuthContextApiHook';
import { LearnModalProvider } from './contexts/ModalContextApiHook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LearnPagesProvider } from './contexts/PagesContextApiHook';

function App() {
  return (
    <div className="App">
      <LearnAuthProvider>
          <LearnModalProvider>
            <LearnPagesProvider>
              <ToastContainer />
              <Modal id="createUser" title="Increva-se">
                <CreateUserForm />
              </Modal>
              <Modal id="loginUser" title="Entrar">
                <LoginUserForm />
              </Modal>
              <Header />
              <Banner />
              <Content />
            </LearnPagesProvider>
          </LearnModalProvider>
      </LearnAuthProvider>
    </div>
  );
}

export default App;
