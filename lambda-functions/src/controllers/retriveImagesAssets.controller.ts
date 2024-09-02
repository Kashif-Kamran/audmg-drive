import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import connection from '@database/connect'
import { S3 } from "aws-sdk"
import { AWS_S3_CONSTANTS, AWS_S3_CREDENTIALS, JWT_CONSTANTS } from "@config/env.config";
import AssetModel, { AssetDocument } from "@database/models/Asset.model";
import jwt, { JwtPayload } from 'jsonwebtoken';

const getImagesController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const isConnected = await connection();
    if (!isConnected) throw Error("Unable to connect to database");
    const s3 = new S3(AWS_S3_CREDENTIALS)
    const token = event.headers?.Authorization;
    if (!token) return {
        statusCode: 403,
        body: JSON.stringify({
            success: false,
            message: "Invalid Token"
        })
    }
    const assetType = event.queryStringParameters?.assettype
    const decodedUser: JwtPayload = jwt.verify(token, JWT_CONSTANTS.JWT_SECRETE_KEY) as JwtPayload;
    const assetList = await AssetModel.find({ userId: decodedUser._id, fileType: assetType });
    const retrivedData = await Promise.all([...assetList.map(async (asset: AssetDocument) => {
        const params = {
            Bucket: AWS_S3_CONSTANTS.BucketName,
            Key: asset.s3BucketKey,
            Expires: 3600,
        };
        const url = s3.getSignedUrl("getObject", params)
        return {
            signedUrl: url,
            fileName: asset.s3BucketKey,
            fileType: asset.fileType
        }
    })])

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            message: "Data extracted successfully",
            data: retrivedData
        })
    }
}
export default getImagesController;