function isInWorkDay(dayStart, dayEnd, meetStart, meetLength) {
  const dayStartArr = dayStart.split(':').map((x) => parseInt(x,10));
  const dayEndArr = dayEnd.split(':').map((x) =>parseInt(x,10));
  const meetStartArr = meetStart.split(':').map((x) => parseInt(x,10));
  const meetLengthInHours = meetLength / 60;
  const meetEnd = meetStartArr.slice();

  meetEnd[0] += Math.trunc(meetLengthInHours);
  meetEnd[1] += (meetLengthInHours - Math.trunc(meetLengthInHours)) * 60;

  return (meetStartArr[0] >= dayStartArr[0]) && (meetEnd[0] <= dayEndArr[0] && meetEnd[1] <= dayEndArr[1]);
}

const a = isInWorkDay('08:00', '17:30', '14:00', 90);
const b = isInWorkDay('8:0', '10:0', '8:0', 120);
const c = isInWorkDay('08:00', '14:30', '14:00', 90);
const d = isInWorkDay('14:00', '17:30', '08:0', 90);
const e = isInWorkDay('8:00', '17:30', '08:00', 900);

console.log(a, b, c, d, e);
