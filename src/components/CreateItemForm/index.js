import { toast } from "react-toastify";
import { useValidationForms } from "../../hooks/useValidationForms";
import { useLearnPages } from '../../contexts/PagesContextApiHook';

import './styles.css';
import { useCallback, useState } from "react";

export default function CreateItemForm() {
    const { changePage, data } = useLearnPages();
    const { validateRequiredFields, validateResourceField } = useValidationForms();

    const [continueCreating, setContinueCreating] = useState(false);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log('data: ', e.target.elements);

        const clearAll = () => {
            e.target.elements['title'].value = '';
            e.target.elements['type'].value = '';
            e.target.elements['description'].value = '';
            e.target.elements['resource'].value = '';
        }

        const title = e.target.elements['title'].value;
        const type = e.target.elements['type'].value;
        const description = e.target.elements['description'].value;
        const resource = e.target.elements['resource'].value;

        let validationErrors = validateRequiredFields([
            { input: title, msg: 'O campo título é obrigatório' },
            { input: type, msg: 'O campo tipo é obrigatório' },
            { input: description, msg: 'O campo descrição é obrigatório' },
            { input: resource, msg: 'O campo recurso (link) é obrigatório' },
        ]);

        validationErrors += validateResourceField(resource);

        if (validationErrors === 0) {
            console.log('sem erro');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('type', type);
            formData.append('description', description);
            formData.append('resource', resource);
            formData.append('study_trail_id', data.studyTrailId);

            try {
                const url = 'http://localhost:5000/items/create';
                const responseJson = await fetch(url, {
                    method: 'post',
                    body: formData
                });

                const response = await responseJson.json();
                console.log('response: ', response);
                if (!response.message) {
                    toast.success('Cadastro realizado com sucesso!');
                    if (continueCreating) {
                        clearAll();
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
    }, [changePage, continueCreating, data.studyTrailId, validateRequiredFields, validateResourceField]);

    return (
        <form className="form-item" method="post" onSubmit={onSubmit}>
            <h1>Novo Item</h1>
            <div className="input-group">
                <label htmlFor="">Título</label>
                <input name="title" type="text" className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="">Tipo</label>
                <select name="type" type="text" className="form-input">
                    <option value=""></option>
                    <option value="text">Texto</option>
                    <option value="video">Vídeo</option>
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="">Descrição</label>
                <textarea name="description" className="form-input" rows="8" style={{ resize: 'vertical' }}></textarea>
            </div>
            <div className="input-group">
                <label htmlFor="">Recurso (Link)</label>
                <input name="resource" type="text" className="form-input" />
            </div>
            <div className="form-button-area">
                <button type="submit" className="learn-btn learn-btn-primary-outline" onClick={() => setContinueCreating(true)}>Salvar e adicionar outro Item</button>
                <button type="submit" className="learn-btn learn-btn-primary" onClick={() => setContinueCreating(false)}>Finalizar</button>
            </div>
            <p>Atenção! Permitido somente o compartilhamento de conteúdos livres e gratuitos.</p>
        </form>
    );
}