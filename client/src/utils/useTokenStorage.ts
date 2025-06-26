export const useTokenStorage = () => {
    const getToken = () => {
        return localStorage.getItem("token");
    };

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
    };

    return { getToken, setToken };
};