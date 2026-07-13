/* =====================================================
   EmailJS form handler for homepage and contact page
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.emailjs) {
    return;
  }

  // Allow runtime override via a global `window.EMAILJS_CONFIG` object.
  // Example (put this before the script tag in your HTML):
  // <script>window.EMAILJS_CONFIG = { publicKey:'YOUR_PUBLIC_KEY', serviceId:'YOUR_SERVICE_ID', templateId:'YOUR_TEMPLATE_ID' };</script>
  const defaultConfig = {
    publicKey: 'QwdONcu0_vdatEAJm',
    serviceId: 'service_r2q6ke3',
    templateId: 'template_k3y0z4k'
  };

  const cfg = Object.assign({}, defaultConfig, window.EMAILJS_CONFIG || {});

  emailjs.init(cfg.publicKey);

  const serviceId = cfg.serviceId;
  const templateId = cfg.templateId;

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

      const getValueOr = (selectors, fallback) => {
        const value = getValue(selectors);
        return value || fallback;
      };

      const baseBusinessGoals = getValue(['[name="business_goals"]', '[name="message"]', '#message']);
      const inquiryLabel = form.id === 'crm-contact-form' ? 'CRM Consultation' : 'Digital Marketing Enquiry';

      const templateParams = {
        from_name: getValueOr(['[name="from_name"]', '[name="name"]', '#name'], 'Not provided'),
        from_email: getValueOr(['[name="from_email"]', '[name="email"]', '#email'], 'Not provided'),
        phone: getValueOr(['[name="phone"]', '#phone'], 'Not provided'),
        company_name: getValueOr(['[name="company_name"]'], 'Not provided'),
        city: getValueOr(['[name="city"]'], 'Not provided'),
        state: getValueOr(['[name="state"]'], 'Not provided'),
        package_name: getValueOr(['[name="package_name"]'], inquiryLabel),
        booking_slot: getValueOr(['[name="booking_slot"]'], 'Not specified'),
        otp_method: getValueOr(['[name="otp_method"]'], 'Not specified'),
        business_goals: baseBusinessGoals || 'Not provided',
        // Explicit destination and reply-to to ensure delivery to support inbox
        to_email: 'support@systemcaresitsolutions.com',
        reply_to: getValueOr(['[name="from_email"]', '[name="email"]', '#email'], 'support@systemcaresitsolutions.com')
      };

      try {
        console.log('EmailJS: sending', { serviceId, templateId, templateParams });
        const result = await emailjs.send(serviceId, templateId, templateParams);
        console.log('EmailJS: send result', result);
        form.reset();
        showStatus('Thanks! Your message has been sent successfully.');
      } catch (error) {
        console.error('EmailJS: send error', error);
        showStatus('Something went wrong while sending your message. Please try again.', true);
      } finally {
        setLoadingState(false);
      }
    });
  });
});
