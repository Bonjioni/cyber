import "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

// Initialize cookie consent
window.addEventListener("load", () => {
  const cc = window.initCookieConsent();
  
  cc.run({
    current_lang: "en",
    autoclear_cookies: true,
    page_scripts: true,
    
    gui_options: {
      consent_modal: {
        layout: "cloud",
        position: "bottom center",
        transition: "slide",
        swap_buttons: false
      },
      settings_modal: {
        layout: "box",
        position: "left",
        transition: "slide"
      }
    },

    languages: {
      en: {
        consent_modal: {
          title: "We use cookies!",
          description: "We use cookies to enhance your browsing experience and analyze our traffic. By clicking \"Accept all\", you consent to our use of cookies.",
          primary_btn: {
            text: "Accept all",
            role: "accept_all"
          },
          secondary_btn: {
            text: "Settings",
            role: "settings"
          }
        },
        settings_modal: {
          title: "Cookie preferences",
          save_settings_btn: "Save settings",
          accept_all_btn: "Accept all",
          blocks: [{
            title: "Essential cookies",
            description: "These cookies are necessary for the website to function properly.",
            toggle: {
              value: "necessary",
              enabled: true,
              readonly: true
            }
          }, {
            title: "Analytics cookies",
            description: "These cookies help us understand how visitors interact with our website.",
            toggle: {
              value: "analytics",
              enabled: false,
              readonly: false
            }
          }]
        }
      }
    },

    onAccept: function(cookie) {
      if (cookie.categories.includes("analytics")) {
        // Google Analytics (GA4)
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=YOUR-GA4-ID";
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "YOUR-GA4-ID");

        // Hotjar
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
          a=o.getElementsByTagName("head")[0];
          r=o.createElement("script");r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,"https://static.hotjar.com/c/hotjar-",".js?sv=");
      }
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    const formData = new FormData(contactForm);
    console.log("Form submitted:", Object.fromEntries(formData));
    
    alert("Thank you for your message. We will contact you within 24 hours.");
    contactForm.reset();
  });
}