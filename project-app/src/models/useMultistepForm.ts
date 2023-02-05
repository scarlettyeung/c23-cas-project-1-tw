import { ReactElement, useEffect, useState } from 'react';
import { useRootSelector } from '../redux/store';
export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const checkPsw = useRootSelector((state) => state.auth.password);
	const checkHash = useRootSelector((state) => state.auth.hashTagArr);
	const typeOfAccount = useRootSelector((state) => state.auth.accountType);
	// const checkEmail = useRootSelector((state) => state.auth.email);
	// const [email, setEmail] = useState<any>();
	// useEffect(() => {
	// 	async function getAllEmail() {
	// 		const path = process.env.REACT_APP_API_BASE;
	// 		let data = await fetch(`${path}users/getAllEmail`);
	// 		let result = await data.json();
	// 		console.log('Form', result);
	// 		return setEmail(result);
	// 	}
	// 	getAllEmail();
	// }, []);

	function next() {
		setCurrentStepIndex((i) => {
			if (i >= steps.length - 1) {
				return i;
			}
			if (checkPsw === '' && i) {
				return i;
			}
			// if (i && email?.includes(checkEmail!)) {
			// 	return i;
			// }
			if (
				(checkHash?.length === 0 || checkHash === null || checkHash === undefined) &&
				i &&
				typeOfAccount === 'performer'
			) {
				return i;
			} else {
				return i + 1;
			}
		});
	}

	function back() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}

	function goTo(index: number) {
		setCurrentStepIndex(index);
	}

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		steps,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		goTo,
		next,
		back,
	};
}
