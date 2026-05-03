// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const qs = (selector, parent = document) => parent.querySelector(selector);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".animate-fade");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  const tl_coudontwn = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".countdown",
      start: "top 85%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl_coudontwn.from(".months", { y: 100, opacity: 0 })       
    .from(".weeks", { y: 100, opacity: 0 }, "-=0.5")     
    .from(".days", { y: 100, opacity: 0 }, "-=0.5") 
    .from(".seconds", { y: 100, opacity: 0 }, "-=0.5");    

  const tl_timeline = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".time-box",
      start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  tl_timeline.from(".first", { x: -100, opacity: 0 })       
  .from(".second", { x: -100, opacity: 0 }, "-=0.5")     
  .from(".third", { x: -100, opacity: 0 }, "-=0.5") 
  .from(".four", { x: -100, opacity: 0 }, "-=0.5")    
  .from(".five", { x: -100, opacity: 0 }, "-=0.5");    

  const tl_dresscode = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".colors-grid",
      start: "top 85%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  tl_dresscode.from(".color1", { x: -100, opacity: 0 })       
  .from(".color2", { x: -100, opacity: 0 }, "-=0.5")     
  .from(".color3", { x: -100, opacity: 0 }, "-=0.5") 
  .from(".color4", { x: -100, opacity: 0 }, "-=0.5")    
  .from(".color5", { x: -100, opacity: 0 }, "-=0.5");   


  const toggle = document.getElementById('nav-toggle');
  const menu = document.querySelector('.menu-items');
  const icon = document.querySelector('.hamburger-lines');
  const container = document.querySelector(".navbar-container");

  if (toggle && menu && icon && container) {
    document.addEventListener('click', (e) => {
      const isInside = container.contains(e.target) || icon.contains(e.target);
      if (!isInside) {
        toggle.checked = false;
      }
    });

  }

  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        // Cuộn mượt
        window.scrollTo({
          top: targetEl.offsetTop + 10,
          behavior: "smooth"
        });
      }

      // Đóng menu
      toggle.checked = false;

    });
  });

  // const qrcode = document.getElementById('qr-btn');
  // qrcode.addEventListener("click", toggleQR);

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());    
  initMusic();

  const form = document.forms["rsvp-form"];
  const formEn = document.forms["rsvp-form-en"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e, "vi"));
  }

  if (formEn) {
    formEn.addEventListener("submit", (e) => handleFormSubmit(e, "en"));
  }

});

function initMusic() {
  const audio = qs("#audio");
  const icon = qs("#iconSvg");
  const btn = qs("#player-btn");
  const label = qs("#musicLabel");

  if (!audio || !icon || !btn || !label) return;

  let isOpen = true;

  // 👉 GSAP timeline cho label
  const tl = gsap.timeline({ paused: true });

  tl.to(label, {
    x: 200,
    // opacity: 0,
    duration: 1,
    ease: "power2.inOut",
     pointerEvents: "none"
  });

  const closeMusicLabel = () => {
    if (!isOpen) return;
    tl.play();
    isOpen = false;
  };

  const openMusicLabel = () => {
    if (isOpen) return;
    tl.reverse();
    isOpen = true;
  };

  const playMusic = () => {
    if (!audio.src) return Promise.reject(new Error("Audio source not found"));

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      return playPromise.then(() => {
        closeMusicLabel();
      });
    }

    closeMusicLabel();
    return Promise.resolve();
  };

  window.playWeddingMusic = playMusic;

  btn.addEventListener("click", () => {
    if (!audio.src) return;
    if (audio.paused) {
      playMusic().catch((error) => {
        console.warn("Cannot play music:", error);
      });
    } else {
      audio.pause();
      openMusicLabel();
    }
  });

  audio.addEventListener("play", () => icon.classList.add("spin"));
  audio.addEventListener("pause", () => icon.classList.remove("spin"));
}

function toggleQR(e) {
  e.preventDefault();
  Swal.fire({
      title: "",
      text: "",
      imageUrl: "https://pub-d341ea7ec201435598469d75d8c4a056.r2.dev/tranganh-max/75EA6A3B-466F-4638-8345-1B7F4E9CB36E_1_105_c.jpeg",
      imageWidth: '100%',
      imageHeight: "auto",
      imageAlt: "Custom image",
      html: `
          <div class="qrcode-box">
              <div class="item">
                  <div class="info">
                      <p>NGUYEN THI TRANG ANH</p>
                      <p>8828 2905 1998</p>
                      <p>Techcombank</p>
                  </div>
                  <div class="qrcode-img">
                      <img src="assets/images/qrcode_brown_5a3a21.png" alt="">
                  </div>
              </div>
          </div>
      `,
      confirmButtonColor: "#5a3a21ff"
  });
}

async function handleFormSubmit(e, lang = "en") {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const {
    name,
    confirm,
    guest_number,
    wish,
  } = data;

  // =========================
  // i18n Messages
  // =========================
  const messages = {
    vi: {
      sendingTitle: "Đang gửi...",
      sendingText: "Vui lòng chờ trong giây lát",
      successTitle: "Thành công!",
      successText:
        "Cảm ơn bạn đã xác nhận. Thông tin đã được chuyển đến cô dâu và chú rể rồi nha.",
      errorTitle: "Lỗi!",
      errorServer: "OPPS! Không tìm thấy server",
      errorRetry: "Thử lại",
    },
    en: {
      sendingTitle: "Sending...",
      sendingText: "Please wait a moment",
      successTitle: "Success!",
      successText:
        "Thank you for your confirmation. Your information has been forwarded to the bride and groom.",
      errorTitle: "Error!",
      errorServer: "OPPS! Server not found",
      errorRetry: "Try again",
    },
  };

  const t = messages[lang] || messages.en;

  // =========================
  // Loading popup
  // =========================
  Swal.fire({
    title: t.sendingTitle,
    text: t.sendingText,
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });


  const sheetURL = "https://script.google.com/macros/s/AKfycbz_tpimLbXOl5C19NdtT77-Exw6mekjDxBaSSV8ihs4PkPN6alngal8ona2rGNfuW6-Dw/exec?sheet=confirm";

  try {
    const res = await fetch(sheetURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        wish,
      }),
    });

    // Nếu server lỗi HTTP
    if (!res.ok) {
      throw new Error("Server response not OK");
    }

    const result = await res.json().catch(() => null);

    if (!result) {
      Swal.fire({
        title: t.errorTitle,
        text: t.errorServer,
        icon: "error",
        confirmButtonText: t.errorRetry,
        confirmButtonColor: "#3c7fc2",
      });
      return;
    }

    form.reset();

    Swal.fire({
      title: t.successTitle,
      text: t.successText,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3c7fc2",
    });
  } catch (error) {
    console.error("Error:", error);

    Swal.fire({
      title: t.errorTitle,
      text: error.message || t.errorServer,
      icon: "error",
      confirmButtonText: t.errorRetry,
      confirmButtonColor: "#3c7fc2",
    });
  }
}
