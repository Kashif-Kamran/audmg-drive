import { AssetInterface } from "@domain/Asset";
import { model, Document, Schema } from "mongoose";
export interface AssetDocument extends AssetInterface, Document { }
const AssetSchema = new Schema<AssetDocument>({
    orignalName: {
        type: String,
    },
    s3BucketKey: {
        type: String,
    },
    fileType: {
        type: String,
    },
    userId: {
        type: String,
        ref: "User",
    },
});

const AssetModel = model<AssetDocument>("Assets", AssetSchema);
export default AssetModel;