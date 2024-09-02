import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react"; // Optional: For a download icon

interface ImageCardProps {
    imageUrl: string;
    imageTitle: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, imageTitle }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = imageTitle || "downloaded-image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-w-[24rem] max-w-[32rem] flex-1 flex-shrink-1 rounded-md  overflow-hidden shadow-lg bg-primary-foreground shadow-primary-foreground">
            <img
                className="w-full h-64 object-cover"
                src={imageUrl}
                alt={imageTitle}
            />
            <div className="px-6 py-2">
                <p className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {imageTitle}
                </p>
            </div>
            <div className="px-2 pb-2 flex justify-end">
                <Button onClick={handleDownload}>
                    View Image
                </Button>
            </div>
        </div>
    );
};

export default ImageCard;
