import { apiClient } from "../client";


export const getImages = async () => {
    return apiClient.get('/retrive?assettype=image');
}

export const getAudios = async () => {
    return apiClient.get('/retrive?assettype=audio');
}

export default { getImages, getAudios }