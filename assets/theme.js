(function () {
  let scrollYPos = 0;

  function initParallax() {
    if (window.__bkfkParallaxInitialized) return;
    window.__bkfkParallaxInitialized = true;

    window.addEventListener(
      "scroll",
      function () {
        scrollYPos = window.scrollY;
      },
      { passive: true }
    );

    function animateParallax() {
      var items = document.querySelectorAll(".parallax-item");
      items.forEach(function (item) {
        var speed = Number(item.dataset.speed || 1);
        var moveY = scrollYPos * speed * 0.1;
        item.style.transform = "translate3d(0px, " + -moveY + "px, 0)";
      });
      requestAnimationFrame(animateParallax);
    }

    animateParallax();
  }

  function initProductSwiper() {
    document.querySelectorAll(".bkfk-swiper-slider").forEach(function (el) {
      if (el.swiper) return;
      new Swiper(el, {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: false,
        slidesPerView: "auto",
        speed: 600,
        coverflowEffect: {
          rotate: 30,
          stretch: 50,
          depth: 120,
          modifier: 1,
          slideShadows: false
        },
        pagination: {
          el: el.querySelector(".swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: el.querySelector(".swiper-button-next"),
          prevEl: el.querySelector(".swiper-button-prev")
        }
      });
    });
  }

  function initReviewSwiper() {
    document.querySelectorAll(".bkfh-review-slider").forEach(function (el) {
      if (el.swiper) return;
      new Swiper(el, {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        breakpoints: {
          0: {
            slidesPerView: 1.4,
            spaceBetween: 15
          },
          550: {
            slidesPerView: 1.8,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2.4,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3.4,
            spaceBetween: 20
          },
          1440: {
            slidesPerView: 4.4,
            spaceBetween: 20
          }
        }
      });
    });
  }

  function initMadeChildSwiper() {
    document.querySelectorAll(".bkfk-made-child-card-group-slider").forEach(function (el) {
      if (window.innerWidth <= 1024) {
        if (!el.swiper) {
          new Swiper(el, {
            slidesPerView: "auto",
            spaceBetween: 15,
            centeredSlides: true,
            centeredSlidesBounds: true,
            slideToClickedSlide: true,
            loop: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            },
            speed: 600
          });
        }
      } else if (el.swiper) {
        el.swiper.destroy(true, true);
      }
    });
  }

  function initThemeScripts() {
    initParallax();
    initProductSwiper();
    initReviewSwiper();
    initMadeChildSwiper();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeScripts);
  } else {
    initThemeScripts();
  }

  if (!window.__bkfkResizeBound) {
    window.__bkfkResizeBound = true;
    window.addEventListener("resize", initMadeChildSwiper);
  }

  document.addEventListener("shopify:section:load", initThemeScripts);
})();
