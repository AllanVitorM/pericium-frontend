import api from "./api";

interface LoginPayload {
    cpf: string;
    password: string
}

export const login = async (payload: LoginPayload) => {
    try{
        const response = await api.post('/auth/login', payload);
        console.log("Dados recebidos do login:", response.data);
        const access_token  = response.data.token;

        if (access_token) {
            localStorage.setItem('token', access_token);
            console.log("Token armazenado no localStorage", access_token);
        }
    
        return { access_token }
    
    } catch (error: any) {
        console.error('Error no login', error);
        throw error.response?.data?.message || 'Erro ao fazer login';
    }
};