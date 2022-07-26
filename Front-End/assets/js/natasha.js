currentShown = "what"
currentShown2 = "what"

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("whyWrapper").hidden = true
    document.getElementById("howWrapper").hidden = true
    document.getElementById("whyWrapper2").hidden = true
    document.getElementById("howWrapper2").hidden = true
});

function nextSectionOneBtn() {
    switch (currentShown) {
        case "what":
            document.getElementById("whatWrapper").hidden = true
            document.getElementById("whyWrapper").hidden = false
            document.getElementById("howWrapper").hidden = true
            currentShown = "why"
            break;

        case "why":
            document.getElementById("whatWrapper").hidden = true
            document.getElementById("whyWrapper").hidden = true
            document.getElementById("howWrapper").hidden = false
            currentShown = "how"
            break;

        case "how":
            document.getElementById("whatWrapper").hidden = false
            document.getElementById("whyWrapper").hidden = true
            document.getElementById("howWrapper").hidden = true
            currentShown = "what"
            break;

        default:
            break;
    }
}

function nextSectionOneBtn2() {
    switch (currentShown2) {
        case "what":
            document.getElementById("whatWrapper2").hidden = true
            document.getElementById("whyWrapper2").hidden = false
            document.getElementById("howWrapper2").hidden = true
            currentShown2 = "why"
            break;

        case "why":
            document.getElementById("whatWrapper2").hidden = true
            document.getElementById("whyWrapper2").hidden = true
            document.getElementById("howWrapper2").hidden = false
            currentShown2 = "how"
            break;

        case "how":
            document.getElementById("whatWrapper2").hidden = false
            document.getElementById("whyWrapper2").hidden = true
            document.getElementById("howWrapper2").hidden = true
            currentShown2 = "what"
            break;

        default:
            break;
    }
}