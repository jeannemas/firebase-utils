import type { ServiceAccount } from '@prisma/client';
import { getFirestore, type DocumentData, type Firestore } from 'firebase-admin/firestore';

import { getFirebaseApp } from './app.service';

function getFirebaseFirestore(serviceAccount: ServiceAccount) {
	const app = getFirebaseApp(serviceAccount);
	const firestore = getFirestore(app);

	return firestore;
}

async function getDocument(firestore: Firestore, path: string) {
	try {
		const snapshot = await firestore.doc(path).get();

		if (!snapshot.exists) {
			return null;
		}

		return snapshot.data() as DocumentData;
	} catch {
		return null;
	}
}

async function listCollections(firestore: Firestore, path: string) {
	try {
		return await (path ? firestore.doc(path) : firestore).listCollections();
	} catch {
		return null;
	}
}

async function listDocuments(firestore: Firestore, path: string) {
	try {
		return await firestore.collection(path).listDocuments();
	} catch {
		return null;
	}
}

export async function query(serviceAccount: ServiceAccount, path: string) {
	const firestore = getFirebaseFirestore(serviceAccount);
	const collections = await listCollections(firestore, path);
	const document = await getDocument(firestore, path);
	const documents = await listDocuments(firestore, path);

	return {
		collections,
		document,
		documents,
	};
}
