export default function tempratureConvert(type:string,value:number|null){
    if(!value) return;
    if(type==="Fahrenheit"){
        return ((value * 9 / 5) + 32).toFixed(2)
    }else if(type==="Celsius"){
        return (value - 273.15).toFixed(2);
    }else if(type==="Kelvin"){
        return (value).toFixed(2);
    }
}