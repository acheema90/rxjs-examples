import { from } from 'rxjs';

function* hello() {
	yield 'Hello';
	yield 'World';
}

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const stringObs = from('string');
const promiseObs = from(fetch('https://api.github.com/users/acheema90'));
const iterableObs = from(hello());

stringObs.subscribe(observer);
promiseObs.subscribe(
	async (res) => console.info('next', await res.json()),
	(error) => console.info('error', error),
	() => console.info('complete!')
);
iterableObs.subscribe(observer);
