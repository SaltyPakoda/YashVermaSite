function scaleFontSize(element) {
    var container = document.getElementById(element);

    // Reset font-size to 100% to begin
    container.style.fontSize = "100%";

    // Check if the text is wider than its container,
    // if so then reduce font-size
    if (container.scrollWidth > container.clientWidth) {
        container.style.fontSize = "70%";
    }
}

html {
	background: #1d1f20;
	margin:  0 4rem;
}

