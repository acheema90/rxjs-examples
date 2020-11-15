import { of } from 'rxjs';

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const source$ = of([1], 2, 3, 4, 5);

source$.subscribe(observer);
