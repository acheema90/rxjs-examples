import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const pressedEnter$ = fromEvent(document, 'keyup').pipe(
	map((event) => event.code),
	filter((code) => code === 'Enter')
);

pressedEnter$.subscribe(console.info);
