import { useEffect } from 'react';

export function useKey(keyPress, callBack) {
	useEffect(() => {
		const keyPressFunc = (e) => {
			if (e.code.toLowerCase() === keyPress.toLowerCase()) {
				callBack();
			}
		};
		document.addEventListener('keydown', keyPressFunc);

		return () => {
			document.removeEventListener('keydown', keyPressFunc);
		};
	}, [keyPress, callBack]);
}
