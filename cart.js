// remove item from cart
document.addEventListener("DOMContentLoaded", function () {
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const row = btn.closest("tr");
      if (row) {
        row.remove();

      }
    });
  });
});