function toggle_theme() {
  const elements = document.querySelectorAll('.dark-mode');

  elements.forEach(el => {
    el.classList.toggle('light');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const switch_mode = document.getElementById('switch-mode');

  switch_mode.addEventListener('click', function() {
    const switch_icon = document.getElementById('switch-icon');

    switch_icon.classList.toggle('fa-moon')
    switch_icon.classList.toggle('fa-sun')

    toggle_theme();

  });

});
