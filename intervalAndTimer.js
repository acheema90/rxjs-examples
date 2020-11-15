import { interval, timer } from 'rxjs';

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

// emits a value every three seconds
const interval$ = interval(3000);

// waits two seconds and emits a value every second
const timer$ = timer(2000, 1000);

interval$.subscribe(observer);

timer$.subscribe(console.info);
