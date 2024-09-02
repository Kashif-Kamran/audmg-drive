import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult, APIGatewayProxyEvent } from 'aws-lambda';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '@database/models/User.model';
import { JWT_CONSTANTS } from '@config/env.config';
import connection from '@database/connect';
const allowPolicyDocument: APIGatewayAuthorizerResult = {
    principalId: "Authorized",
    policyDocument: {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: "Allow",
                Resource: "*"
            }
        ]
    }
};

const denyPolicyDocument: APIGatewayAuthorizerResult = {
    principalId: "Unauthorized",
    policyDocument: {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: "Deny",
                Resource: "*"
            }
        ]
    }
};

export const main = async (event: any): Promise<APIGatewayAuthorizerResult> => {
    try
    {
        connection()
        const token = event.authorizationToken ?? event.headers?.Authorization;
        console.log("{------ Event : ", event, "Token : ", token, " -------}");
        if (!token) return denyPolicyDocument;
        const decoded: JwtPayload = jwt.verify(token, JWT_CONSTANTS.JWT_SECRETE_KEY) as JwtPayload;
        if (!decoded) return denyPolicyDocument;

        const user = await UserModel.findOne({ _id: decoded._id });
        if (!user) return denyPolicyDocument;
        return allowPolicyDocument;
    } catch (error)
    {
        console.log("Error Occurred In Validator middleware : " + event);
        console.error(error);
        return denyPolicyDocument;
    }
};
