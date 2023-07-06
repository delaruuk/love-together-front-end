import axios from "axios";
import {
	PostSurveyAnswer,
	SurveyQuestion,
	PostMongoUser,
	UserQuestion,
	UserInfo,
	FirebaseUser,
	MongoUser,
} from "models";
import { User } from "firebase/auth";
import { updateEmail } from "firebase/auth";
import { auth, googleProvider } from "firebase-config/firebaseConfig";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
console.log("baseUrl: ", baseUrl);

export const getUserQuestions = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	console.log(token);
	const res = await axios.get(`${baseUrl}userquestions`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const validateShareCode = async (
	user: FirebaseUser,
	shareCode: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}users/shareCode`, {
		params: {
			shareCode,
		},
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const createUser = async (
	user: FirebaseUser,
	formValues: {
		[key: string]: any[];
	}
) => {
	const token = await user?.getIdToken(false);
	const dbQuestions = Object.entries(formValues)
		.slice(3)
		.map((question) => {
			return { label: question[0], value: question[1] };
		});
	axios.post;
	const res = await axios.post(
		`${baseUrl}users`,
		{
			userId: user?.uid,
			username: user?.email,
			name: formValues.name[0],
			shareCode: formValues.shareCode[0],
			dateOfBirth: formValues.birth[0],
			userInfo: dbQuestions,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const updateUserEmail = async (user: FirebaseUser, email: string) => {
	const token = await user?.getIdToken(false);

	const res = await axios.put(
		`${baseUrl}users`,
		{
			userId: user?.uid,
			username: email,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const putUser = async (
	user: FirebaseUser,
	formValues: {
		[key: string]: any;
	}
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users`,
		{
			userId: user?.uid,
			name: formValues.name,
			shareCode: formValues.shareCode,
			dateOfBirth: formValues.birthDate,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const deleteSelf = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.delete(`${baseUrl}users/deleteSelf`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
		},
	});
	return res.data;
};

export const getUserData = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}users/user/${user?.uid}`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const getCategories = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}questions/categories`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
		},
	});
	console.log({ token });
	return res.data;
};

export const getCategoryCompleted = async (
	user: FirebaseUser,
	category: string
) => {
	const token = await user?.getIdToken(false);
	const answersRes = await axios.get(`${baseUrl}answers/category`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			category,
		},
	});
	if (answersRes.data.length === 0) {
		return "incomplete";
	} else {
		const questionsRes = await axios.get(`${baseUrl}questions/category`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
			params: {
				userId: user?.uid,
				category,
			},
		});
		if (questionsRes.data.length === answersRes.data.length) {
			return "done";
		}
		if (questionsRes.data.length > answersRes.data.length) {
			return "review";
		}
		if (questionsRes.data.length < answersRes.data.length) {
			return "incomplete";
		}
	}
};

// Function to get Questions
export const getQuestionsByCategory = async (
	// Takes in user and category name
	user: FirebaseUser,
	category: string
	// the response as a JSON
) => {
	const token = await user?.getIdToken(false);
	const answersRes = await axios.get(`${baseUrl}answers/category`, {
		headers: {
			// Authorizaation Header
			authorization: `Bearer ${token}`,
		},
		params: {
			// two params, userId and category
			userId: user?.uid,
			category,
		},
	});
	// save answers to const
	const answers = answersRes.data;
	// after reciveing API response,
	// .get fetches questions based on category passed
	const questionsRes = await axios.get(`${baseUrl}questions/category`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			category: category,
		},
	});
	const questions = questionsRes.data;
	// After getting questions, both are returned
	return { answers, questions };
};

