import { useLearnModal } from '../../../contexts/ModalContextApiHook';
import './styles.css';

import { AiFillCloseCircle } from 'react-icons/ai';

export default function Modal({ title, id, children }) {
    const { hidden, modalId, hideModal } = useLearnModal();
    return (
        <>
            {(!hidden && modalId === id) && (
                <div className="modal-area">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>{title}</h2>
                            <AiFillCloseCircle className="icon" onClick={() => hideModal(id)} />
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}