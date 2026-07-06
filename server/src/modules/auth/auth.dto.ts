export interface SignupResponseDto {
    id: string,
    name: string,
    email: string
}

export interface LoginRequestDto{
    email: string,
    password: string
}

export interface LoginResponseDto{
    token: string,
    user: {
        id: string,
        name: string,
        email: string
    }
}