import React from 'react';
import { Card as ShadcnCard, CardContent, CardFooter } from '@/components/ui/card';

type AudioCardProps = {
    title: string;
    audioUrl: string;
};

const AudioCard: React.FC<AudioCardProps> = ({ title, audioUrl }) => {
    return (
        <ShadcnCard className="rounded-lg overflow-hidden flex-1 flex-shrink-1 min-w-[24rem] max-w-[32rem] shadow-md bg-primary-foreground shadow-primary-foreground">
            <CardContent className="p-4">
                <audio controls className="w-full">
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </CardContent>
            <CardFooter>
                <p className="text-center w-full">{title}</p>
            </CardFooter>
        </ShadcnCard>
    );
};

export default AudioCard;
