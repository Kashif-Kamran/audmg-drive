import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '../ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label';
import { apiClient } from '@/api/client';
export default function FileUploadDialog() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadFile = (fileType: "audio" | "image") => {
        if (!fileInputRef?.current) return;
        fileInputRef.current.accept = fileType === 'audio' ? 'audio/*' : 'image/*';
        fileInputRef.current.click();

        fileInputRef.current.onchange = () => {
            const files = fileInputRef.current?.files;
            if (files && files.length > 0)
            {
                setSelectedFile(files[0]);
                console.log(files[0]);
            }
        }
    }

    const handleSubmit = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        setIsLoading(true);
        formData.append('file', selectedFile);
        await apiClient.post('upload', formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsLoading(false);
        setSelectedFile(null);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >Upload File</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Upload your files here. Click 'Audio' to upload an audio file and 'Image' to upload an image.
                    </DialogDescription>
                    <div className='py-4'>
                        <div className='flex border-2 justify-center items-center rounded-lg'>
                            <Label className='px-2 w-1/2 '> Uploaded File : </Label>
                            <Input className='border-0 ' disabled value={selectedFile?.name || 'Choose File'} />
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <div className='flex w-full gap-2'>
                        <Input ref={fileInputRef} className="hidden" type='file'>
                        </Input>
                        <Button variant={"secondary"} onClick={() => handleUploadFile('audio')} > Audio</Button>
                        <Button variant={"secondary"} onClick={() => handleUploadFile('image')}> Image</Button>
                    </div>
                    <Button disabled={isLoading} onClick={handleSubmit}>
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
