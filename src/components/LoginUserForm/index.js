import { toast } from "react-toastify";
import { useValidationForms } from "../../hooks/useValidationForms";
import { useLearnModal } from "../../contexts/ModalContextApiHook";
import { useLearnAuth } from "../../contexts/AuthContextApiHook";

export default function LoginUserForm() {
    const { validateRequiredFields, validateEmailField } = useValidationForms();
    const { hideModal } = useLearnModal();
    const { sign } = useLearnAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('data: ', e.target.elements);

        const email = e.target.elements['email'].value;
        const password = e.target.elements['password'].value;

        let validationErrors = validateRequiredFields([
            { input: email, msg: 'O campo e-mail é obrigatório' },
            { input: password, msg: 'O campo senha é obrigatório' },
        ]);

        validationErrors += validateEmailField(email);

        if (validationErrors === 0) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            try {
                const response = await sign({ email, password });
                console.log('response: ', response);

                if (!response.message) {
                    toast.success(`Olá, ${response.name}!`);
                    hideModal('loginUser');
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Erro no cadastro!');
            }
        }
    }

    return (
        <form method="post" onSubmit={onSubmit}>
            <div className="input-group">
                <label htmlFor="">E-mail</label>
                <input name="email" type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">Senha</label>
                <input name="password" type="password" className="form-input" />
            </div>
            <div className="form-button-area">
                <button type="submit" className="learn-btn learn-btn-primary">Entrar</button>
            </div>
        </form>
    )
}