(function () {
      var btn = document.querySelector("[data-orkes-demo]");
      var inner = document.querySelector(".md-header__inner");
      if (!btn || !inner) return;
      inner.appendChild(btn);

      var IMG = "{{ 'img/demo-modal/' | url }}";
      var modal = null;
      var lastTrigger = btn;

      function formView() {
        return (
          '<div id="orkes-demo-form"><div class="orkes-demo-modal__spinner"></div></div>' +
          '<div class="orkes-demo-modal__dev">Are you a student or working on a personal project?' +
            '<a href="https://developer.orkescloud.com/" target="_blank" rel="noopener">Check out our developer edition here</a>' +
          '</div>'
        );
      }
      function showSubmitted() {
        modal.querySelector(".orkes-demo-modal__title").textContent = "You\u2019re all set!";
        modal.querySelector(".orkes-demo-modal__sub").textContent = "Form submitted successfully";
        modal.querySelector(".orkes-demo-modal__body").innerHTML =
          '<div class="orkes-demo-modal__done">' +
            '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#10B981"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '<h3>Thanks for submitting a demo request</h3>' +
            '<p>A team member will reach out shortly to schedule a time to connect.</p>' +
            '<button type="button" data-orkes-demo-done>Got it</button>' +
          '</div>';
        modal.querySelector("[data-orkes-demo-done]").addEventListener("click", close);
      }
      function createForm() {
        if (!window.hbspt) return;
        var submissionTracked = false;
        var submittedEmail = "";
        var formModal = modal;
        window.hbspt.forms.create({
          portalId: "20882608",
          formId: "e0553b12-5fe4-4b27-86a8-3e619c4f6319",
          target: "#orkes-demo-form",
          onFormReady: function () {
            var s = modal.querySelector(".orkes-demo-modal__spinner");
            if (s) s.remove();
          },
          onFormSubmit: function ($form, data) {
            // Preserve the existing conversion payload, but wait for HubSpot
            // to confirm receipt before emitting any conversion signal.
            submittedEmail = "";
            (data || []).forEach(function (f) { if (f.name === "email") submittedEmail = f.value; });
          },
          onFormSubmitted: function () {
            if (submissionTracked) return;
            submissionTracked = true;
            if (window.dataLayer) window.dataLayer.push({ event: "formSubmitted", leadsUserData: { email: submittedEmail } });
            if (window.lintrk) window.lintrk("track", { conversion_id: 19206580 });
            // The existing GTM HubSpot success listener owns form_submit_success.
            // Do not duplicate it here or count a CTA click as a conversion.
            if (modal === formModal) showSubmitted();
          },
        });
      }
      function loadHubSpot() {
        if (window.hbspt) return createForm();
        var s = document.createElement("script");
        s.src = "https://js.hsforms.net/forms/embed/v2.js";
        s.async = true;
        s.onload = createForm;
        s.onerror = function () {
          var f = modal.querySelector("#orkes-demo-form");
          if (f) f.innerHTML = '<p>Couldn\u2019t load the form. <a href="https://orkes.io/demo">Request a demo on orkes.io</a>.</p>';
        };
        document.head.appendChild(s);
      }
      function close() {
        // Remove the modal so the next open starts with a fresh form.
        if (modal) modal.remove();
        modal = null;
        document.body.style.overflow = "";
        lastTrigger.focus();
      }
      function onKey(e) {
        if (e.key === "Escape" && modal) close();
      }
      function open(trigger) {
        if (modal) return;
        lastTrigger = trigger;
        // Non-conversion event. No query strings, click IDs or personal data.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "docs_demo_cta_click",
          docs_cta_placement: trigger.getAttribute("data-docs-demo-placement") || "header",
          docs_guide: trigger.getAttribute("data-docs-guide") || "documentation",
          page_path: window.location.pathname,
        });
        modal = document.createElement("div");
        modal.className = "orkes-demo-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "orkes-demo-title");
        modal.innerHTML =
          '<div class="orkes-demo-modal__center">' +
            '<div class="orkes-demo-modal__card">' +
              '<button type="button" class="orkes-demo-modal__close" aria-label="Close"><img src="' + IMG + 'close-icon.svg" alt=""></button>' +
              '<div class="orkes-demo-modal__content">' +
                '<h2 id="orkes-demo-title" class="orkes-demo-modal__title">See Orkes in action</h2>' +
                '<p class="orkes-demo-modal__sub">Book a 30 minute demo and get access to an Enterprise Free Trial</p>' +
                '<div class="orkes-demo-modal__body" style="width:100%">' + formView() + '</div>' +
              '</div>' +
              '<div class="orkes-demo-modal__aside">' +
                '<img src="' + IMG + 'foxtel-logo.svg" alt="Foxtel" loading="lazy">' +
                '<p class="orkes-demo-modal__quote">\u201COrkes has been instrumental in increasing developer agility, creating cost efficiencies, and building highly reliable and secure applications. We\u2019re so impressed with the results that we are migrating more workflows from other platforms to Orkes and initiating all flows on Orkes.\u201D</p>' +
                '<div class="orkes-demo-modal__credit">' +
                  '<img src="' + IMG + 'thisara.png" alt="Thisara Alawala" loading="lazy">' +
                  '<div><span>Thisara Alawala,</span><span class="orkes-demo-modal__quote">Lead Architect, Foxtel</span></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
        document.body.appendChild(modal);
        modal.addEventListener("click", function (e) {
          if (e.target === modal || e.target.classList.contains("orkes-demo-modal__center")) close();
        });
        modal.querySelector(".orkes-demo-modal__close").addEventListener("click", close);
        document.body.style.overflow = "hidden";
        modal.querySelector(".orkes-demo-modal__close").focus();
        loadHubSpot();
      }
      document.addEventListener("keydown", onKey);
      document.addEventListener("click", function (e) {
        var trigger = e.target.closest && e.target.closest("[data-orkes-demo]");
        if (!trigger) return;
        e.preventDefault();
        open(trigger);
      });
    })();
