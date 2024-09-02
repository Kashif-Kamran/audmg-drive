import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import getImagesController from '@controllers/retriveImagesAssets.controller';
interface CustomAPIGateWayProxyEvent extends APIGatewayProxyEvent {
    user: any
}
export const main = async (event: CustomAPIGateWayProxyEvent): Promise<APIGatewayProxyResult> => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    } as const;
    try 
    {
        console.log("Event : ", event)
        console.log("{------ Event : ", event.resource, "Method : ", event.httpMethod, " -------}");
        const getImagesResponse = await getImagesController(event);
        getImagesResponse.headers = {
            ...corsHeaders
        }
        return getImagesResponse;
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
