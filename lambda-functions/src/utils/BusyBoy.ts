import Busboy from 'busboy';
import { APIGatewayProxyEvent } from 'aws-lambda';

interface UploadedFile {
    filename: string;
    content: Buffer;
    contentType: string;
    encoding: string;
}

interface ParsedMultipartForm {
    files: UploadedFile[];
    [key: string]: any;
}

export const parse = (event: APIGatewayProxyEvent): Promise<ParsedMultipartForm> => {
    return new Promise((resolve, reject) => {
        const contentType = event.headers['content-type'] || event.headers['Content-Type'];

        if (!contentType)
        {
            reject(new Error('Content-Type header is missing'));
            return;
        }

        const busboy = Busboy({
            headers: {
                'content-type': contentType
            }
        });

        const result: ParsedMultipartForm = {
            files: []
        };

        busboy.on('file', (_fieldname: string, file: NodeJS.ReadableStream, fileInformation: { filename: string, encoding: string, mimeType: string }) => {
            const chunks: Buffer[] = [];
            const uploadFile: UploadedFile = {
                filename: fileInformation.filename,
                content: Buffer.alloc(0),
                contentType: fileInformation.mimeType,
                encoding: fileInformation.encoding,
            };

            file.on('data', (data: Buffer) => {
                chunks.push(data);
            });

            file.on('end', () => {
                if (chunks.length > 0)
                {
                    uploadFile.content = Buffer.concat(chunks);
                    result.files.push(uploadFile);
                }
            });
        });

        busboy.on('field', (fieldname: string, value: string) => {
            result[fieldname] = value;
        });

        busboy.on('error', (error: Error) => {
            reject(error);
        });

        busboy.on('finish', () => {
            resolve(result);
        });

        const encoding = event.isBase64Encoded ? 'base64' : 'binary';
        busboy.write(Buffer.from(event.body || '', encoding));
        busboy.end();
    });
};
