export default function CreateUserForm() {
    return (
        <div>
            <div className="input-group">
                <label htmlFor="">Nome</label>
                <input type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">E-mail</label>
                <input type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">Senha</label>
                <input type="password" className="form-input" />
            </div>
            <div className="form-button-area">
                <button className="learn-btn learn-btn-primary">Cadastre-se</button>
            </div>
        </div>
    )
}