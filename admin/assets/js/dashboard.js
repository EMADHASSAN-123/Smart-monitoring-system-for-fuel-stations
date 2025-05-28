 document.addEventListener('click', function (e) {
      if (e.target.matches('[data-page]')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPage(page);
      }
    });

    function loadPage(page) {
      $('#main-content-area').html('<div class="text-center my-5"><div class="spinner-border" role="status"></div></div>');
      fetch(`components/${page}.html`)
        .then(res => res.ok ? res.text() : Promise.reject('الصفحة غير موجودة'))
        .then(html => {
          document.getElementById('main-content-area').innerHTML = html;
        })
        .catch(err => {
          document.getElementById('main-content-area').innerHTML = `<div class="alert alert-danger text-center">${err}</div>`;
        });
    }
    
