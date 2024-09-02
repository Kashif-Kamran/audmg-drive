import UserModel from '@database/models/User.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import connection from '@database/connect';
import { sign } from 'jsonwebtoken';
import { JWT_CONSTANTS } from '@config/env.config';
const loginController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    await connection();
    if (!event.body) return {
        statusCode: 401,
        body: JSON.stringify({
            success: false,
            message: "Please provide required feilds"
        })
    }
    const { email, password } = JSON.parse(event.body);
    if (!email || !password)
    {
        return {
            statusCode: 401,
            body: JSON.stringify({
                success: false,
                message: "Please provide required feilds"
            })
        }
    }

    const userBeingLoggedIn = await UserModel.findOne({ email });
    if (!userBeingLoggedIn)
        return {
            statusCode: 401,
            body: JSON.stringify({
                success: false,
                message: "Invalid email or password"
            })
        }
    if (userBeingLoggedIn.password !== password)
        return {
            statusCode: 401,
            body: JSON.stringify({
                success: false,
                message: "Invalid email or password"
            })
        }
    const token = await sign({ email: userBeingLoggedIn.email, _id: userBeingLoggedIn._id }, JWT_CONSTANTS.JWT_SECRETE_KEY, { expiresIn: '1h' });
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            message: "User logged in successfully",
            data: {
                jwtToken: token
            }
        })
    }


}

export default loginController;