export const postAnswers = async (
	user: FirebaseUser,
	userInfo: MongoUser | null,
	formValues: {
		[key: string]: any[];
	},
	questions: SurveyQuestion[],
	getCurrentKey: (
		key: string,
		object: {
			[key: string]: any[];
		}
	) => string | number
) => {
	const token = await user?.getIdToken(false);
	const convertedAnswers: PostSurveyAnswer[] = questions.map((question) => {
		return {
			userId: user?.uid as string,
			shareCode: userInfo?.shareCode as string,
			qId: question._id as string,
			versionId: question.versionId as number,
			categoryId: question.categoryId as number,
			answer: formValues[getCurrentKey(question._id, formValues)],
		};
	});
	const res = await axios.post(
		`${baseUrl}answers`,
		{
			answers: convertedAnswers,
		},
		{
			params: {
				userId: user?.uid,
			},
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const getAnswersByCategory = async (
	user: FirebaseUser,
	category: string
) => {
	const token = await user?.getIdToken(false);
	const answersRes = await axios.get(`${baseUrl}answers/category`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			category,
		},
	});
	return answersRes.data;
};

export const getNotifications = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}users/checkNotifications`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
		},
	});
	return res.data;
};

export const requestPartner = async (user: FirebaseUser, partner: string) => {
	const token = await user?.getIdToken(false);
	const res = await axios.post(
		`${baseUrl}users/requestAPartner`,
		{
			userId: user?.uid,
			partnerShareCode: partner,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const cancelRequestPartner = async (
	user: FirebaseUser,
	notification_id: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users/cancelARequest`,
		{
			userId: user?.uid,
			notification_id,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const declinePartner = async (
	user: FirebaseUser,
	notification_id: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users/declineAPartner`,
		{
			userId: user?.uid,
			notification_id,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const addPartner = async (user: FirebaseUser, partner: string) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users/addAPartner`,
		{
			userId: user?.uid,
			notification_id: partner,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const removePartner = async (user: FirebaseUser, partner: string) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users/deleteAPartner`,
		{
			userId: user?.uid,
			shareCode: partner,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const getPartner = async (user: FirebaseUser, partner: string) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}answers/partner`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			partnerShareCode: partner,
		},
	});
	return res.data;
};

export const getCompareUsers = async (user: FirebaseUser, partner: string) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}answers/compare`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			partnerShareCode: partner,
		},
	});
	return res.data;
};

export const getCompareAnswers = async (
	user: FirebaseUser,
	partner: string,
	category: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}answers/partnerAnswers`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			partnerShareCode: partner,
			category,
		},
	});
	return res.data;
};

export const getAssessmentCategoryScore = async (
	user: FirebaseUser,
	partner: string,
	category: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}answers/catScore`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			partnerShareCode: partner,
			category,
		},
	});
	return res.data;
};

export const getLegalDocs = async (name: string) => {
	let doc = await axios.get(`${baseUrl}adminInfo/name`, {
		params: {
			name: name,
		},
	});

	return doc.data;
};

/* 
will return insights based on category
if insight not exit, will generate new insights on backend
*/
export const getInsightsByCategory = async (
	user: FirebaseUser,
	category: string
) => {
	const token = await user?.getIdToken(false);
	let insights = await axios.get(`${baseUrl}insights/category`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			category: category,
		},
	});

	return insights.data;
};

/* 
will return insights based on questionId
if insight not exit, will generate new insights on backend
*/

export const getInsightByQuestion = async (user: FirebaseUser, qId: string) => {
	const token = await user?.getIdToken(false);
	let insight = await axios.get(`${baseUrl}insights/question`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: user?.uid,
			qId: qId,
			version: 1,
		},
	});

	return insight.data;
};

// admin endpoints

export const getUsers = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}users`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const removeUser = async (
	adminUser: FirebaseUser,
	deletedUser: MongoUser
) => {
	const token = await adminUser?.getIdToken(false);
	const res = await axios.delete(`${baseUrl}users/deleteUser`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			userId: deletedUser?.userId,
		},
	});
	return res.data;
};

