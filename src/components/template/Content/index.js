import { useEffect, useState } from 'react';

import BaseContainer from "../BaseContainer";
import ListStudyTrails from '../../ListStudyTrails';

import './styles.css';
import { useLearnPages } from '../../../contexts/PagesContextApiHook';
import StudyTrailDetails from '../../StudyTrailDetails';
import MyStudyTrails from '../../MyStudyTrails';
import CreateStudyTrailForm from '../../CreateStudyTrailForm';
import CreateItemForm from '../../CreateItemForm';

export default function Content() {
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
                    {currentPage === 'ListStudyTrails' && <input className="form-input search-input" type="text" placeholder="Pesquisar por trilha..." onChange={(e) => setSearchTitle(e.target.value)} />}
                    {currentPage !== 'ListStudyTrails' && <span></span>}
                    <div className="group-btns">
                        {currentPage === 'ListStudyTrails' && <span className="my-trails-action" onClick={() => changePage('MyStudyTrails')}>Minhas Trilhas</span>}
                        {currentPage !== 'ListStudyTrails' && <span className="my-trails-action" onClick={() => changePage('ListStudyTrails')}>Todas as Trilhas</span>}
                        <button className="learn-btn learn-btn-primary" onClick={() => changePage('CreateStudyTrail')}>Criar nova trilha</button>
                    </div>
                </div>
                {currentPage === 'ListStudyTrails' && <ListStudyTrails studyTrails={studyTrails}  />}
                {currentPage === 'MyStudyTrails' && <MyStudyTrails />}
                {currentPage === 'StudyTrailDetails' && <StudyTrailDetails />}
                {currentPage === 'CreateStudyTrail' && <CreateStudyTrailForm />}
                {currentPage === 'CreateItem' && <CreateItemForm />}
            </BaseContainer>
        </div>
    );
}
