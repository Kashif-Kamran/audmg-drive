import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthTokenContextType {
    authToken: string | null;
    setAuthToken: (token: string | null) => void;
}

const AuthTokenContext = createContext<AuthTokenContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthTokenState] = useState<string | null>(() => {
        return localStorage.getItem('authToken');
    });

    const setAuthToken = (token: string | null) => {
        setAuthTokenState(token);
        if (token)
        {
            localStorage.setItem('authToken', token);
        } else
        {
            localStorage.removeItem('authToken');
        }
    };

    return (
        <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthTokenContext.Provider>
    );
};

export const useAuthContext = (): AuthTokenContextType => {
    const context = useContext(AuthTokenContext);
    if (!context)
    {
        throw new Error("'useAuthToken' must be used within an AuthTokenProvider");
    }
    return context;
};
