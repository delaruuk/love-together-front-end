import {
	SurveyQuestionAnswerAlternate,
	SurveyQuestionAnswerPrimary,
} from "models";

export const setDefaultCheckedSingle = (
	selection: SurveyQuestionAnswerPrimary,
	currentAnswers: string[] | number[]
) => {
	if (currentAnswers && currentAnswers[0] === selection.ansId) {
		return true;
	} else {
		return false;
	}
};

export const setDefaultCheckedMulti = (
	selection: SurveyQuestionAnswerAlternate,
	currentAnswers: string[]
) => {
	if (currentAnswers) {
		const filteredAnswers = currentAnswers.filter(
			(answer) => answer === selection
		);
		if (filteredAnswers[0] === selection) {
			return true;
		}
	} else {
		return false;
	}
};
