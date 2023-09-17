import { createContext, useContext, useState } from "react";

const LearnPagesContext = createContext({});

const LearnPagesProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('ListStudyTrails');

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return <LearnPagesContext.Provider value={{
        currentPage,
        changePage,
    }}>{children}</LearnPagesContext.Provider>;
};

const useLearnPages = () => {
    const context = useContext(LearnPagesContext);
    return context;
};

export { LearnPagesProvider, useLearnPages };