export default function getTimeFromDateAndTimeString (dateString: string | null)  {
    if (!dateString) return;
    const dateTimeString = dateString
    const time = dateTimeString.split(" ")[1];
    const timeParts = time.split(":");
    const hourMinute = timeParts[0] + ":" + timeParts[1];
    return hourMinute;
}