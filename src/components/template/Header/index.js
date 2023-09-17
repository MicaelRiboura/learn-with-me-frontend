import BaseContainer from '../BaseContainer';
import './styles.css';

import Logo from '../../assets/logo.svg';
import { useLearnModal } from '../../../contexts/ModalContextApiHook';
import { useLearnAuth } from '../../../contexts/AuthContextApiHook';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
    const { showModal } = useLearnModal();
    const { signed, user, signOut } = useLearnAuth();

    return (
        <header>
            <BaseContainer>
                <div className="content">
                    <img src={Logo} alt="" className="logo" />
                    {signed ? (
                        <div className="user-info">
                            <FaUserCircle className="icon" />
                            <span>{user.name}</span>
                            <FiLogOut className="logout-icon" onClick={() => signOut()} />
                        </div>
                    ) : (
                        <div className="actions">
                            <button className="learn-btn learn-btn-primary" onClick={() => showModal('createUser')}>Cadastre-se</button>
                            <button className="learn-btn learn-btn-primary-outline" onClick={() => showModal('loginUser')}>Entre</button>
                        </div>
                    )}
                </div>
            </BaseContainer>
        </header>
    );
}