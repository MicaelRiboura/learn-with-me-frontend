import { createContext, useContext, useState } from "react";
import { useLearnAuth } from "./AuthContextApiHook";
import { useLearnModal } from "./ModalContextApiHook";

const LearnPagesContext = createContext({});

const LearnPagesProvider = ({ children }) => {
    const { signed } = useLearnAuth();
    const { showModal } = useLearnModal();
    const [currentPage, setCurrentPage] = useState('ListStudyTrails');
    const [data, setData] = useState({});

    const changePage = (page, data={}) => {
        if (signed) {
            setCurrentPage(page);
            setData(data);
        } else {
            showModal('loginUser');
        }
    }

    return <LearnPagesContext.Provider value={{
        currentPage,
        data,
        changePage,
    }}>{children}</LearnPagesContext.Provider>;
};

const useLearnPages = () => {
    const context = useContext(LearnPagesContext);
    return context;
};

export { LearnPagesProvider, useLearnPages };