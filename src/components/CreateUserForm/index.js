import { toast } from "react-toastify";
import { useValidationForms } from "../../hooks/useValidationForms";
import { useLearnModal } from "../../contexts/ModalContextApiHook";

export default function CreateUserForm() {
    const { validateRequiredFields, validateEmailField } = useValidationForms();
    const { hideModal } = useLearnModal();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('data: ', e.target.elements);

        const name = e.target.elements['name'].value;
        const email = e.target.elements['email'].value;
        const password = e.target.elements['password'].value;

        let validationErrors = validateRequiredFields([
            { input: name, msg: 'O campo nome é obrigatório' },
            { input: email, msg: 'O campo e-mail é obrigatório' },
            { input: password, msg: 'O campo senha é obrigatório' },
        ]);

        validationErrors += validateEmailField(email);

        if (validationErrors === 0) {
            console.log('sem erro');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            
            try {
                const url = 'http://localhost:5000/users/create';
                const responseJson = await fetch(url, {
                    method: 'post',
                    body: formData
                })
                    // .then((response) => response.json())
                const response = await responseJson.json();
                console.log('response: ', response);
                if (!response.message) {
                    toast.success('Cadastro realizado com sucesso!');
                    hideModal('createUser');
                } else {
                    toast.error(response.message);
                }
            } catch(error) {
                console.error('Error:', error);
                toast.error('Erro no cadastro!');
            }
        }
    }

    return (
        <form method="post" onSubmit={onSubmit}>
            <div className="input-group">
                <label htmlFor="">Nome</label>
                <input name="name" type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">E-mail</label>
                <input name="email" type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">Senha</label>
                <input name="password" type="password" className="form-input" />
            </div>
            <div className="form-button-area">
                <button type="submit" className="learn-btn learn-btn-primary">Cadastre-se</button>
            </div>
        </form>
    )
}