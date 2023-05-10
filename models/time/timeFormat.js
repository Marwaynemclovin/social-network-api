function timeFormat(date) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    };
    const auLocale = Intl.DateTimeFormat('en-AU', options);
    return auLocale.format(date);
  }
  
  module.exports = timeFormat;
  