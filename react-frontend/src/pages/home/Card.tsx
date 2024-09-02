import React from 'react';
import { Card as ShadcnCard, CardContent, CardFooter } from '@/components/ui/card';

type CardProps = {
    title: string;
    imageUrl?: string;
    audioUrl?: string;
};

const Card: React.FC<CardProps> = ({ title, imageUrl, audioUrl, }) => {
    return (
        <ShadcnCard className=" bg-secondary shadow-md rounded-lg overflow-hidden flex-1 flex-shrink-1 min-w-[300px] max-w-[500px] m-2">

            <CardContent className="p-4">
                {imageUrl && <img src={imageUrl} alt={title} className="w-full h-52 object-cover rounded-md" />}
                {audioUrl && (
                    <audio controls className="w-full mt-4">
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </CardContent>
            <CardFooter>
                <p className='text-center w-full'>{title}</p>
            </CardFooter>
        </ShadcnCard>
    )
};

export default Card;
