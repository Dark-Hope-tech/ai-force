import Image from "next/image";
const Loader = () => {
    return (  
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-24 h-24 relative animate-bounce">
                <Image
                    alt=""
                    fill
                    src="/orangecat.png"
                />
            </div>
            <div className="font-bold animate-out">
                Orange Cat is Thinking.....
            </div>
        </div>
    );
}
 
export default Loader;