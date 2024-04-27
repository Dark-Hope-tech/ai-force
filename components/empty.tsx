import Image from "next/image";
interface EmptyProps{
    label: string
    emptyImageUrl: string
    className: string
}
export const Empty = ({label , emptyImageUrl,className}: EmptyProps) => {
    return (  
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className={className}>
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
 