export const toggleAdmin = async (
	adminUser: FirebaseUser,
	newAdmin: MongoUser
) => {
	const token = await adminUser?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users/makeAdmin`,
		{
			userId: newAdmin?.userId,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const toggleStatus = async (
	adminUser: FirebaseUser,
	targetUser: MongoUser
) => {
	const token = await adminUser?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}users/changeStatus`,
		{
			userId: targetUser?.userId,
			currentStatus: targetUser?.subscriptionStatus,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const getAdminUserQuestions = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}userquestions/allUserQuestions`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

// admin info

export const getAdminInfo = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}adminInfo`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const postAdminInfo = async (
	adminUser: FirebaseUser,
	formValues: any
) => {
	const token = await adminUser?.getIdToken(false);
	const res = await axios.post(
		`${baseUrl}adminInfo`,
		formValues.file !== null
			? {
					name: formValues.name,
					description: formValues.description,
					file: formValues.file,
			  }
			: {
					name: formValues.name,
					description: formValues.description,
					value: formValues.value,
			  },
		formValues.file !== null
			? {
					headers: {
						"Content-Type": "multipart/form-data",
						authorization: `Bearer ${token}`,
					},
			  }
			: {
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${token}`,
					},
			  }
	);
	return res.data;
};

export const editAdminInfo = async (
	adminUser: FirebaseUser,
	formValues: any
) => {
	const token = await adminUser?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}adminInfo`,
		formValues.file !== null
			? {
					name: formValues.name,
					description: formValues.description,
					file: formValues.file,
			  }
			: {
					name: formValues.name,
					description: formValues.description,
					value: formValues.value,
			  },
		formValues.file !== null
			? {
					headers: {
						"Content-Type": "multipart/form-data",
						authorization: `Bearer ${token}`,
					},
			  }
			: {
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${token}`,
					},
			  }
	);
	return res.data;
};

export const getAdminCategories = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}category`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const getAdminCategoryQuestions = async (
	user: FirebaseUser,
	version: number,
	category: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.get(`${baseUrl}questions/versionAndCategory`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		params: {
			version,
			category,
		},
	});
	return res.data;
};

// survey questions

export const postNewSurveyQuestion = async (
	user: FirebaseUser,
	formValues: {
		[key: string]: any;
	}
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.post(
		`${baseUrl}questions/postOneQuestion`,
		{
			versionId: formValues.versionId as number,
			categoryId: formValues.categoryId as number,
			answerTypeId: formValues.answerTypeId as number,
			orderNum: formValues.orderNum as number,
			questionText: formValues.questionText as string,
			descriptionText: formValues.descriptionText as string,
			answerWeight: formValues.answerWeight as number,
			answers: formValues.answers,
			active: formValues.active as boolean,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const editSurveyQuestion = async (
	user: FirebaseUser,
	formValues: {
		[key: string]: any;
	},
	questionId: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}questions/updateOneQuestion`,
		{
			_id: questionId,
			questionText: formValues.questionText as string,
			descriptionText: formValues.descriptionText as string,
			answerWeight: formValues.answerWeight as number,
			answers: formValues.answers,
			active: formValues.active as boolean,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const deleteSurveyQuestion = async (
	user: FirebaseUser,
	questionId: string
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.delete(`${baseUrl}questions/deleteQuestion`, {
		data: {
			_id: questionId,
		},
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export const reorderSurveyQuestions = async (
	user: FirebaseUser,
	questions: SurveyQuestion[]
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}questions/updateOneCategoriesQuestions`,
		{
			questions,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

// user questions

export const postNewUserQuestion = async (
	user: FirebaseUser,
	formValues: {
		[key: string]: any;
	}
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.post(
		`${baseUrl}userquestions`,
		{
			answerTypeId: formValues.answerTypeId,
			label: formValues.label,
			questionText: formValues.questionText,
			answers: formValues.answers,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const editUserQuestion = async (
	user: FirebaseUser,
	formValues: {
		[key: string]: any;
	}
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}userquestions`,
		{
			label: formValues.label,
			questionText: formValues.questionText,
			answers: formValues.answers,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const deleteUserQuestion = async (
	user: FirebaseUser,
	label: string,
	hiddenStatus: boolean
) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}userQuestions/hiddenStatus`,
		{
			label,
			hiddenStatus,
		},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

// stripe

export const stripeCheckout = async (user: FirebaseUser) => {
	const token = await user?.getIdToken(false);
	const res = await axios.post(
		`${baseUrl}stripe/create-checkout-session`,
		{},
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return res.data;
};

export const stripeVerify = async (user: FirebaseUser, session_id: string) => {
	const token = await user?.getIdToken(false);
	const res = await axios.put(
		`${baseUrl}stripe/checkoutSession`,
		{},
		{
			params: {
				userId: user?.uid,
				id: session_id,
			},
			headers: {
				authorization: `Bearer ${token}`,
			},
		}
	);
	return { user: res.data.user, sessionInfo: res.data.sessionInfo };
};
