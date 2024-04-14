import {FC} from "react"

interface LoadingProps {
    
}
 
const Loading: FC<LoadingProps> = () => {
    return ( 
    <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
  </div> );
}
 
export default Loading;