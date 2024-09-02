import UserModel from '@database/models/User.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import connection from '@database/connect';
const signUpController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    await connection();
    console.log("Event Body : ", event.body);
    if (!event.body) return {
        statusCode: 401,
        body: JSON.stringify({
            message: "Event body is reqired which is found empty"
        })
    }
    const { username, email, password } = JSON.parse(event.body);
    if (!username || !email || !password)
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Please provide required feilds"
            })
        }
    const ifUserExsit = await UserModel.findOne({ email });
    if (ifUserExsit)
        return {
            statusCode: 401,
            body: JSON.stringify({
                success: false,
                message: "User with Email Already Exsist"
            })
        }
    console.log({ username, password, email });
    await UserModel.create({ username, password, email });
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            message: "User Registered Successfully"
        })
    }
}


export default signUpController;