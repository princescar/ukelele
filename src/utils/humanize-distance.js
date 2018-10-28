export default function(meter) {
  if (meter == null || isNaN(meter) || meter === 1) {
    return '';
  } else if (meter < 1000) {
    return meter + 'm';
  } else {
    return (Math.floor(meter / 100) / 10) + 'km';
  }
}