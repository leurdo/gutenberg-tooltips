import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

const content = ref => {
	const imageUrl = ref.getAttribute('data-timageurl');
	const tooltipText = ref.getAttribute('data-tooltip');

	if (imageUrl) {
		return `<div class="g-tooltips-wrapper"><img src="${imageUrl}" alt="">${tooltipText}</div>`;
	}

	return `<div class="g-tooltips-wrapper">${tooltipText}</div>`;
}

window.onload = () => {
	tippy('.g-tooltip', {
		theme: 'translucent',
		content: content,
		allowHTML: true,
	});
}
