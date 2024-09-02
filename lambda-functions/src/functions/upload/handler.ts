
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import uploadController from '@controllers/uploadAsset.controller';

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try
    {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
        } as const;
        console.log("{------ Event : ", event.resource, "Method : ", event.httpMethod, " -------}");
        const uploadResponse = await uploadController(event)
        uploadResponse.headers = {
            ...corsHeaders
        }
        return uploadResponse;
    } catch (error)
    {
        console.log("Error Occured : Method: " + event.httpMethod + " - Resource : " + event.resource);
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: "Unable to Uplaod the file"
            })
        }
    }
};

/*
 
  
 */