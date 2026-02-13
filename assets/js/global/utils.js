export function splitTextToSpans(element, className = 'char') {
  if (!element) return;
  
  const text = element.innerText;
  const chars = text.split('');
  
  element.innerHTML = '';
  
  chars.forEach(char => {
    const span = document.createElement('span');
    span.classList.add(className);
    span.innerText = char;
    if (char === ' ') {
      span.style.width = '0.3em';
      span.style.display = 'inline-block';
    } else {
      span.style.display = 'inline-block';
    }
    element.appendChild(span);
  });
}
