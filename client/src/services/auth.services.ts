import api from "../api/axios";

export interface SignupData {
    name: string,
    email: string,
    password: string
}

export interface SigninData {
    email: string;
    password: string;
}

export const signup = async (data: SignupData) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
}

export const signin = async (data: SigninData) => {
    const response = await api.post("/auth/signin", data);
    return response.data;
};