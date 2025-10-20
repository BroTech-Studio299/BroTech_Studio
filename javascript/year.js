// chnage the year in the footer dynamically without manual updates
const yearSpan = document.getElementById('current-year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;