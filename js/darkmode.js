
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    let darkMode = localStorage.getItem('darkMode');

    const enableDarkMode = () => {
        localStorage.setItem("darkMode", "enabled");
        let main = document.getElementById("main");
        main.className = "main-darkmode";
        main.classList.remove("main-lightmode");

        let body = document.getElementById("body");
        body.className = "body-darkmode";
        body.classList.remove("body-lightmode");

        let header = document.getElementById("header");
        header.className = "navFooter-darkmode";
        header.classList.remove("navFooter-lightmode");

        let footer = document.getElementById("footer");
        footer.className = "navFooter-darkmode";
        footer.classList.remove("navFooter-lightmode");

        let mainArticle = document.getElementById("h1");
        mainArticle.className = "header-darkmode";
        mainArticle.classList.remove("header-lightmode");

        let h1 = document.getElementById("h1");
        h1.className = "h1-darkmode";
        h1.classList.remove("h1-lightmode");

        try{
            let cartTotal = document.getElementById("cartTotal");
            cartTotal.className = "navFooter-darkmode";
            cartTotal.classList.remove("navFooter-lightmode");
        }catch{

        }
        try{
            let h2 = document.getElementById("h2");
            h2.className = "h2-darkmode";
            h2.classList.remove("h2-lightmode");
        }catch{

        }

        try{
            let weather = document.getElementById("weatherHeading");
            weather.className = "h2-darkmode";
            weather.classList.remove("h2-lightmode");
        }catch{

        }

    }

    const disableDarkMode = () => {
        localStorage.setItem("darkMode", null);
        let main = document.getElementById("main");
        main.className = "main-lightmode";
        main.classList.remove("main-darkmode");

        let body = document.getElementById("body");
        body.className = "body-lightmode";
        body.classList.remove("body-darkmode");

        let header = document.getElementById("header");
        header.className = "navFooter-lightmode";
        header.classList.remove("navFooter-darkmode");

        let footer = document.getElementById("footer");
        footer.className = "vavFooter-lightmode";
        footer.classList.remove("navFooter-darkmode");

        let mainArticle = document.getElementById("h1");
        mainArticle.className = "header-lightmode";
        mainArticle.classList.remove("header-darkmode");

        let h1 = document.getElementById("h1");
        h1.className = "h1-lightmode";
        h1.classList.remove("h1-darkmode");




        try{
            let cartTotal = document.getElementById("cartTotal");
            cartTotal.className = "navFooter-lightmode";
            cartTotal.classList.remove("navFooter-darkmode");


        }catch{

        }
        try{
            let h2 = document.getElementById("h2");
            h2.className = "h2-lightmode";
            h2.classList.remove("h2-darkmode");
        }catch{

        }
        try{
            let weather = document.getElementById("weatherHeading");
            weather.className = "h2-lightmode";
            weather.classList.remove("h2-darkmode");
        }catch{

        }

    }




    //sonst ist der darkmode nicht aktiv wenn die seite neu geladen wird :(
    if(darkMode === 'enabled'){
        enableDarkMode();
    }

    darkModeToggle.addEventListener("click", () => {
        darkMode = localStorage.getItem("darkMode");
        if(darkMode !== "enabled"){
            enableDarkMode();
            console.log(darkMode);
        }else{
            disableDarkMode();
            console.log(darkMode);
        }
    });


