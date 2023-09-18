import { useState } from 'react';
import './styles.css';
import { useLearnPages } from '../../contexts/PagesContextApiHook';
import { FaTrashAlt } from 'react-icons/fa';

export default function StudyTrailCard({ studyTrail, hasAuthor, hasDelete=false }) {
    const { changePage } = useLearnPages();

    const [collapsed, setCollapsed] = useState(true);

    return (
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
                        <FaTrashAlt className="delete-icon" />
                    )}
                </div>
            </div>
            <div 
                className={`description ${collapsed && 'collapsed'}`}>
                {studyTrail.description}
            </div>
        </div>
    );
}