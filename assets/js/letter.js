(() => {
  "use strict";

  const qs = (selector, parent = document) => parent.querySelector(selector);

  function initTimeline() {
    const section = document.querySelector(".letter-section");
    if (!section) return;

    const content = section.querySelector(".content");
    const invitation = section.querySelector(".invitation");
    const logo = section.querySelector(".logo-img");
    const wife = section.querySelector(".wife");
    const husband = section.querySelector(".husband");
    // const ampersand = section.querySelector(".ampersand");
    const openVi = section.querySelector(".open-card-vi");
    const openEn = section.querySelector(".open-card-en");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        toggleActions: "play none none none",
      }
    });

    // =========================
    // Section intro
    // =========================


    tl.fromTo(
      content,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    tl.fromTo(
      invitation,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );

    tl.from(
      logo,
      {
        rotateY: -180,
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        transformOrigin: "center center"
      },
      "-=0.5"
    );

    tl.fromTo(
      husband,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    );

    // tl.fromTo(
    //   ampersand,
    //   { opacity: 0, y: 50, filter: "blur(10px)" },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 1,
    //     ease: "power2.out",
    //     clearProps: "filter"
    //   },
    //    "-=1"
    // );

    tl.fromTo(
      wife,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    );

    // tl.fromTo(
    //   divider,
    //   {
    //     rotation: -120,
    //     scale: 0,
    //     opacity: 0
    //   },
    //   {
    //     rotation: 0,
    //     scale: 1,
    //     opacity: 1,
    //     duration: 1.2,
    //     ease: "back.out(1.6)",
    //     transformOrigin: "50% 50%"
    //   },
    //   "-=0.4"
    // );

    tl.fromTo(
      ".welcome",
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );

    tl.fromTo(
      openVi,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );

    tl.fromTo(
      openEn,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );

    // tl.from(date, { y: 100, opacity: 0 }, "-=0.4");
  }

  function initSwitchLanguage() {
    if (typeof Swal === "undefined") return;

    const currentFile = window.location.pathname.split("/").pop() || "";

    const STORAGE_KEY = "wedding_lang";
    const langFiles = {
      vi: "thiepmoivi.html",
      en: "thiepmoien.html",
    };
    const langLabels = {
      vi: "Tiếng Việt",
      en: "Tiếng Anh",
    };

    const getLangFromCurrentFile = () => {
      return Object.keys(langFiles).find((lang) => langFiles[lang] === currentFile) || "";
    };

    const getCurrentLanguage = () => {
      const fileLang = getLangFromCurrentFile();
      if (fileLang) return fileLang;
      try {
        const saved = localStorage.getItem(STORAGE_KEY) || "";
        if (saved && langFiles[saved]) return saved;
      } catch (error) {
        console.warn("Cannot read language preference:", error);
      }
      return "";
    };

    const goToLanguageFile = (lang) => {
      const fileName = langFiles[lang];
      if (!fileName) return;

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (error) {
        console.warn("Cannot save language preference:", error);
      }

      const switchButton = document.getElementById("switch-language-btn");
      if (switchButton && langLabels[lang]) {
        switchButton.textContent = langLabels[lang];
      }

      if (currentFile === fileName) {
        Swal.close();
        return;
      }
      window.location.href = fileName;
    };

    const openLanguageModal = () => {
      Swal.fire({
        showConfirmButton: false,
        showCancelButton: false,
        showDenyButton: false,
        showCloseButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
        showClass: {
          popup: "animate__animated animate__fadeInDown animate__faster"
        },
        background: "#f8f6f2",
        backdrop: "rgba(0,0,0,0.4)",
        customClass: {
          popup: "wedding-lang-popup"
        },
        didOpen: () => {
          const container = Swal.getHtmlContainer();
          if (!container) return;

          container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="btn-group">
              <button id="btnEn" class="lang-btn">Tiếng Anh</button>
              <button id="btnVi" class="lang-btn">Tiếng Việt</button>
            </div>
            `
          );

          const btnVi = document.getElementById("btnVi");
          const btnEn = document.getElementById("btnEn");

          if (btnEn) btnEn.onclick = () => goToLanguageFile("en");
          if (btnVi) btnVi.onclick = () => goToLanguageFile("vi");
        }
      });
    };

    const ensureLanguageButton = () => {
      const existed = document.getElementById("switch-language-btn");
      if (existed) return;

      const styleId = "switch-language-btn-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          #switch-language-btn {
            position: fixed;
            top: 14px;
            left: 14px;
            z-index: 10000;
            border: 1px solid #5a3a21ff;
            background: rgba(255,255,255,0.92);
            color: #5a3a21ff;
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 13px;
            line-height: 1;
            cursor: pointer;
            font-family: 'Lora', sans-serif;;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          }
        `;
        document.head.appendChild(style);
      }

      const button = document.createElement("button");
      button.id = "switch-language-btn";
      button.type = "button";
      const currentLang = getCurrentLanguage();
      button.textContent = langLabels[currentLang] || "Tiếng Anh";
      button.setAttribute("aria-label", "Switch language");
      button.addEventListener("click", openLanguageModal);
      document.body.appendChild(button);
    };

    ensureLanguageButton();

    let savedLang = "";
    try {
      savedLang = localStorage.getItem(STORAGE_KEY) || "";
    } catch (error) {
      console.warn("Cannot read language preference:", error);
    }

    if (savedLang && langFiles[savedLang]) {
      if (currentFile !== langFiles[savedLang]) {
        window.location.href = langFiles[savedLang];
      }
      return;
    }
    openLanguageModal();
  }

  function initAnimations() {
    const animationMap = {
      flip: gsapFlipIn,
      "flip-yoyo": gsapFlipInThenYoyo,

      "fade-in": gsapFadeIn,
      "fade-in-end": gsapFadeInForEnd,
      "fade-in-yoyo": gsapFadeInThenYoyo,
      "fade-in-pulse": gsapFadeInThenPulse,

      "fade-right": gsapFadeRight,
      "fade-left": gsapFadeLeft,
      "fade-up": gsapFadeUp,
      "fade-down": gsapFadeDown,

      "rotate-bl": gsapRotateBottomLeft,
      "rotate-br": gsapRotateBottomRight,
      "rotate-bl-yoyo": gsapRotateBottomLeftThenYoyo,
      "rotate-br-yoyo": gsapRotateBottomRightThenYoyo,

      "flip-vertical-left": gsapFlipVerticalLeft,
      "flip-vertical-bottom": gsapFlipVerticalBottom,

      "roll-in-left": gsapRollInLeft,
      "rotate-bl--float": gsap_rotate_bl__float,
    };

    document.querySelectorAll("[data-animate]").forEach((el) => {
      const type = el.dataset.animate;
      const fn = animationMap[type];

      if (!fn) {
        console.warn(`Animation "${type}" not found.`);
        return;
      }

      const options = {
        delay: parseFloat(el.dataset.animateDelay) || 0,
        duration: parseFloat(el.dataset.animateDuration) || 1,
        scrollStart: el.dataset.animateScrollStart || "top 85%",
      };

      fn(el, options);
    });
  }

  /* ======================================================
       BOOTSTRAP
    ====================================================== */

  function init() {
    gsap.registerPlugin(ScrollTrigger);
    initAnimations();
    initSwitchLanguage();
    initTimeline();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
