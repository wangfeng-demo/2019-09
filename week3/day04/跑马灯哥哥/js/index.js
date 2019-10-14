let wiper = document.getElementById('wiper'),
    box = document.getElementById('box')
wiper.innerHTML += wiper.innerHTML;
setInterval(() => {
    if (box.scrollLeft >= 400) {
      box.scrollLeft = 0;
    }
    box.scrollLeft++
}, 17)