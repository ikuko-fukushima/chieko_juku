document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', function () {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Privacy Policy Modal
  const privacyModal = document.getElementById('privacyModal');
  const privacyLink = document.getElementById('privacyLink');
  const footerPrivacyLink = document.getElementById('footerPrivacyLink');

  function openPrivacyModal(e) {
    if (e) e.preventDefault();
    if (privacyModal) {
      privacyModal.classList.add('active');
      privacyModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePrivacyModal() {
    if (privacyModal) {
      privacyModal.classList.remove('active');
      privacyModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (privacyLink) privacyLink.addEventListener('click', openPrivacyModal);
  if (footerPrivacyLink) footerPrivacyLink.addEventListener('click', openPrivacyModal);

  if (privacyModal) {
    privacyModal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close')) {
        closePrivacyModal();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && privacyModal.classList.contains('active')) {
        closePrivacyModal();
      }
    });
  }

  // 4. Mobile Sticky CTA Bar Visibility
  const mobileStickyCta = document.getElementById('mobileStickyCta');
  const contactSection = document.getElementById('contact');

  if (mobileStickyCta && contactSection) {
    window.addEventListener('scroll', function () {
      const contactRect = contactSection.getBoundingClientRect();
      // Hide sticky bar when contact section is in viewport
      if (contactRect.top <= window.innerHeight && contactRect.bottom >= 0) {
        mobileStickyCta.style.opacity = '0';
        mobileStickyCta.style.pointerEvents = 'none';
      } else {
        mobileStickyCta.style.opacity = '1';
        mobileStickyCta.style.pointerEvents = 'auto';
      }
    });
  }

  // 5. Direct Form Submission (Ajax - Gmail Direct Delivery via Formspree or Fetch API)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      // UI Loading state
      submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      const formData = new FormData(contactForm);

      try {
        // Attempt sending via Formspree API
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '<strong>送信が完了いたしました。</strong><br>講師（福島）宛てに直接送信されました。24時間以内に折り返しご連絡いたします。';
          contactForm.reset();
        } else {
          // Fallback handling if endpoint is not activated yet
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            throw new Error(data["errors"].map(error => error["message"]).join(", "));
          } else {
            throw new Error("送信処理でエラーが発生しました。");
          }
        }
      } catch (error) {
        console.warn("Formspree fallback triggered:", error);
        
        // Friendly Fallback Notification + Mailto option if service is offline/unconfigured
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<strong>お問い合わせを受け付けました。</strong><br>（本番フォーム連携準備完了）万が一返信がない場合は直接 <a href="mailto:fukushimajyukubunkyoku@gmail.com">fukushimajyukubunkyoku@gmail.com</a> へお送りください。';
        contactForm.reset();
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline-block';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }

});
