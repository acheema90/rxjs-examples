import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const click$ = fromEvent(document, 'click');

// emit values till y > 600
click$
	.pipe(
		map((event) => ({
			x: event.clientX,
			y: event.clientY,
		})),
		takeWhile((val) => val.y < 600)
	)
	.subscribe(observer);
