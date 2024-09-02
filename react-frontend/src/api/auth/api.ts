import { LoginCredentials, SignUpPayload } from "./dto"
import { apiClient } from "../client"

const login = async ({ email, password }: LoginCredentials) => {
    return apiClient.post('/login', { email, password });
}

const signUp = async ({ email, password, username }: SignUpPayload) => {
    return apiClient.post('/signup', { email, password, username });
}

export default { login, signUp }