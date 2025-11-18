export const dropdownMenu = (function () {
  function handleDropdown(buttonId) {
    const menuBtn = document.getElementById(buttonId);
    const parent = menuBtn.parentElement;
    const dropdown = parent.children[1]; // Second child dropdown

    if (!dropdown) return;

    // Show when pointer enters the button
    menuBtn.addEventListener('mouseenter', () => {
      dropdown.style.display = 'block';
    });

    // When leaving the button, only hide if the pointer did NOT go into the dropdown
    menuBtn.addEventListener('mouseleave', (e) => {
      const to = e.relatedTarget;
      if (to && dropdown.contains(to)) {
        // Moved into the dropdown — do nothing
        return;
      }
      dropdown.style.display = 'none';
    });

    // When leaving the dropdown, hide unless the pointer went back to the button
    dropdown.addEventListener('mouseleave', (e) => {
      const to = e.relatedTarget;
      if (to && menuBtn.contains(to)) {
        // Moved back to the button — do nothing
        return;
      }
      dropdown.style.display = 'none';
    });

    // Keyboard accessibility: show on focus, hide on blur (but preserve if focus moved into dropdown)
    menuBtn.addEventListener('focus', () => {
      dropdown.style.display = 'block';
    });

    menuBtn.addEventListener('blur', (e) => {
      const to = e.relatedTarget;
      if (to && dropdown.contains(to)) return;
      dropdown.style.display = 'none';
    });

    // If dropdown contains focusable items and focus leaves it, hide unless focus went to the button
    dropdown.addEventListener('focusout', (e) => {
      const to = e.relatedTarget;
      if (to && (menuBtn.contains(to) || dropdown.contains(to))) return;
      dropdown.style.display = 'none';
    });
  }

  return { handleDropdown };
})();
