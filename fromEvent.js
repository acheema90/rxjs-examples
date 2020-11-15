import { fromEvent } from 'rxjs';

const observer = {
	next: (event) => console.info('next', event.keyCode),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const source$ = fromEvent(document, 'keyup');

source$.subscribe(observer);
