import { S3 } from 'aws-sdk';
import connection from '@database/connect';
import AssetModel from "@database/models/Asset.model";
import { parse } from '../utils/BusyBoy';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { JWT_CONSTANTS, AWS_S3_CONSTANTS, AWS_S3_CREDENTIALS } from '@config/env.config';



const uploadController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Event : ", event);
    const isConnected = await connection();
    if (!isConnected) throw Error("Unable to connect to database");

    const token = event.headers.Authorization;
    if (!token)
        return {
            statusCode: 403,
            body: JSON.stringify({
                message: "Invalid Token",
                success: false
            })
        }

    const decodedUser: JwtPayload = jwt.verify(token, JWT_CONSTANTS.JWT_SECRETE_KEY) as JwtPayload;

    const s3 = new S3(AWS_S3_CREDENTIALS);

    const parsedData = await parse(event);
    const uploadedFile = parsedData.files[0];

    // Valid file types
    const allowedMimeTypes = ['audio/mpeg', 'image/jpeg', 'image/png'];

    // Check if the uploaded file type is allowed
    if (!allowedMimeTypes.includes(uploadedFile.contentType))
    {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Invalid file type. Only MP3, JPEG, and PNG files are allowed.",
                success: false
            })
        };
    }

    const s3ObjectParams = {
        Bucket: AWS_S3_CONSTANTS.BucketName,
        Key: `${Date.now()}-${uploadedFile.filename}`,
        Body: uploadedFile.content,
        ContentType: uploadedFile.contentType
    };

    await s3.putObject(s3ObjectParams).promise();
    await AssetModel.create({
        s3BucketKey: s3ObjectParams.Key,
        orignalName: uploadedFile.filename,
        fileType: uploadedFile.contentType.includes('audio') ? 'audio' : 'image',
        userId: decodedUser._id as string
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "File has been uploaded successfully",
            success: true
        })
    };
};

export default uploadController;
