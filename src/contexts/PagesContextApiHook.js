import { createContext, useContext, useState } from "react";

const LearnPagesContext = createContext({});

const LearnPagesProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('ListStudyTrails');
    const [data, setData] = useState({});

    const changePage = (page, data={}) => {
        setCurrentPage(page);
        setData(data);
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