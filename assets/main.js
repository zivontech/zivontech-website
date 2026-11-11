
/* ZivonTech — Navigation */
document.querySelector('.menu')?.addEventListener('click', function () {
  const nav = document.querySelector('.links');
  nav.classList.toggle('open');
  this.setAttribute(
    'aria-expanded',
    String(nav.classList.contains('open'))
  );
});

/* ZivonTech — Formspree Enquiry Submission */
const enquiryForm = document.querySelector('#enquiry');

if (enquiryForm) {
  const submitButton = enquiryForm.querySelector(
    'button[type="submit"]'
  );

  const statusMessage = document.createElement('p');
  statusMessage.setAttribute('role', 'status');
  statusMessage.setAttribute('aria-live', 'polite');
  statusMessage.className = 'fine';
  submitButton.insertAdjacentElement('afterend', statusMessage);

  enquiryForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) return;

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    statusMessage.textContent = '';

    try {
      const response = await fetch(enquiryForm.action, {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        statusMessage.textContent =
          'Thank you! Your enquiry has been submitted successfully. ' +
          'Our team will get back to you shortly.';

        statusMessage.style.color = '#16803c';
        enquiryForm.reset();
      } else {
        statusMessage.textContent =
          'Sorry, your enquiry could not be submitted. ' +
          'Please try again or email admin@zivontech.com.';

        statusMessage.style.color = '#dc2626';
      }
    } catch (error) {
      statusMessage.textContent =
        'A connection error occurred. Please try again later ' +
        'or email admin@zivontech.com.';

      statusMessage.style.color = '#dc2626';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

/* ZivonTech — Scroll Animations */
if (
  'IntersectionObserver' in window &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches
) {
  const targets = document.querySelectorAll(
    '.section-head, .service, .split > div, .steps article, ' +
    '.chips span, .info-card, .contact-list > div, ' +
    '.contact-form, .cta-inner, .pagehero .wrap'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach((element) => {
    if (
      element.getBoundingClientRect().top >
      window.innerHeight * 0.9
    ) {
      element.classList.add('reveal-ready');
      observer.observe(element);
    }
  });
}
