import { interval } from 'rxjs';
import { reduce, take } from 'rxjs/operators';

interval(200)
	.pipe(
		take(10),
		reduce((total, current) => total + current, 0)
	)
	.subscribe({
		next: (val) => console.info('next', val),
		complete: () => console.info('Complete!'),
	});
