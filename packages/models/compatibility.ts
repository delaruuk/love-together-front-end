export type Category = {
	category: string;
	categoryId: number;
	categoryImage: string;
	cloudinaryId: string;
	subscriptionStatus: "Premium" | "Free";
	__v: number;
	_id: string;
};

export type SurveyQuestion = {
	active: boolean;
	orderNum: number;
	versionId: number;
	categoryId: number;
	questionText: string;
	descriptionText?: string;
	answerTypeId: SurveyAnswerType;
	answerWeight: number;
	answers: SurveyQuestionAnswer[];
	__v: number;
	_id: string;
};

export type SurveyAnswerType = 1 | 2 | 3 | 4 | 5;

export type SurveyQuestionAnswer =
	| SurveyQuestionAnswerPrimary
	| SurveyQuestionAnswerAlternate;

// survey answer type 1/2
export type SurveyQuestionAnswerPrimary = {
	answer: string | number;
	value: string | number;
	ansId: number;
};

// survey answer type 3/4/5
export type SurveyQuestionAnswerAlternate = string | number;

export function isAnswerPrimary(
	answer: SurveyQuestionAnswer
): answer is SurveyQuestionAnswerPrimary {
	return typeof answer === "object" && "ansId" in answer;
}

export type PostSurveyAnswer = {
	userId: string;
	qId: string;
	versionId: number;
	categoryId: number;
	answer: number[] | string[];
};

export type SurveyAnswerDisplay = {
	qId: string;
	categoryId: number;
	answer: number[] | string[];
	question_info: [
		{
			[key: string]: any;
		}
	];
	_id: string;
};

export type CompareAnswerDisplay = {
	versionId: number;
	qId: string;
	shareCode: string;
	userId: string;
	categoryId: number;
	answer: number[] | string[];
	question_info: [
		{
			[key: string]: string | number;
		}
	];
	_id: string;
	_v: number;
};

export type PartnerCategoryOverview = {
	category: string;
	categoryId: number;
	dateScore: number;
	isCompleted: boolean;
	totalScore: number;
};
