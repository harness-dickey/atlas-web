function hashselect() {
    // alert("clicked...."+location.hash );
    drawRegionsMap(location.hash);
}
window.addEventListener("hashchange", hashselect, false);
