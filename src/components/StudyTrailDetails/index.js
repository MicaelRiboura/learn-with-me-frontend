import { useEffect, useState } from 'react';
import ItemCard from '../ItemCard';

import './styles.css';
import { useLearnPages } from '../../contexts/PagesContextApiHook';

export default function StudyTrailDetails() {
    const { currentPage, data } = useLearnPages();
    const [studyTrail, setStudyTrail] = useState({});

    useEffect(() => {
        if (currentPage === 'StudyTrailDetails' && data.studyTrailId) {
            const url = `http://localhost:5000/study_trails/one?id=${data.studyTrailId}`;
            fetch(url, {
                method: 'get',
            })
                .then((response) => response.json())
                .then((data) => {
                    setStudyTrail(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [currentPage, data]);

    return (
        <div className="study-trail-details">
            <h1>{studyTrail?.title}</h1>
            <p>Feito por {studyTrail?.user?.name}</p>
            {studyTrail?.items?.map((item) => (
                <ItemCard key={`${item.id}`} item={item} hasDelete={false} />
            ))}
        </div>
    );
}