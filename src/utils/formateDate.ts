export default function formatDate(dateString:string|null|number) {
    if(!dateString) return
    const options:Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

