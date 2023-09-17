import BaseContainer from '../BaseContainer';
import './styles.css';

import Logo from '../../assets/logo.svg';
import { useLearnModal } from '../../../contexts/ModalContextApiHook';

export default function Header() {
    const { showModal } = useLearnModal();

    return (
        <header>
            <BaseContainer>
                <div className="content">
                    <img src={Logo} alt="" className="logo" />
                    <div className="actions">
                        <button className="learn-btn learn-btn-primary" onClick={() => showModal('createUser')}>Cadastre-se</button>
                        <button className="learn-btn learn-btn-primary-outline" onClick={() => showModal('loginUser')}>Entre</button>
                    </div>
                </div>
            </BaseContainer>
        </header>
    );
}