import { User } from "firebase/auth";
import {
	SurveyQuestionAnswer,
	SurveyQuestionAnswerAlternate,
	SurveyQuestionAnswerPrimary,
} from "./compatibility";

export type FirebaseUser = User | null;

export type PostMongoUser = {
	userId: string;
	username: string;
	name: string;
	shareCode: string;
	dateOfBirth: string;
	userInfo: UserInfo[];
};

export type UserInfo = {
	label: string;
	value: string | number;
};

export type MongoUser =
	| (PostMongoUser & {
			isAdmin: boolean;
			subscriptionStatus: "Free" | "Premium";
			pendingPartners: PendingPartner[];
			partners: string[];
			versionId: number;
			__v: number;
			_id: string;
	  })
	| null;

export type PendingPartner = {
	partnerName: string;
	partnerUserId: string;
	notification_id: string;
	_id: string;
};

export type UserQuestion = {
	label: string;
	questionText: string;
	hidden: boolean;
	descriptionText?: string;
	answerTypeId: number;
	answers: SurveyQuestionAnswer[];
	__v: number;
	_id: string;
};

export type Notification = {
	_id: string;
	sender: string;
	receiver: string;
	notificationType: "PartnerRequest";
	message: string;
	status: "Accepted" | "Pending" | "Declined" | "Cancelled";
	read: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
};
