
document.addEventListener('click', function (e) {
  var target =e.target;
  var parent = target.parentElement;
  var parentsParent = parent.parentElement;

  if (hasClass(e.target, 'dropdownButton') || hasClass(parent, 'dropdownButton') || hasClass(parentsParent, 'dropdownButton')) {
    var dropdown = document.querySelector('#dropdownNav');
    e.stopPropagation();
    dropdown.classList.toggle('is-active');

  }
}, false);

function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

