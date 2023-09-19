import { useEffect, useState } from 'react';
import { AiFillPlayCircle, AiFillFileText } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import './styles.css';
import { toast } from 'react-toastify';
import { useLearnPages } from '../../contexts/PagesContextApiHook';

export default function ItemCard({ item, studyTrailId, hasDelete=false }) {
    const { currentPage, data } = useLearnPages();
    const [collapsed, setCollapsed] = useState(true);

    const [hasDeleted, setHasDeleted] = useState(false);

    useEffect(() => {
        if (currentPage === 'MyStudyTrails' && data?.deletedStudyTrailId === studyTrailId) {
            setHasDeleted(true);
        }
    }, [data, currentPage, studyTrailId, hasDeleted]);

    const itemTypesDict = {
        'text': 'Texto',
        'video': 'Video',
    };

    const deleteItem = (id) => {
        const url = `http://localhost:5000/items/delete?id=${id}`;
        fetch(url, {
            method: 'delete',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message.includes('sucesso')) {
                    toast.success('Item de estudo removido com sucesso!');
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
                                <FaTrashAlt className="delete-icon" onClick={() => deleteItem(item.id)} />
                            )}
                        </div>
                    </div>
                    <div className={`description ${collapsed && 'collapsed'}`}>
                        {item.description}
                    </div>
                </div>
            )}
        </>
    );
}