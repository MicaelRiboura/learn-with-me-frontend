import './styles.css';

import BaseContainer from "../BaseContainer";


export default function Content() {
    return (
        <div className="content-area">
            <BaseContainer>
                <div className="actions">
                    <input className="form-input search-input" type="text" placeholder="Pesquisar por trilha..." />
                    <div className="group-btns">
                        <span className="my-trails-action">Minhas Trilhas</span>
                        <button className="learn-btn learn-btn-primary">Criar nova trilha</button>
                    </div>
                </div>
            </BaseContainer>
        </div>
    );
}
