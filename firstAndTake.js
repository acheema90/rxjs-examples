import { fromEvent, of } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const number$ = of(1, 2, 3, 4, 5);
const click$ = fromEvent(document, 'click');

// emit only the first click that has y co-ordinate > 600
// first is like take(1) with a filter
click$
	.pipe(
		map((event) => ({
			x: event.clientX,
			y: event.clientY,
		})),
		first((val) => val.y > 600)
	)
	.subscribe(observer);

// take the first three emitted values
number$.pipe(take(3)).subscribe(observer);
