import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

const observer = {
	next: (val) => console.info('next', val),
	error: (error) => console.info('error', error),
	complete: () => console.info('complete!'),
};

const inputBox = document.getElementById('debounced-text');

const input$ = fromEvent(inputBox, 'keyup');
const click$ = fromEvent(document, 'click');

// emit only the latest click after every second pause
click$.pipe(debounceTime(1000)).subscribe(observer);

// emit only the latest value of input after every second pause
// avoids emitting the same value again
input$
	.pipe(debounceTime(1000), pluck('target', 'value'), distinctUntilChanged())
	.subscribe(observer);
