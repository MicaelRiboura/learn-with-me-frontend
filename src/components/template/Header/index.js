import BaseContainer from '../BaseContainer';
import './styles.css';

import Logo from '../../assets/logo.svg';

export default function Header() {
    return (
        <header>
            <BaseContainer>
                <div className="content">
                    <img src={Logo} alt="" className="logo" />
                    <div className="actions">
                        <button className="learn-btn learn-btn-primary">Cadastre-se</button>
                        <button className="learn-btn learn-btn-primary-outline">Entre</button>
                    </div>
                </div>
            </BaseContainer>
        </header>
    );
}