import ImageCard from "@/components/image-card"
interface ImagesTabProps {
    images: { fileName: string, fileType: string, signedUrl: string }[]
}
function ImagesTab({ images }: Readonly<ImagesTabProps>) {
    return (
        <div className='flex gap-2 p-4 flex-wrap justify-center'>
            {images.map((image) => {

                return <ImageCard
                    key={image.fileName}
                    imageUrl={image.signedUrl}
                    imageTitle={image.fileName}
                />
            })}

        </div>
    )
}

export default ImagesTab