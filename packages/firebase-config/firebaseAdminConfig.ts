import admin from "firebase-admin";

const serviceAccount = JSON.parse(
	process.env.NEXT_PUBLIC_FIREBASE_ADMIN_KEY as string
);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const adminAuth = admin.auth();
