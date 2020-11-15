import { Observable } from 'rxjs';

const observer = {
	next: (value) => console.info('next', value),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const observable = new Observable((sub) => {
	let count = 0;
	const id = setInterval(() => {
		sub.next(count);
		count += 1;
	}, 1000);
	return () => {
		console.info('called');
		clearInterval(id);
	};
});

console.info('before');
const subscription = observable.subscribe(observer);
const subscriptionTwo = observable.subscribe(observer);
subscription.add(subscriptionTwo);
setTimeout(() => subscription.unsubscribe(), 4000);
console.info('after');
