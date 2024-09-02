import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import signUpController from '@controllers/authentication/signup.controller';
import loginController from '@controllers/authentication/login.controller';
export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
    } as const;
    try
    {

        console.log("{------ Event : ", event.resource, "Method : ", event.httpMethod, " -------}");
        if (event.httpMethod === "POST" && event.resource === '/signup')
        {
            const signUpResponse = await signUpController(event);
            signUpResponse.headers = {
                ...corsHeaders
            }
            return signUpResponse;
        }
        else if (event.httpMethod === "POST" && event.resource === '/login')
        {

            const signInResponse = await loginController(event)
            signInResponse.headers = {
                ...corsHeaders
            }
            return signInResponse;
        }

        //  
        return {
            statusCode: 404,
            body: JSON.stringify({
                success: false,
                message: "Route not found"
            }),
            headers: {
                ...corsHeaders
            }
        }
    } catch (error)
    {
        console.log("Error Occured : Method: " + event.httpMethod + " - Resource : " + event.resource);
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: "Unable to Uplaod the file"
            }),
            headers: {
                ...corsHeaders
            }
        }
    }
};
