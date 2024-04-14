import {FC} from "react"

interface LoadingProps {
    
}
 
const Loader: FC<LoadingProps> = () => {
    return ( 
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900"></div>
   );
}
 
export default Loader;