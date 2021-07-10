import Swal from 'sweetalert2/dist/sweetalert2.js'

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

///console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}

const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');
const btnStart = document.querySelector('button[data-start]');
const inputCalendar = document.querySelector('#date-selector');

const timeInterval = null;
let chooseDay = null;
let restTime = null;


const timing = () => {
  const currentTime = Date.parse(new Date());
  chooseDay = Date.parse(inputCalendar.value);
  restTime = (chooseDay - currentTime);

  let getTime = convertMs(restTime);
  let days = getTime.days < 10 ? ('0' + getTime.days).slice(-2) : getTime.days;
  let hours = getTime.hours < 10 ? ('0' + getTime.hours).slice(-2) : getTime.hours;
  let minutes = getTime.minutes < 10 ? ('0' + getTime.minutes).slice(-2) : getTime.minutes;
  let seconds = getTime.seconds < 10 ? ('0' + getTime.seconds).slice(-2) : getTime.seconds;

  valueDays.innerHTML = days;
  valueHours.innerHTML = hours;
  valueMinutes.innerHTML = minutes;
  valueSeconds.innerHTML = seconds;
}

const startTimer = () => {
  if (Date.parse(inputCalendar.value) - Date.parse(new Date())) {
    timeInterval = setInterval(timing, 1000);
  }
  clearInterval(timeInterval);
}

btnStart.addEventListener('click', startTimer);

const inputDate = () => {
if (Date.parse(inputCalendar.value) <= Date.parse(new Date())) {
  btnStart.setAttribute('disabled','true');
  clearInterval(timeInterval);
  Swal.fire({
    title: 'Please choose a date in the future',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
} else if (Date.parse(inputCalendar.value) >= Date.parse(new Date()) && btnStart.hasAttribute('disabled')) {
  btnStart.removeAttribute('disabled');
 }
 return;
}

inputCalendar.addEventListener('change', inputDate);




