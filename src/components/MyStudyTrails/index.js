import { useEffect, useState } from 'react';
import StudyTrailCard from '../StudyTrailCard';
import './styles.css';
import { useLearnAuth } from '../../contexts/AuthContextApiHook';
import ItemCard from '../ItemCard';

export default function MyStudyTrails() {
    const { user } = useLearnAuth();
    const [studyTrails, setStudyTrails] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/study_trails/user?user_id=${user.id}`;
        fetch(url, {
            method: 'get',
        })
            .then((response) => response.json())
            .then((data) => {
                setStudyTrails(data.study_trails);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [user]);

    return (
        <div className="list-study-trails">
            <h1>Minhas Trilhas</h1>
            {studyTrails?.map((studyTrail) => (
                <>
                    <StudyTrailCard key={`${studyTrail.id}`} studyTrail={studyTrail} hasDelete={true} />
                    <div className="ident-area">
                        {studyTrail.items?.map(item => (
                            <ItemCard key={item.id} item={item} hasDelete={true} />
                        ))}
                    </div>
                </>
            ))}
        </div>
    );
}