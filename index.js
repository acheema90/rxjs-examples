import { fromEvent, of, from } from 'rxjs';
import { scan, map, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';

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

const number$ = of(1, 1, 2, 3, 3, 3, 4, 5, 3, 2, 5, 5);

// removes dupicates if value didn't change
// emits 1,2,3,4,5,3,2,5
number$.pipe(distinctUntilChanged()).subscribe(observer);

const user = [
	{ name: 'Brian', loggedIn: false, token: null },
	{ name: 'Brian', loggedIn: true, token: 'abc' },
	{ name: 'Brian', loggedIn: true, token: '123' },
];

const state$ = from(user).pipe(
	scan((accumulator, currentValue) => {
		return { ...accumulator, ...currentValue };
	}, {})
);

state$
	.pipe(
		/*
		 * If comparing based on a property you can use
		 * the distinctUntilKeyChanged helper operator instead.
		 */
		distinctUntilKeyChanged('name')
		/*
		 * If you need to use a custom comparer, you can
		 * pass distinctUntilChanged a comparer function.
		 * ex. distinctUntilChanged((prev, curr) => {
		 *   return prev.name === curr.name;
		 * })
		 */
	)
	.subscribe(observer);
