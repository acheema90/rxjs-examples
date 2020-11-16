import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

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

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const click$ = fromEvent(document, 'click');

click$
	.pipe(
		map((event) => ({
			x: event.clientX,
			y: event.clientY,
		})),
		takeWhile((val) => val.y < 600)
	)
	.subscribe(observer);
