
import AudioCard from "@/components/audio-card"
interface AudioTabInterface {
    audios: { signedUrl: string, fileName: string, fileType: string }[]
}

function AudiosTab({ audios }: Readonly<AudioTabInterface>) {
    return (
        <div className='flex gap-2 p-4 flex-wrap justify-center'>
            {audios.map((audio) => {

                return <AudioCard
                    key={audio.fileName}
                    title={audio.fileName}
                    audioUrl={audio.signedUrl}
                />

            })}
        </div>
    )
}

export default AudiosTab