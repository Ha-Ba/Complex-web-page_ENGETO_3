// Responzivní menu
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector("nav");
const hamburgerIcon = document.querySelector(".fa-solid");
const menuItems = menuList.querySelectorAll("li a");
const mobileH1 = document.querySelector("h1");
const Main = document.querySelector("main");

menuIcon.addEventListener("click", () => {
  if (hamburgerIcon.classList[1] === "fa-bars") {
    hamburgerIcon.classList.add("fa-xmark");
    hamburgerIcon.classList.remove("fa-bars");
    menuList.style.display = "flex";
    mobileH1.style.marginTop = "12rem"
  } else {
    hamburgerIcon.classList.add("fa-bars");
    hamburgerIcon.classList.remove("fa-xmark");
    menuList.style.display = "none";
    mobileH1.style.marginTop = "0rem"
  }
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (hamburgerIcon.classList[1] === "fa-xmark") {
        hamburgerIcon.classList.remove("fa-xmark");
        hamburgerIcon.classList.add("fa-bars");
        menuList.style.display = "none";
        mobileH1.style.marginTop = "0rem";
    } else {
      hamburgerIcon.classList.add("fa-bars");
      hamburgerIcon.classList.remove("fa-xmark");
      menuList.style.display = "none";
      mobileH1.style.marginTop = "3rem";
    }
  });
});

// Přepínání light and dark mode
const switcher = document.querySelector(".switch input");
const themeIcon = document.querySelector(".switcher-description i");

const darkMode = () => {
  themeIcon.classList.replace("fa-sun", "fa-moon");
};

const lightMode = () => {
  themeIcon.classList.replace("fa-moon", "fa-sun");
};

const switchTheme = (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
  }
};

switcher.addEventListener("change", switchTheme);


// Mouseenter a mouseleave nad obrázky zasedaček - objevující se popisek
const allRooms = document.querySelector(".rooms");
const oneRoom = allRooms.querySelectorAll(".room");
const imagePar = allRooms.querySelectorAll(".room-par");

oneRoom.forEach((oneRoom) => {
  const paragraph = oneRoom.querySelector(".room-par");

  oneRoom.addEventListener("mouseenter", () => {
    oneRoom.style.transform = "scale(1.1)";
    paragraph.classList.remove("room-hidden");
    paragraph.classList.add("room-shown");
  });

  oneRoom.addEventListener("mouseleave", () => {
    oneRoom.style.transform = "scale(1.0)";
    paragraph.classList.remove("room-shown");
    paragraph.classList.add("room-hidden");
  });
});

// Countdown znaků a obarvování v textarea
const textarea = document.querySelector(".message");
const pCount = document.querySelector(".text-countdown");
const divCount = document.querySelector(".counter");

textarea.addEventListener("input", () => {
  const lettersCount = 500 - textarea.value.length;
  pCount.textContent = lettersCount;

  if (lettersCount <= 15) {
    textarea.style.color = "red";
  } else if (lettersCount < 25) {
    textarea.style.color = "orange";
  } else {
    textarea.style.color = "black";
  }
});

// Výběr divu s třídou .radio-buttons a uvnitř něj divu .inline-rb - pro rozšíření klikatelného pole pro výběr
const radioButtonsDiv = document.querySelector(".radio-buttons");
const inlineRbDivs = radioButtonsDiv.querySelectorAll(".inline-rb");

// Výběr radiobuttonu po kliknutí na příslušný div
inlineRbDivs.forEach(div => {
  div.addEventListener("click", () => {
    const rbInput = div.querySelector("input[type='radio']");
  
    if (rbInput) {
      rbInput.checked = true;
    };
  });
});

// Scrollování a viditelnost ikony
const scrollIcon = document.querySelector(".scroll-up i")
const scrollBox = document.querySelector(".scroll-up")

window.addEventListener("scroll", () => {
  const computedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (window.scrollY / computedScrollHeight) * 100;

  // Podmínka pro zobrazení ikony při scrollování nad určitá % scrollu
  if (scrollPercent >= 70) {
    scrollIcon.style.display = "block";
  } else {
    scrollIcon.style.display = "none";
  }
});

// Funkce pro scrollování nahoru do nuly
scrollBox.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Konstanty potřebné pro validaci formuláře a aktivaci buttonu submit
const formular = document.querySelector("form");
const email1 = formular.querySelector(".mail1");
const email2 = formular.querySelector(".mail2");
const submitBtn = formular.querySelector(".submit-btn");
const mailDifferent = formular.querySelector(".mail-different");
const thanksMessage = formular.querySelector(".thanks");
const requiredFields = formular.querySelectorAll("input[required]");
const requiredRadioFields = formular.querySelectorAll(".selected-room[required]");

// Výchozí stav tlačítka submit nastaven na disabled
submitBtn.disabled = true;

// Funkce pro kontrolu shody e-mailů a aktivaci tlačítka
function validateForm() {
  const allFieldsFilled = Array.from(requiredFields).every(field => field.value.trim() !== "");

  // kontrola shody hodnot v poli email1 a email2 v reálném čase
  const emailsMatch = email1.value === email2.value;
  if (email2.value && !emailsMatch) {
    mailDifferent.style.display = "block";
  } else {
    mailDifferent.style.display = "none";
  }
  // Kontrola zaškrtnutého 1 radiobuttonu
  const oneRadioChecked = Array.from(requiredRadioFields).some(
    (radio) => radio.checked,
  );

  // Aktivace tlačítka pouze pokud jsou splněny podmínky a barevné ohraničení při splněných či nesplněných podmínkách pro odeslání
  submitBtn.disabled = !(allFieldsFilled && emailsMatch && oneRadioChecked);

  if (submitBtn.disabled) {
    formular.style.boxShadow = ".1rem .1rem 3rem rgba(196, 68, 68, 0.75)";
  } else {
    formular.style.boxShadow = ".1rem .1rem 3rem rgba(16, 90, 16, 0.9)";
  }
}

// Kontrola při změně hodnot v polích
email1.addEventListener("input", validateForm);
email2.addEventListener("input", validateForm);
requiredFields.forEach(field => field.addEventListener("input", validateForm));
requiredRadioFields.forEach(radio => radio.addEventListener("change", validateForm));

// Akce po odeslání formuláře
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Zamezení výchozímu odeslání formuláře
  submitBtn.style.maxWidth = "250px";
  submitBtn.value = "Odeslat další žádost";
  submitBtn.style.color = getComputedStyle(document.documentElement).getPropertyValue("--button-color");
  thanksMessage.style.display = "block";
  formular.style.boxShadow = "none";
  formular.style.borderRadius = "none";
  });

// Reload stránky po kliknutí na tlačítko "Odeslat další žádost"
  submitBtn.addEventListener("click", () => {
    if (submitBtn.value === "Odeslat další žádost") {
        location.reload();
    }
});
