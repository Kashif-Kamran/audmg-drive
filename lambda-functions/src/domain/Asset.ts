
interface AssetInterface {
    userId: string,
    orignalName: string,
    s3BucketKey: string,
    fileType: "image" | "audio"
}

export { AssetInterface }