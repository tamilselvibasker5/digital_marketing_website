/* =====================================================
   SCS Digital Marketing – contact_crm.js
   CRM Contact form validation and animation states
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crm-contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  
  if (!form || !submitBtn || !formSuccess) return;

  // If EmailJS is handling this form (marked with data-emailjs-form), skip the local simulated submit.
  if (form.dataset.emailjsForm !== undefined) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check basic HTML validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    submitBtn.disabled = true;

    // Simulate form submission API call
    setTimeout(() => {
      // For debugging: collect form values (including email)
      const formData = {
        name: form.name?.value || '',
        email: form.email?.value || '',
        phone: form.phone?.value || '',
        message: form.message?.value || ''
      };
      console.log('Simulated CRM form submission payload:', formData);
      // Hide submit button and form groups, show success box
      form.querySelectorAll('.form-group').forEach(group => {
        group.style.opacity = '0.3';
        group.style.pointerEvents = 'none';
      });
      
      submitBtn.style.display = 'none';
      formSuccess.style.display = 'block';
      form.reset();

      // Reset after 8 seconds to allow another message
      setTimeout(() => {
        form.querySelectorAll('.form-group').forEach(group => {
          group.style.opacity = '1';
          group.style.pointerEvents = 'auto';
        });
        submitBtn.style.display = 'flex';
        formSuccess.style.display = 'none';
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
      }, 8000);
      
    }, 1500);
  });
});
