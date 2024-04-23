import Image from "next/image";
interface EmptyProps{
    label: string
    emptyImageUrl: string
}
export const Empty = ({label , emptyImageUrl}: EmptyProps) => {
    return (  
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative w-80 h-96">
                <Image
                    src={emptyImageUrl}
                    alt="EMPTY"
                    fill
                />
            </div>
            <p className="text-muted-foreground text-sm text-center font-bold mt-4">
                {label}            
            </p>
        </div>
    );
}
 