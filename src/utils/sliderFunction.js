export function slide(nbrSlide) {
    const slider = document.querySelector(".slider ul");
    const li = document.querySelector(".slider ul li");
    const liWidth = li?.offsetWidth;

    slider.style.transform = `translateX(${(liWidth * nbrSlide) * -1}px)`
}

export function resetActiveItem(newActiveItem) {
    const toReset = document.querySelector(".active");
    toReset?.classList.remove("active");
    newActiveItem.classList.add("active");
}

export function removeActiveItem() {
    const toRemove = document.querySelector(".active");
    toRemove?.classList.remove("active");
}  

export function secondsToMinutes(time) {
    // 0 + (songInfo.duration / 60).toString()[0] + "." + ((songInfo.duration / 60).toString().slice(2, 4) / 100 * 60).toFixed(0)}
    let seconds = ((time / 60).toString().slice(2, 4) / 100 * 60).toFixed(0)

    if (seconds.length < 2) {
        seconds = "0" + seconds
    }
    return "0" + (time / 60).toString()[0] + ":" + seconds
}
