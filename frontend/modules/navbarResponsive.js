const menuBtn = document.querySelector('.menu-btn')
const navContent = document.querySelector('.nav-content');
const pageContent = document.querySelectorAll('.page-content')

module.exports = () => {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active')
        navContent.classList.toggle('active')
        pageContent.forEach(content => content.classList.toggle('active'))
    })
    
    
    document.querySelectorAll('.nav-link').forEach( link => {
        link.removeAttribute('area-current')
        if(link.href === window.location.href){
            link.setAttribute('area-current','page')
        }
    })
}