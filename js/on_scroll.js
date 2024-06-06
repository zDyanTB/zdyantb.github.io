document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log(entry)
      // entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  // const hidden_elements = Array.prototype.slice.call(document.querySelectorAll(".reveal"), 0);
  setTimeout(function() {
    const hidden_elements = document.querySelectorAll(".reveal");
    console.log(hidden_elements);
    hidden_elements.forEach(el => observer.observe(el))
  }, 800);
});

