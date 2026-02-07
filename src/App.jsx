import { useState, useEffect, useRef } from "react";
import lovesvg from "./assets/AllYouNeedIsLove.svg";
import lovesvg2 from "./assets/LoveInTheAir.svg";

// Begging GIFs for "No" clicks
const beggingGifs = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JraWxteGo4Y2p5MHBjY3BrYWY3ODlvYnJ1ZHJyYzl5N3hldW0ybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TydZAW0DVCbGE/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTF1dmducDF6MHJvZDN0Zzhxbzkzbm10Z2s3MnRzOG5vMWE3cHQ2ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qQdL532ZANbjy/giphy.gif"
];

// NO button phrases
const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again?",
  "Please 🥺",
  "Don't break my heart 💔",
  "Last chance!",
  "Say Yes ❤️"
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [noMsg, setNoMsg] = useState(phrases[0]);

  // Start with the initial cute GIF
  const [currentGif, setCurrentGif] = useState(
    "https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.webp"
  );

  const yesButtonSize = noCount * 18 + 18;
  const yesRef = useRef(null);

  // Floating hearts background
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.className = "fixed text-xl pointer-events-none animate-bounce";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "-20px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    setNoCount((p) => p + 1);
    setIsMoved(true);

    // Move randomly inside/around YES button
    const range = 50; 
    const randomX = (Math.random() - 0.5) * range;
    const randomY = (Math.random() - 0.5) * range;
    setNoPos({ x: randomX, y: randomY });

    // Random NO phrase
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setNoMsg(randomPhrase);

    // Random GIF
    const randomGif = beggingGifs[Math.floor(Math.random() * beggingGifs.length)];
    setCurrentGif(randomGif);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-purple-200 relative overflow-hidden text-center px-4">
      {yesPressed ? (
        <LoveExperience />
      ) : (
        <div className="flex flex-col items-center gap-6 relative w-full">
          {/* Floating love SVGs */}
          <img
            src={lovesvg}
            className="fixed top-10 left-6 w-28 animate-pulse opacity-80 hover:opacity-100 transition-opacity"
            alt="love svg"
          />
          <img
            src={lovesvg2}
            className="fixed bottom-16 right-10 w-32 animate-pulse opacity-80 hover:opacity-100 transition-opacity -z-10"
            alt="love svg 2"
          />

          {/* GIF */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <img
              src={currentGif}
              className="h-56 md:h-64 rounded-2xl shadow-2xl mb-4 relative z-10 border-4 border-white/50 hover:scale-105 transition-transform duration-300"
              alt="cute or begging gif"
            />
          </div>

          <h1 className="text-4xl md:text-6xl my-6 font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            Will you be my Valentine?
          </h1>

          <div className="flex gap-6 relative justify-center items-center w-full">
            <div className="relative flex items-center justify-center">
              {/* YES Button */}
              <button
                ref={yesRef}
                onClick={() => setYesPressed(true)}
                style={{ fontSize: `${yesButtonSize}px` }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all z-10 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-2 border-white/30"
              >
                Yes
              </button>

              {/* NO Button overlapping YES */}
              <button
                onClick={handleNoClick}
                style={{
                  position: isMoved ? "absolute" : "static",
                  transform: isMoved
                    ? `translate(${noPos.x}px, ${noPos.y}px) scale(${Math.max(
                        0.4,
                        1 - noCount * 0.1
                      )})`
                    : "none",
                  transition: "all 0.1s ease",
                  whiteSpace: "nowrap"
                }}
                className={`bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-2xl z-20 shadow-lg hover:shadow-xl border-2 border-white/30 ${
                  !isMoved ? "ml-4" : ""
                }`}
              >
                {noMsg}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 💖 LOVE EXPERIENCE PAGE */
function LoveExperience() {
  const audioRef = useRef(null);
  const params = new URLSearchParams(window.location.search);
  const sender = params.get("sender") || "Someone";
  const receiver = params.get("receiver") || "My Love";

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-6 min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-200">
      <audio
        ref={audioRef}
        src="https://www.bensound.com/bensound-music/bensound-love.mp3"
        loop
      />
      <Confetti />
      <HeartCursor />
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg animate-bounce mt-8">
        {sender} ❤️ {receiver}
      </h1>
      <RomanticSlider />
      <LoveLetter receiver={receiver} />
      <LoveTimer />
      <button
        onClick={() => window.location.reload()}
        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/30"
      >
        Replay ❤️
      </button>
    </div>
  );
}

/* 💌 LOVE LETTER */
function LoveLetter({ receiver }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const message = `Dear ${receiver},\n\nYou make my world brighter,\nmy heart happier,\nand my life more beautiful.\n\nEvery moment with you feels special.\nI truly love you ❤️`;

    let i = 0;
    const t = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [receiver]);

  return (
    <div className="relative max-w-md mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-2 border-rose-300 overflow-hidden">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"></div>

      <pre className="relative z-10 text-gray-800 font-medium whitespace-pre-line leading-relaxed text-lg">
        {text}
      </pre>
    </div>
  );
}

/* 🎉 Confetti */
function Confetti() {
  return (
    <>
      {Array.from({ length: 70 }).map((_, i) => (
        <div
          key={i}
          className="fixed w-3 h-3 rounded-full animate-bounce opacity-70"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            background: `linear-gradient(135deg, ${
              ['#f43f5e', '#ec4899', '#a855f7', '#f97316'][Math.floor(Math.random() * 4)]
            }, ${
              ['#fb7185', '#f472b6', '#c084fc', '#fb923c'][Math.floor(Math.random() * 4)]
            })`
          }}
        />
      ))}
    </>
  );
}

/* 🖼️ Romantic GIF slider */
const sliderGifs = [
  "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2V4dGprOGZ2bXJ1eWNndndnY2lrbGRzYnhuc2t0bHJmaDZnZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HJibfnd7xqk5hAMD4v/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTF1dmducDF6MHJvZDN0Zzhxbzkzbm10Z2s3MnRzOG5vMWE3cHQ2ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qQdL532ZANbjy/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWUyZjNjbWNua3c2bWV4ZHJ0aXN5eDNmNjByNW94emFrZXhpZXUzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iLx58xyVxELdqzWtki/giphy.gif"
];

function RomanticSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((p) => (p + 1) % sliderGifs.length);
    }, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
      <img
        src={sliderGifs[index]}
        className="w-64 md:w-80 rounded-2xl shadow-2xl relative z-10 border-4 border-white/50 transition-all duration-500"
        alt="romantic gif"
      />
    </div>
  );
}

/* ❤️ Heart cursor */
function HeartCursor() {
  useEffect(() => {
    const move = (e) => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.position = "fixed";
      heart.style.left = e.clientX + "px";
      heart.style.top = e.clientY + "px";
      heart.style.pointerEvents = "none";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 500);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return null;
}

/* ⏳ Love timer */
function LoveTimer() {
  const startDate = new Date("2024-01-01");
  const [time, setTime] = useState("");
  useEffect(() => {
    const i = setInterval(() => {
      const diff = new Date() - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setTime(`${days} days together ❤️`);
    }, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border-2 border-rose-300">
      <div className="text-rose-600 font-bold text-xl">{time}</div>
    </div>
  );
}
