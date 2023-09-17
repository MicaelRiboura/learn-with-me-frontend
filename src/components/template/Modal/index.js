import './styles.css';

import { AiFillCloseCircle } from 'react-icons/ai';

export default function Modal({ title, children }) {
    return (
        <div className="modal-area">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <AiFillCloseCircle className="icon" />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}