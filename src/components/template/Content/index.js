import { useEffect, useState } from 'react';

import BaseContainer from "../BaseContainer";
import ListStudyTrails from '../../ListStudyTrails';

import './styles.css';
import { useLearnAuth } from '../../../contexts/AuthContextApiHook';
import { useLearnPages } from '../../../contexts/PagesContextApiHook';
import StudyTrailDetails from '../../StudyTrailDetails';

export default function Content() {
    const { user } = useLearnAuth();
    const { currentPage, changePage } = useLearnPages();

    const [studyTrails, setStudyTrails] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        const url = `http://localhost:5000/study_trails/list?title=${searchTitle}`;
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
    }, [searchTitle]);

    return (
        <div className="content-area">
            <BaseContainer>
                <div className="actions">
                    <input className="form-input search-input" type="text" placeholder="Pesquisar por trilha..." onChange={(e) => setSearchTitle(e.target.value)} />
                    <div className="group-btns">
                        {currentPage === 'ListStudyTrails' && <span className="my-trails-action" onClick={() => changePage('MyStudyTrails')}>Minhas Trilhas</span>}
                        {(currentPage === 'MyStudyTrails' || currentPage === 'StudyTrailDetails') && <span className="my-trails-action" onClick={() => changePage('ListStudyTrails')}>Todas as Trilhas</span>}
                        <button className="learn-btn learn-btn-primary">Criar nova trilha</button>
                    </div>
                </div>
                {currentPage === 'ListStudyTrails' && <ListStudyTrails studyTrails={studyTrails}  />}
                {currentPage === 'MyStudyTrails' && <ListStudyTrails title="Minhas Trilhas" hasAuthor={false} studyTrails={user.study_trails} />}
                {currentPage === 'StudyTrailDetails' && <StudyTrailDetails />}
            </BaseContainer>
        </div>
    );
}
