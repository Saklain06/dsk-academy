var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.slick();
      Init.wow();
      Init.achivementCountdown();
      Init.magnifying();
      Init.searchToggle();
      Init.contactForm();
      Init.checkBoxes();
      Init.dropdown();
    },
    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").fadeOut("slow");
      }, 1500);
    },
    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($("header").length) {
          var headerScrollPos = 130;
          var stricky = $("header");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("bg-white");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("bg-white");
          }
        }
      });
      $(document).ready(function () {
        $(".nav-link").on("click", function (e) {
          e.preventDefault();

          $(".nav-link").removeClass("active");
          $(this).addClass("active");
        });
      });
    },
    slick: function () {
      if ($(".brand-slider").length) {
        $(".brand-slider").slick({
          autoplay: !0,
          autoplaySpeed: 0,
          speed: 10000,
          arrows: !1,
          swipe: !0,
          slidesToShow: 6,
          cssEase: "linear",
          pauseOnFocus: !1,
          pauseOnHover: !1,
          responsive: [
            { breakpoint: 1025, settings: { slidesToShow: 4 } },
            { breakpoint: 490, settings: { slidesToShow: 2 } },
          ],
        });
      }
      if ($(".testimonial-slider").length) {
        $(".testimonial-slider").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: !0,
          autoplaySpeed: 3000,
          speed: 900,
          infinite: !0,
          autoplay: !0,
          dots: true,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          responsive: [{ breakpoint: 821, settings: { slidesToShow: 1 } }],
        });
      }
      if ($(".blog-slider").length) {
        $(".blog-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: !0,
          autoplaySpeed: 3000,
          speed: 900,
          infinite: !0,
          autoplay: !0,
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          responsive: [
            { breakpoint: 999, settings: { slidesToShow: 2 } },
            { breakpoint: 747, settings: { slidesToShow: 1 } },
          ],
        });
      }
      if ($(".categories-slider").length) {
        $(".categories-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: !0,
          autoplaySpeed: 3000,
          speed: 900,
          infinite: !0,
          autoplay: true,
          draggable: !0,
          arrows: false,
          lazyLoad: "progressive",
          responsive: [
            { breakpoint: 1025, settings: { slidesToShow: 3 } },
            { breakpoint: 821, settings: { slidesToShow: 2 } },
            { breakpoint: 777, settings: { slidesToShow: 1 } },
          ],
        });
      }
      if ($(".course-slider").length) {
        $(".course-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 900,
          infinite: true,
          centerMode: false,
          dots: false,
          draggable: true,
          arrows: false,
          lazyLoad: "progressive",
          responsive: [
            { breakpoint: 999, settings: { slidesToShow: 2 } },
            { breakpoint: 777, settings: { slidesToShow: 1 } },
          ],
        });
      }

      if ($(".categories-slider").length) {
        $(
          ".course-slider1, .course-slider2, .course-slider3, .course-slider4"
        ).each(function () {
          const $slider = $(this);
          if (!$slider.hasClass("slick-initialized")) {
            $slider.slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              speed: 900,
              infinite: true,
              centerMode: false,
              dots: false,
              draggable: true,
              arrows: false,
              lazyLoad: "progressive",
              responsive: [
                { breakpoint: 999, settings: { slidesToShow: 2 } },
                { breakpoint: 777, settings: { slidesToShow: 1 } },
              ],
            });
          }
        });
      }

  //     // 1️⃣ Store original content of each tab
  //     $(".tab-pane").each(function () {
  //       $(this).data("original", $(this).html());
  //     });

  //     // 2️⃣ On tab click
  //     $('a[data-bs-toggle="pill"]').on("click", function (e) {
  //       const targetTab = $($(this).attr("data-bs-target"));

  //       // Immediately show preloader before Bootstrap switches
  //       targetTab.html(`
  //   <div class="tab-preloader" style="text-align:center; padding:60px 0;">
  //     <div class="spinner-border text-primary" style="width:3rem; height:3rem;" role="status">
  //       <span class="visually-hidden">Loading...</span>
  //     </div>
  //   </div>
  // `);
  //     });

  //     // 3️⃣ After Bootstrap has shown the tab
  //     $('a[data-bs-toggle="pill"]').on("shown.bs.tab", function (e) {
  //       const targetTab = $($(this).attr("data-bs-target"));

  //       // Delay just a bit so loader is visible
  //       setTimeout(() => {
  //         // Replace loader with actual content
  //         targetTab.html(targetTab.data("original"));

  //         // Re-init or refresh Slick sliders inside this tab
  //         targetTab
  //           .find(
  //             ".course-slider1, .course-slider2, .course-slider3, .course-slider4"
  //           )
  //           .each(function () {
  //             const $slider = $(this);
  //             if ($slider.hasClass("slick-initialized")) {
  //               $slider.slick("setPosition").slick("refresh");
  //             } else {
  //               $slider.slick({
  //                 slidesToShow: 3,
  //                 slidesToScroll: 1,
  //                 autoplay: true,
  //                 autoplaySpeed: 3000,
  //                 speed: 900,
  //                 infinite: true,
  //                 centerMode: false,
  //                 dots: false,
  //                 draggable: true,
  //                 arrows: false,
  //                 lazyLoad: "progressive",
  //                 responsive: [
  //                   { breakpoint: 800, settings: { slidesToShow: 2 } },
  //                 ],
  //               });
  //             }
  //           });
  //       }, 900); // loader visible for ~0.6s
  //     });

  //     // 4️⃣ Slider arrows
  //     $(".btn-prev").on("click", function () {
  //       $(".tab-pane.active.show .slick-slider").slick("slickPrev");
  //     });
  //     $(".btn-next").on("click", function () {
  //       $(".tab-pane.active.show .slick-slider").slick("slickNext");
  //     });

  //     $("#pills-tab2 .nav-link").on("click", function (e) {
  //       e.preventDefault();
  //       const target = $(this).attr("data-bs-target");
  //       const tabContent = $("#pills-tabContent2");

  //       // Remove any previous loader
  //       tabContent.find(".tab-loader").remove();

  //       // Add loader overlay
  //       tabContent.append(`
  //   <div class="tab-loader text-center py-5" 
  //        style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:10;">
  //     <div class="spinner-border text-primary" style="width:3rem; height:3rem;" role="status">
  //       <span class="visually-hidden">Loading...</span>
  //     </div>
  //   </div>
  // `);

  //       // Delay switching to simulate loading
  //       setTimeout(() => {
  //         // Trigger Bootstrap's tab change
  //         new bootstrap.Tab(this).show();

  //         // Remove loader
  //         tabContent.find(".tab-loader").fadeOut(900, function () {
  //           $(this).remove();
  //         });
  //       }, 900);
  //     });

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: !0,
          live: !0,
        });
        wow.init();
      }
      $(document).ready(function () {
        // Agar skills section exist nahi karta to return kar do
        if (!$(".skills-wrapper").length) {
          return;
        }

        let animated = false;

        function animateSkills() {
          let section = $(".skills-wrapper");

          if (!section.length) return; // safety check

          let sectionTop = section.offset().top;
          let scrollBottom = $(window).scrollTop() + $(window).height();

          if (!animated && scrollBottom > sectionTop + 100) {
            animated = true;

            $(".progress-fill").each(function () {
              let finalWidth = $(this).data("width");
              $(this).css("width", finalWidth);
            });
          }
        }

        $(window).on("scroll", animateSkills);
        animateSkills(); // if already visible on load
      });

      $(document).ready(function () {
        var video = $("#myVideo")[0];
        var playBtn = $(".play-btn");

        $(".video-container").click(function () {
          if (video.paused) {
            video.play();
            playBtn.hide();
          } else {
            video.pause();
            playBtn.show();
          }
        });

        $(video).on("ended", function () {
          playBtn.show();
        });
      });

      const svgPlus = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
  <path d="M16 6.667V25.333M6.667 16H25.333" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

      const svgMinus = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
  <path d="M6.667 16H25.333" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

      if ($(window).width() < 768) {
        $(".togglebox").hide();
        $(".toggle-header").removeClass("mb-24").addClass("mb-0");
      }

      $(".toggle-icon").html(svgPlus);

      $(".toggle-header").on("click", function () {
        const box = $(this).next(".togglebox");
        const icon = $(this).find(".toggle-icon");

        box.slideToggle(200, () => {
          if (box.is(":visible")) {
            $(this).removeClass("mb-0").addClass("mb-24");
            icon.html(svgMinus);
          } else {
            $(this).removeClass("mb-24").addClass("mb-0");
            icon.html(svgPlus);
          }
        });
      });

      $(".reply-btn").on("click", function (e) {
        e.preventDefault();
        var replyForm = $(this).siblings(".reply-form");

        $(".reply-form").not(replyForm).slideUp();

        replyForm.slideToggle(250);
      });

      $(document).ready(function () {
        function calculateAverage() {
          let total = 0;
          let count = 0;

          $(".star-rating").each(function () {
            let selected = $(this).find("input[type=radio]:checked").val();
            if (selected) {
              total += parseInt(selected);
              count++;
            }
          });

          let avg = count > 0 ? (total / count).toFixed(1) : 0;
          $(".full-rating").text(avg);
        }

        $(".star-rating input").on("change", function () {
          calculateAverage();
        });

        calculateAverage();
      });
    },
    achivementCountdown: function () {
      var section = $(".counter-section");
      var hasEntered = false;

      if (section.length === 0) return;

      var initAnimate =
        $(window).scrollTop() + $(window).height() >= section.offset().top;
      if (initAnimate && !hasEntered) {
        hasEntered = true;
        this.counterActivate();
      }

      $(window).on(
        "scroll",
        function () {
          var shouldAnimate =
            $(window).scrollTop() + $(window).height() >= section.offset().top;

          if (shouldAnimate && !hasEntered) {
            hasEntered = true;
            this.counterActivate();
          }
        }.bind(this)
      );
    },

    counterActivate: function () {
      $(".counter-count .count").each(function () {
        var $this = $(this);
        $this.prop("Counter", 0).animate(
          {
            Counter: $this.text(),
          },
          {
            duration: 3500,
            easing: "swing",
            step: function (now) {
              $this.text(Math.ceil(now));
            },
          }
        );
      });
    },
    searchToggle: function () {
      if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
          e.preventDefault();
          $(".search-popup").toggleClass("active");
          $(".mobile-nav__wrapper").removeClass("expanded");
          $("body").toggleClass("locked");
        });
      }
    },

    magnifying: function () {
      if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: true,
          fixedContentPos: false,
        });
      }
    },

    checkBoxes: function () {
      $(".cusbtn").each(function (index) {
        const uniqueId = "goo-" + index;
        $(this).find('filter[id="goo"]').attr("id", uniqueId);
        $(this)
          .find('[filter="url(#goo)"]')
          .attr("filter", "url(#" + uniqueId + ")");
        $(this)
          .find('[style*="url(#goo)"]')
          .each(function () {
            let updatedStyle = $(this)
              .attr("style")
              .replace("url(#goo)", `url(#${uniqueId})`);
            $(this).attr("style", updatedStyle);
          });
      });
      $(".sub-checkboxes").hide();
      $(".arrow-block").click(function () {
        var subCheckboxes = $(this).next(".sub-checkboxes");
        var chevronIcon = $(this).find("i");
        subCheckboxes.slideToggle("fast");
        chevronIcon.toggleClass("fa-chevron-down fa-chevron-up");
      });
      $(".check-block, .sub-check-box").click(function (event) {
        event.stopPropagation();
      });

      $(document).ready(function () {
        $(".custom-checkbox").click(function () {
          $(this).toggleClass("active");
        });
      });
    },
    dropdown: function () {
      if ($(".toggle-sidebar").length) {
        $(".blog-filter").on("click", function () {
          $(".toggle-sidebar").animate({ left: "0" }, 300);
          $(".shop-sidebar-overlay").fadeIn(300);
          $("body").addClass("no-scroll");
        });
        $(".shop-sidebar-overlay").on("click", function () {
          $(".toggle-sidebar").animate({ left: "-800px" }, 300);
          $(this).fadeOut(300);
          $("body").removeClass("no-scroll");
        });
      }
      $(".wrapper-dropdown").each(function () {
        let $dropdown = $(this);
        let $arrow = $dropdown.find("svg");
        let $options = $dropdown.find(".topbar-dropdown");
        let $display = $dropdown.find(".selected-display");
        $dropdown.on("click", function (event) {
          event.stopPropagation();
          $(".wrapper-dropdown").not($dropdown).removeClass("active");
          $(".wrapper-dropdown svg").not($arrow).removeClass("rotated");
          $dropdown.toggleClass("active");
          $arrow.toggleClass("rotated");
        });
        $options.find("li").on("click", function (event) {
          event.stopPropagation();
          $display.text($(this).text());
          closeAllDropdowns();
        });
      });
      $(document).on("click", function () {
        closeAllDropdowns();
      });
      function closeAllDropdowns() {
        $(".wrapper-dropdown").removeClass("active");
        $(".wrapper-dropdown svg").removeClass("rotated");
      }
    },

    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "https://websitemakerz.com/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-16 mb-16'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-primary mt-16 mb-16'>There is an error</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
