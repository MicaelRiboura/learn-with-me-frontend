import StudyTrailCard from '../StudyTrailCard';
import './styles.css';

export default function ListStudyTrails({ title = 'Trilhas de Estudo', studyTrails, hasAuthor=true }) {

    return (
        <div className="list-study-trails">
            <h1>{title}</h1>
            {studyTrails?.map((studyTrail) => (
                <StudyTrailCard key={`${studyTrail.id}`} studyTrail={studyTrail} hasAuthor={hasAuthor} />
            ))}
        </div>  
    );
}