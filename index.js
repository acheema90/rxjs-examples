import { fromEvent, interval } from 'rxjs';
import { map, scan, take } from 'rxjs/operators';

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

// scan will emit the accumulated value on every iteration, not just on completion like reduce

interval(200)
	.pipe(
		take(10),
		scan((total, current) => total + current, 0)
	)
	.subscribe({
		next: (val) => console.info('next', val),
		complete: () => console.info('Complete!'),
	});
