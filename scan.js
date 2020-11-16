import { interval } from 'rxjs';
import { scan, take } from 'rxjs/operators';

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
