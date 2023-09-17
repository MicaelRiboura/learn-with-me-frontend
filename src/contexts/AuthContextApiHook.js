import { createContext, useContext, useEffect, useState } from "react";

const LearnAuthContext = createContext({});

const LearnAuthProvider = ({ children }) => {
    const [signed, setSigned] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const storagedSigned = localStorage.getItem('@Learn:signed');
        const storagedUser = localStorage.getItem('@Learn:user');

        if (storagedUser) {
            setUser(JSON.parse(storagedUser));
        }

        if (storagedSigned === 'true') {
            setSigned(true);
        }

    }, []);

    const sign = async ({ email, password }) => {
        try {
            const url = 'http://127.0.0.1:5000/users/login';
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
    
            const responseJson = await fetch(url, {
                method: 'post',
                body: formData,
            });
    
            const response = await responseJson.json();
            
            if (!response.message) {
                setUser(response);
                setSigned(true);
                localStorage.setItem('@Learn:signed', 'true');
                localStorage.setItem('@Learn:user', JSON.stringify(response));
            }

            return response;
        } catch(error) {
            console.error('Error:', error);
            return {};
        };
    }

    const signOut = () => {
        localStorage.clear();
        setUser(undefined);
        setSigned(false);
    }

    return <LearnAuthContext.Provider value={{
        signed,
        user,
        sign,
        signOut,
    }}>{children}</LearnAuthContext.Provider>;
};

const useLearnAuth = () => {
    const context = useContext(LearnAuthContext);
    return context;
};

export { LearnAuthProvider, useLearnAuth };