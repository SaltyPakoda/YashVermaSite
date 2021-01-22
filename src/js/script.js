document.addEventListener("DOMContentLoaded", () => {
    const scrollWidthRight = 264; //The maximum distance the cursor can be at from the extreme right of the screen before it stops scrolling right
    const scrollWidthLeft = 140; // Same but for left
    const scrollSpeed = 6000; // Scroll Speed per second
    const pollDelay = 0.5; // Milliseconds between scroll tries, less polldelay = more smooth scrolling
    const minimumFactor = 0.1;
    const maximumFactor = 4;
    const factorDelta = maximumFactor - minimumFactor;
    const scrollElement = document.getElementsByClassName("scrolling-wrapper-flexbox")[0];
    const leftDebug = document.getElementById("left");
    const rightDebug = document.getElementById("right");

    let sizeX = document.documentElement.clientWidth;
    let rightThreshold = 0;
    let leftThreshold = 0;
    let mouseX = 0;
    let dir = 0;

    function calculateThresholds()
    {
        rightThreshold = sizeX - scrollWidthRight;
        leftThreshold = scrollWidthLeft;
        leftDebug.style.width = `${scrollWidthLeft}px`;
        rightDebug.style.width = `${scrollWidthRight}px`;
    }

    calculateThresholds();

    window.addEventListener("resize", (e) => {
        sizeX = document.documentElement.clientWidth;
        calculateThresholds();
    })

    document.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        dir = mouseX > rightThreshold ? 1 : mouseX < leftThreshold ? -1 : 0;

        if (dir === 1)
        {
            dir = (((mouseX - rightThreshold)/scrollWidthRight) * factorDelta) + minimumFactor;
        }
        else if (dir === -1)
        {
            dir = -((((leftThreshold - mouseX) / scrollWidthLeft) * factorDelta) + minimumFactor);
        }
    });

    setInterval(() => {
        scrollElement.scrollBy(scrollSpeed * dir * pollDelay/1000, 0);
    }, pollDelay);
});