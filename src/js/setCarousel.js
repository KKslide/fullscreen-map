export default function (path) {
    if (sessionStorage.getItem('isCarousel')=='no') return false;
    let timer = parseInt(sessionStorage.getItem('timer'));
    if (timer) {
        setTimeout(() => {
            window.location.hash = '#/' + path
        }, timer * 1000);
    }
}