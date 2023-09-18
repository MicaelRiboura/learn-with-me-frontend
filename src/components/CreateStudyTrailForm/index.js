import { toast } from "react-toastify";
import { useValidationForms } from "../../hooks/useValidationForms";
import { useLearnPages } from '../../contexts/PagesContextApiHook';

import './styles.css';
import { useCallback, useState } from "react";
import { useLearnAuth } from "../../contexts/AuthContextApiHook";

export default function CreateStudyTrailForm() {
    const { user } = useLearnAuth();
    const { changePage } = useLearnPages();
    const { validateRequiredFields } = useValidationForms();

    const [continueCreating, setContinueCreating] = useState(false);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log('data: ', e.target.elements);

        const title = e.target.elements['title'].value;
        const description = e.target.elements['description'].value;

        let validationErrors = validateRequiredFields([
            { input: title, msg: 'O campo título é obrigatório' },
            { input: description, msg: 'O campo descrição é obrigatório' },
        ]);

        if (validationErrors === 0) {
            console.log('sem erro');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('user_id', user.id);

            try {
                const url = 'http://localhost:5000/study_trails/create';
                const responseJson = await fetch(url, {
                    method: 'post',
                    body: formData
                })

                const response = await responseJson.json();
                console.log('response: ', response);
                if (!response.message) {
                    toast.success('Cadastro realizado com sucesso!');
                    if (continueCreating) {
                        changePage('CreateItem', { studyTrailId: response.id });
                    } else {
                        changePage('ListStudyTrails');
                    }

                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Erro no cadastro!');
            }
        }
    }, [changePage, continueCreating, user.id, validateRequiredFields]);

    return (
        <form className="form-study-trail" method="post" onSubmit={onSubmit}>
            <h1>Nova Trilha</h1>
            <div className="input-group">
                <label htmlFor="">Título</label>
                <input name="title" type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">Descrição</label>
                <textarea name="description" className="form-input" rows="8" style={{resize: 'vertical'}}></textarea>
            </div>
            <div className="form-button-area">
                <button type="submit" className="learn-btn learn-btn-primary-outline" onClick={() => setContinueCreating(false)}>Criar e Finalizar</button>
                <button type="submit" className="learn-btn learn-btn-primary" onClick={() => setContinueCreating(true)}>Criar e Continuar para Itens</button>
            </div>
        </form>
    )
}