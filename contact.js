/* =====================================================
   SCS Digital Marketing – contact.js
   Contact form validation and animation states
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  
  if (!form || !submitBtn || !formSuccess) return;

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
