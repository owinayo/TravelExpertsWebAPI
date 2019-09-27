
document.addEventListener('click', function (e) {
  if (hasClass(e.target, 'dropdownButton')) {
    var dropdown = document.querySelector('#dropdownNav');
    e.stopPropagation();
    dropdown.classList.toggle('is-active');

  }
}, false);

function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

