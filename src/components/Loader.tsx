import { FC } from "react"

interface LoadingProps {

}

const Loader: FC<LoadingProps> = () => {
    return (
        <div className="flex flex-col items-center relative ">
            <div className="animate-spin rounded-full h-20 z-20 w-20 border-t-4 border-b-4 border-b-green-700 border-t-red-700" />
            <span className="absolute font-bold top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"> Loading</span>
        </div>
    );
}

export default Loader;