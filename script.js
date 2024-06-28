function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
}

document.addEventListener("DOMContentLoaded", function() {
    var homeLink = document.getElementById("Home");
    var aboutLink = document.getElementById("About");
    var servicesLink = document.getElementById("Services");
    var contactLink = document.getElementById("Contact");
   

    function setActive(link) {
        homeLink.classList.remove("active");
        aboutLink.classList.remove("active");
        servicesLink.classList.remove("active");
        contactLink.classList.remove("active");
        link.classList.add("active");
    }

    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        setActive(homeLink);
    });

    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        setActive(aboutLink);
    });

    
    servicesLink.addEventListener("click", function(event) {
        event.preventDefault();
        setActive(servicesLink);
    });

    
    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        setActive(contactLink);
    });
});