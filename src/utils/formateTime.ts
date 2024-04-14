import { timeStamp } from "console";
import moment from "moment";

export default function formateTime(timestamp:number|null){
        if(!timestamp) return ;
        return  moment.unix(timestamp).format(' h:mm a');

} 