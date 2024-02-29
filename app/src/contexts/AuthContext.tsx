'use client';

import React, { useState, useContext, useEffect } from 'react';
import { getCookie, setCookie, hasCookie, deleteCookie } from 'cookies-next';
import { IUser } from '@/interfaces';
import { apiInstance, getRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearMessages } from '@/store/features/utilSlice';

import toast, { Toaster } from 'react-hot-toast';

type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    pending: boolean;
    user: IUser | null;
    setLoading: (loading: boolean) => void;
    setPending: (pending: boolean) => void;
    login: (crediential: any, callback: (user: IUser | null) => void) => void;
    logout: () => void;
    refresh: () => void;
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
    children: React.ReactNode;
}

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME!;

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useAppDispatch();

    const messages = useAppSelector(state => state.utilReducer.messages);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        function loadUserFromCookies() {
            if (hasCookie(COOKIE_NAME)) {
                const token = JSON.parse(getCookie(COOKIE_NAME) as string);
                if (token) {
                    apiInstance.defaults.headers.Authorization = `Bearer ${token.access}`;
                    getRequest(`/me`)
                        .then(res => {
                            if (res.status === 200) {
                                setUser(res.data.me);
                                setPending(false);
                                setLoading(false);
                            } else {
                                setPending(false);
                                setLoading(false);
                            }
                        })
                        .catch(err => {
                            setPending(false);
                            setLoading(false);
                        });
                } else {
                    setPending(false);
                    setLoading(false);
                }
            } else {
                setPending(false);
                setLoading(false);
            }
        }
        loadUserFromCookies();
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            messages.map(_msg => {
                if (_msg.type == 'success')
                    toast.success(_msg.message, {
                        style: {
                            padding: '16px',
                            maxWidth: 600
                        }
                    });
                if (_msg.type == 'warning')
                    toast.success(_msg.message, {
                        style: {
                            padding: '16px',
                            maxWidth: 600
                        },
                        iconTheme: {
                            primary: '#FFCC33',
                            secondary: '#FFFAEE'
                        }
                    });
                if (_msg.type == 'error')
                    toast.error(_msg.message, {
                        style: {
                            padding: '16px',
                            maxWidth: 600
                        }
                    });
            });

            dispatch(clearMessages());
        }
    }, [messages]);

    const login = async (credientail: any, callback: (user: IUser | null) => void) => {
        setPending(true);

        logout();

        const response = await apiInstance.post('/auth/login', credientail);
        if (response.status === 200) {
            setCookie(COOKIE_NAME, JSON.stringify(response.data));
            apiInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`;
            const res = await apiInstance.get(`/me`);
            if (res.status === 200) {
                setUser(res.data.me);
                callback(res.data.me);
            } else {
                setUser(null);
                callback(null);
            }
        } else {
            setUser(null);
            callback(null);
        }

        setPending(false);
    };

    const refresh = async () => {
        const res = await apiInstance.get(`/me`);
        if (res.status === 200) {
            setUser(res.data.me);
        }
    };

    const logout = () => {
        setPending(true);

        deleteCookie(COOKIE_NAME);
        setUser(null);
        delete apiInstance.defaults.headers.Authorization;

        setPending(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                loading,
                pending,
                login: login,
                logout: logout,
                refresh: refresh,
                setLoading,
                setPending
            }}
        >
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
