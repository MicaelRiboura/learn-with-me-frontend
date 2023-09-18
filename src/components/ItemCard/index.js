import { useState } from 'react';
import { AiFillPlayCircle, AiFillFileText } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import './styles.css';

export default function ItemCard({ item, hasDelete=false }) {
    const [collapsed, setCollapsed] = useState(true);

    const itemTypesDict = {
        'text': 'Texto',
        'video': 'Video',
    };

    return (
        <div className="item-card">
            <div className="content">
                <div className="info-area">
                    {item.type === 'video' && <AiFillPlayCircle className="item-icon" />}
                    {item.type === 'text' && <AiFillFileText className="item-icon" />}
                    <div className="info">
                        <h3>{item.title}</h3>
                        <p>{itemTypesDict[item.type]}</p>
                    </div>
                </div>
                <div className="actions">
                    <span className="info" onClick={() => setCollapsed((state) => !state)}>{collapsed ? 'Mais informações' : 'Menos informações'}</span>
                    <a href={item.resource} target="_blank" rel="noreferrer"><span className="start">Acesse</span></a>
                    {hasDelete && (
                        <FaTrashAlt className="delete-icon" />
                    )}
                </div>
            </div>
            <div className={`description ${collapsed && 'collapsed'}`}>
                {item.description}
            </div>
        </div>
    );
}