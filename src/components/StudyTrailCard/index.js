import { useState } from 'react';
import './styles.css';
import { useLearnPages } from '../../contexts/PagesContextApiHook';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function StudyTrailCard({ studyTrail, hasAuthor, hasDelete=false }) {
    const { changePage } = useLearnPages();

    const [collapsed, setCollapsed] = useState(true);

    const [hasDeleted, setHasDeleted] = useState(false);

    const deleteStudyTrail = (id) => {
        const url = `http://localhost:5000/study_trails/delete?id=${id}`;
        fetch(url, {
            method: 'delete',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message.includes('sucesso')) {
                    toast.success('Trilha de estudo removida com sucesso!');
                    setHasDeleted(true);
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            {!hasDeleted && (
                <div className="study-trail-card">
                    <div className="content">
                        <div className="info-area">
                            <h3>{studyTrail.title}</h3>
                            {hasAuthor && (
                                <p>por {studyTrail.user.name}</p>
                            )}
                        </div>
                        <div className="actions">
                            <span className="info" onClick={() => setCollapsed((state) => !state)}>{collapsed ? 'Mais informações' : 'Menos informações'}</span>
                            <span className="start" onClick={() => changePage('StudyTrailDetails', { studyTrailId: studyTrail.id })}>Comece</span>
                            {hasDelete && (
                                <FaTrashAlt className="delete-icon" onClick={() => deleteStudyTrail(studyTrail.id)} />
                            )}
                        </div>
                    </div>
                    <div 
                        className={`description ${collapsed && 'collapsed'}`}>
                        {studyTrail.description}
                    </div>
                </div>
            )}
        </>
    );
}