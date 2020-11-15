import { of, fromEvent } from 'rxjs';
import { map, mapTo, pluck } from 'rxjs/operators';

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

of(1, 2, 3, 4, 5)
	.pipe(map((value) => value * 10))
	.subscribe(console.info);

const keyup$ = fromEvent(document, 'keyup');
const keycode$ = keyup$.pipe(map((event) => event.code));
const keycodeWithPluck$ = keyup$.pipe(pluck('target'));

const pressed$ = keyup$.pipe(mapTo('Key Pressed!'));

keycode$.subscribe(console.info);
keycodeWithPluck$.subscribe(console.info);
pressed$.subscribe(console.info);
