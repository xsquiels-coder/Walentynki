emailjs.init("sd7nee8blhK_fv9ae");

const SERVICE_ID = "service_ifx7dx4";
const TEMPLATE_ID = "template_r2cwf83";

let noCount = 0;
let yesClicked = false;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const counter = document.getElementById("counter");
const question = document.getElementById("question");
const response = document.getElementById("response");

document.addEventListener("keydown", e => {
    if (["Escape", "F5"].includes(e.key)) e.preventDefault();
});

function moveNoButton() {
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const maxX = containerRect.width - btnWidth;
    const maxY = containerRect.height - btnHeight;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.onclick = () => {
    if (yesClicked) return;
    noCount++;
    counter.textContent = `Kliknięć NIE: ${noCount}`;
    const texts = [
        "Na pewno nie chcesz? 😢",
        "Ale czemu nie chcesz? 🥺",
        "Serce pęka 💔",
        "Miłość walczy dalej 💕",
        "Hmm… decyzja należy do Ciebie 😐"
    ];
    question.textContent = texts[Math.min(noCount-1, texts.length-1)];
    moveNoButton();

    if (noCount >= 10) {
        yesBtn.style.transform = `scale(${1 + noCount*0.07})`;
        document.body.style.animation = "shake 0.2s infinite";
        setTimeout(()=>document.body.style.animation="",800);
    }

    if (noCount === 15) {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: "xsquiels@gmail.com",
            message: "💔 Anastazja NIE zgodziła się zostać Twoją walentynką"
        }).then(()=> {
            document.body.innerHTML = "";
            document.body.style.background="black";
        });
    }
};

yesBtn.onclick = () => {
    yesClicked = true;
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: "xsquiels@gmail.com",
        message: "🔥 Anastazja zgodziła się zostać Twoją walentynką 💖🔥"
    });

    document.querySelector(".buttons").style.display = "none";
    question.style.display = "none";
    counter.style.display = "none";
    response.classList.remove("hidden");
    launchConfetti();
};

const valentines = new Date("2026-02-14");
setInterval(()=> {
    const now = new Date();
    const diff = valentines - now;
    const days = Math.max(0, Math.floor(diff / (1000*60*60*24)));
    document.getElementById("countdown").textContent = `⏳ Do Walentynek: ${days} dni`;
},1000);

if (new Date().getHours()<=5) document.body.classList.add("night");

setInterval(()=> {
    const heart = document.createElement("span");
    heart.innerHTML="💖";
    heart.style.left=Math.random()*100+"vw";
    heart.style.fontSize=Math.random()*25+20+"px";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(()=>heart.remove(),6000);
},250);

function launchConfetti() {
    for(let i=0;i<100;i++){
        const c=document.createElement("span");
        c.innerHTML="🎉";
        c.style.left=Math.random()*100+"vw";
        c.style.fontSize=Math.random()*30+15+"px";
        document.querySelector(".confetti").appendChild(c);
        setTimeout(()=>c.remove(),2000);
    }
      }
