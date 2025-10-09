const email = "brotechstudio299@gmail.com";
const emailLink = document.getElementById('EmailLink');
if(window.innerWidth <= 500) {
    emailLink.href = `mailto:${email}`;
    emailLink.removeAttribute("target");
} else { 
    emailLink.href =`https://mail.google.com/mail/?view=cm&to=${email}`;

}