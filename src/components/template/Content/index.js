import { useEffect, useState } from 'react';

import BaseContainer from "../BaseContainer";
import ListStudyTrails from '../../ListStudyTrails';

import './styles.css';

export default function Content() {
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
                        <span className="my-trails-action">Minhas Trilhas</span>
                        <button className="learn-btn learn-btn-primary">Criar nova trilha</button>
                    </div>
                </div>
                <ListStudyTrails studyTrails={studyTrails}  />
            </BaseContainer>
        </div>
    );
}
