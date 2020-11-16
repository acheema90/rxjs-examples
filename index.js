import { fromEvent, interval } from 'rxjs';
import { map, reduce, take } from 'rxjs/operators';

function calculateScrollPercent(element) {
	const { scrollTop, scrollHeight, clientHeight } = element;
	return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const progressBar = document.querySelector('.progress-bar');

const scroll$ = fromEvent(document, 'scroll').pipe(
	map((event) => calculateScrollPercent(event.target.scrollingElement))
);

scroll$.subscribe((val) => {
	progressBar.style.width = `${val}%`;
});

interval(200)
	.pipe(
		take(10),
		reduce((total, current) => total + current, 0)
	)
	.subscribe({
		next: (val) => console.info('next', val),
		complete: () => console.info('Complete!'),
	});
