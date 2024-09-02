import { http, HttpResponse } from 'msw'


export const handlers = [
    http.get('https://hkuvsesal6.execute-api.us-east-1.amazonaws.com/dev', async () => {
        return HttpResponse.json({
            success: true,
            message: "Logged in successfully",
            data: {
                jwtToken: "temp_jwt_token_from_moc"
            }
        })
    })
]