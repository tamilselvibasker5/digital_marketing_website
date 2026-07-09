/* =====================================================
   EmailJS form handler for homepage and contact page
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.emailjs) {
    return;
  }

  emailjs.init({ publicKey: 'QwdONcu0_vdatEAJm' });

  const serviceId = 'service_r2q6ke3';
  const templateId = 'template_k3y0z4k';

  document.querySelectorAll('[data-emailjs-form]').forEach((form) => {
    const submitButton = form.querySelector('[type="submit"]');
    const btnText = submitButton?.querySelector('.btn-text') || null;
    const btnLoader = submitButton?.querySelector('.btn-loader') || null;
    const originalButtonText = submitButton && !btnText ? submitButton.textContent : '';
    const statusBox = form.querySelector('[data-form-status]');
    const originalStatusText = statusBox?.textContent || '';

    const setLoadingState = (isLoading) => {
      if (!submitButton) return;

      submitButton.disabled = isLoading;

      if (btnText && btnLoader) {
        btnText.style.display = isLoading ? 'none' : 'inline';
        btnLoader.style.display = isLoading ? 'inline' : 'none';
        return;
      }

      if (originalButtonText) {
        submitButton.textContent = isLoading ? 'Sending...' : originalButtonText;
      }
    };

    const showStatus = (message, isError = false) => {
      if (statusBox) {
        statusBox.textContent = message;
        statusBox.style.display = 'block';
        statusBox.style.background = isError ? 'rgba(255, 82, 90, 0.1)' : 'rgba(34, 197, 94, 0.1)';
        statusBox.style.border = isError ? '1px solid rgba(255, 82, 90, 0.3)' : '1px solid rgba(34, 197, 94, 0.3)';
        statusBox.style.color = isError ? '#b91c1c' : '#166534';
        return;
      }

      window.alert(message);
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setLoadingState(true);
      if (statusBox) {
        statusBox.textContent = originalStatusText;
        statusBox.style.display = 'none';
      }

      const getValue = (selectors) => {
        for (const selector of selectors) {
          const field = form.querySelector(selector);
          if (field && typeof field.value === 'string') {
            return field.value.trim();
          }
        }
        return '';
      };

      const templateParams = {
        from_name: getValue(['[name="from_name"]', '[name="name"]', '#name']),
        from_email: getValue(['[name="from_email"]', '[name="email"]', '#email']),
        phone: getValue(['[name="phone"]', '#phone']),
        company_name: getValue(['[name="company_name"]']),
        city: getValue(['[name="city"]']),
        state: getValue(['[name="state"]']),
        package_name: getValue(['[name="package_name"]']),
        booking_slot: getValue(['[name="booking_slot"]']),
        otp_method: getValue(['[name="otp_method"]']),
        business_goals: getValue(['[name="business_goals"]', '[name="message"]', '#message']),
      };

      try {
        await emailjs.send(serviceId, templateId, templateParams);
        form.reset();
        showStatus('Thanks! Your message has been sent successfully.');
      } catch (error) {
        showStatus('Something went wrong while sending your message. Please try again.', true);
      } finally {
        setLoadingState(false);
      }
    });
  });
});
