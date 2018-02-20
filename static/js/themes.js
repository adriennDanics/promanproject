themes = {
    addEventListenerForDarkTheme: function (){
        document.getElementById("dark-theme").addEventListener("click", themes.handleEventListenerForDarkTheme, false)
    },

    addEventListenerForFunTheme: function () {
        document.getElementById("fun-theme").addEventListener("click", themes.confirmHandlingForFunTheme, false)
    },
    handleEventListenerForDarkTheme: function () {
        dataHandler.setTheme("dark");
        let lettersFas = document.getElementsByClassName("fas");
        for(let i=0;i<lettersFas.length;i++) {
            lettersFas[i].classList.add("dark")
        }
        let lettersFar = document.getElementsByClassName("far");
        for(let i=0;i<lettersFar.length;i++) {
            lettersFar[i].classList.add("dark")
        }
        let cardsClass = document.getElementsByClassName("card");
        for(let i=0;i<cardsClass.length;i++) {
            cardsClass[i].classList.add("dark")
        }
        let newBoardButton = document.getElementsByClassName("btn-outline-info");
        for(let i=0;i<newBoardButton.length;i++) {
            newBoardButton[i].classList.add("dark")
        }
        let header = document.getElementsByTagName("h1");
        for(let i=0;i<header.length;i++) {
            header[i].classList.add("dark")
        }
        let cardsForBoards = document.getElementsByClassName("row");
        for(let i=0;i<cardsForBoards.length;i++) {
            cardsForBoards[i].classList.remove("bg-light");
            cardsForBoards[i].classList.add("bg-dark")
        }
        let allDivs = document.getElementsByTagName("div");
        for(let i=0;i<allDivs.length;i++) {
            allDivs[i].classList.add("dark");
        }
        document.body.style.backgroundImage = "url('/static/css/almostblackground.jpg')";
        let darkThemeButton = document.getElementById("dark-theme");
        darkThemeButton.classList.add("bg-light");
        darkThemeButton.classList.remove("bg-dark");
        darkThemeButton.innerText="Light";
        darkThemeButton.addEventListener("click", function () {
            dataHandler.setTheme("light");
            themes.handleEventListenerForLightTheme();
        }, false)
    },
    handleEventListenerForLightTheme:function () {
        dataHandler.setTheme("light");
        let oldStyle = document.getElementById("stylea");
        oldStyle.removeAttribute("href");
        oldStyle.setAttribute("href", "static/css/main.css");
        let lettersFas = document.getElementsByClassName("fas");
        for(let i=0;i<lettersFas.length;i++) {
            lettersFas[i].classList.remove("dark")
        }
        let lettersFar = document.getElementsByClassName("far");
        for(let i=0;i<lettersFar.length;i++) {
            lettersFar[i].classList.remove("dark")
        }
        let cardsClass = document.getElementsByClassName("card");
        for(let i=0;i<cardsClass.length;i++) {
            cardsClass[i].classList.remove("dark")
        }
        let newBoardButton = document.getElementsByClassName("btn-outline-info");
        for(let i=0;i<newBoardButton.length;i++) {
            newBoardButton[i].classList.remove("dark")
        }
        let header = document.getElementsByTagName("h1");
        for(let i=0;i<header.length;i++) {
            header[i].classList.remove("dark")
        }
        let cardsForBoards = document.getElementsByClassName("row");
        for(let i=0;i<cardsForBoards.length;i++) {
            cardsForBoards[i].classList.add("bg-light");
            cardsForBoards[i].classList.remove("bg-dark")
        }
        let allDivs = document.getElementsByTagName("div");
        for(let i=0;i<allDivs.length;i++) {
            allDivs[i].classList.remove("dark");
        }
        document.body.style.backgroundImage = "url('/static/css/background.jpg')";
        let darkThemeButton = document.getElementById("dark-theme");
        darkThemeButton.classList.remove("bg-light");
        darkThemeButton.classList.add("bg-dark");
        darkThemeButton.innerText="Dark";
        darkThemeButton.addEventListener("click", function () {
            dataHandler.setTheme("dark");
            themes.handleEventListenerForDarkTheme();
        }, false)
    },
    themeHandler: function (theme) {
        if(theme === "dark") {
            themes.handleEventListenerForDarkTheme();
        } else if(theme === "light") {
            themes.handleEventListenerForLightTheme()
        } else if(theme === "fun"){
            themes.handleEventListenerForFunTheme()
        }
    },
     confirmHandlingForFunTheme: function () {
        let confirmation = confirm("The page needs to reload for new style!");
        if(confirmation === true){
            themes.handleEventListenerForFunTheme();
            location.reload();
        } else {
            themes.handleEventListenerForDarkTheme();
        }

    },
    handleEventListenerForFunTheme: function () {
        dataHandler.setTheme("fun");
        let oldStyle = document.getElementById("stylea");
        oldStyle.removeAttribute("href");
        oldStyle.setAttribute("href", "static/css/extratheme.css");

    }
};