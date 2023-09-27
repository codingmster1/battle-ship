
function createFooter() {
    const footerBox = document.createElement("footer");
    const authorName = document.createElement("p");
    authorName.classList.add("footer-author");
    authorName.textContent = "Jeff Doyle 2023";
    const footerLink = document.createElement("a");
    footerLink.id = "footer-link";
    footerLink.setAttribute("href", "https://github.com/codingmster1/battle-ship");
    const gitHubLogo = document.createElement("i");
    gitHubLogo.classList.add("fa-brands", "fa-github", "fa-xl", "footer-logo");
    footerLink.appendChild(gitHubLogo);

    function getTheme() {
        return localStorage.getItem("theme");
    }

    function toggleDarkMode() {
        document.querySelector(":root").classList.toggle("dark");
        darkModeButton.classList.toggle("fa-moon");
        darkModeButton.classList.toggle("fa-sun");
    }

    function toggleDarkStorage() {
        if (getTheme() === "dark") {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    }

    function isBrowserDarkMode() {
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    }

    const darkModeButton = document.createElement("i");
    darkModeButton.id = "footer-dark-mode";
    darkModeButton.classList.add("fa-solid", "fa-moon", "fa-xl");
    darkModeButton.addEventListener("mousedown", function () {
        toggleDarkMode();
        toggleDarkStorage();
    });

    if (getTheme() === "dark" || (!getTheme() && isBrowserDarkMode())) {
        toggleDarkMode();
    }

    footerBox.appendChild(authorName);
    footerBox.appendChild(footerLink);
    footerBox.appendChild(darkModeButton);

    return footerBox;
}

export default createFooter;