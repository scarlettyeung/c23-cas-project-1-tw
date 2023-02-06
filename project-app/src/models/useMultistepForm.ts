import { ReactElement, useState } from 'react';
import { useRootSelector } from '../redux/store';
export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const checkPsw = useRootSelector((state) => state.auth.password);
	const checkHash = useRootSelector((state) => state.auth.hashTagArr);
	const typeOfAccount = useRootSelector((state) => state.auth.accountType);

	function next() {
		setCurrentStepIndex((i) => {
			if (i >= steps.length - 1) {
				return i;
			}
			if (checkPsw === '' && i) {
				return i;
			}
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
