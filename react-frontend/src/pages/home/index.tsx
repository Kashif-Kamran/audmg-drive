import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from '@/components/nav-bar'
import AudiosTab from './audios-tab'
import ImagesTab from './images-tab'
import { useEffect, useState } from "react"
import retriveApi from "@/api/retrive"
function Home() {
    const [images, setImages] = useState<{ fileName: string, fileType: string, signedUrl: string }[]>([]);
    const [audios, setAudios] = useState<{ fileName: string, fileType: string, signedUrl: string }[]>([]);

    useEffect(() => {
        retriveApi.getImages().then((response) => {
            setImages(response.data.data)
        }).catch((error) => {
            console.log(error)
        });

        retriveApi.getAudios().then((response) => {
            setAudios(response.data.data)
        }).catch((error) => {
            console.log(error)
        });
    }, [])


    return (
        <div>
            <Navbar />
            <div className='w-full p-4'>

                <Tabs defaultValue="images" className="w-full ">
                    <div className='flex justify-center'>
                        <TabsList className='border-2 w-1/2 lg:w-1/4'>
                            <TabsTrigger className='w-1/2' value="images">Images </TabsTrigger>
                            <TabsTrigger className='w-1/2' value="audios">Audios</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="images"><ImagesTab images={images} /></TabsContent>
                    <TabsContent value="audios"><AudiosTab audios={audios} /></TabsContent>
                </Tabs>
            </div>


        </div>
    )
}

export default Home