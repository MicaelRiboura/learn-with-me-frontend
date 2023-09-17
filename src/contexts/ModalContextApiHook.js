import { createContext, useContext, useState } from "react";

const LearnModalContext = createContext({});

const LearnModalProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [modalId, setModalId] = useState();

    const showModal = (modalIdParam) => {
        setHidden(false);
        setModalId(modalIdParam);
    }

    const hideModal = (modalIdParam) => {
        setHidden(true);
        setModalId(modalIdParam);
    }

    return <LearnModalContext.Provider value={{
        hidden,
        modalId,
        showModal,
        hideModal,
    }}>{children}</LearnModalContext.Provider>;
};

const useLearnModal = () => {
    const context = useContext(LearnModalContext);
    return context;
};

export { LearnModalProvider, useLearnModal };