import { useState } from 'react';
import './styles.css';

export default function StudyTrailCard({ studyTrail, hasAuthor }) {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div className="card">
            <div className="content">
                <div className="info-area">
                    <h3>{studyTrail.title}</h3>
                    {hasAuthor && (
                        <p>por {studyTrail.user.name}</p>
                    )}
                </div>
                <div className="actions">
                    <span className="info" onClick={() => setCollapsed((state) => !state)}>{collapsed ? 'Mais informações' : 'Menos informações'}</span>
                    <span className="start">Comece</span>
                </div>
            </div>
            <div className={`description ${collapsed && 'collapsed'}`}>
                {studyTrail.description}
            </div>
        </div>
    );
}