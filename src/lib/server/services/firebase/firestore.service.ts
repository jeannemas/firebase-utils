import type { ServiceAccount } from '@prisma/client';
import { getFirestore, type DocumentData, type Firestore } from 'firebase-admin/firestore';

import { getFirebaseApp } from './app.service';

/**
 * Get a Firebase Firestore instance from a Firebase project.
 * The project is identified using the given service account.
 *
 * @param serviceAccount The service account to use.
 * @returns The Firebase Firestore instance.
 */
function getFirebaseFirestore(serviceAccount: ServiceAccount) {
	// We first get the Firebase app instance.
	const app = getFirebaseApp(serviceAccount);
	// We then get the Firestore instance from the app.
	const firestore = getFirestore(app);

	return firestore;
}

/**
 * Get a document from a given path inside of a Firebase Firestore instance.
 *
 * @param firestore The Firestore instance to use.
 * @param path The path to the document.
 * @returns The document data if it exists, `null` otherwise.
 */
async function getDocument(firestore: Firestore, path: string) {
	try {
		// We first get the document snapshot.
		const snapshot = await firestore.doc(path).get();

		if (!snapshot.exists) {
			// We return `null` since the document does not exist.
			return null;
		}

		// We return the document data.
		return snapshot.data() as DocumentData;
	} catch (error) {
		console.error('Error while getting document', path, error); // TODO: we need to log this error somewhere.

		// In the case of an exception, we return `null`.
		return null;
	}
}

/**
 * List all collections from a given path inside of a Firebase Firestore instance.
 *
 * @param firestore The Firestore instance to use.
 * @param path The path to the document or an empty string to target the root namespace.
 * @returns The collections if they exist, `null` otherwise.
 */
async function listCollections(firestore: Firestore, path: string) {
	try {
		if (!path) {
			// We return all collections from the root namespace.
			return firestore.listCollections();
		}

		// We first get the document snapshot.
		const snapshot = await firestore.doc(path).get();

		if (!snapshot.exists) {
			// We return `null` since the document does not exist and thus cannot have any collections.
			return null;
		}

		// We return all collections from the given document.
		return snapshot.ref.listCollections();
	} catch (error) {
		console.error('Error while listing collections', path, error); // TODO: we need to log this error somewhere.

		// In the case of an exception, we return `null`.
		return null;
	}
}

/**
 * List all documents from a given path inside of a Firebase Firestore instance.
 *
 * @param firestore The Firestore instance to use.
 * @param path The path to the collection.
 * @returns The documents if they exist, `null` otherwise.
 */
async function listDocuments(firestore: Firestore, path: string) {
	try {
		// We first get the collection reference.
		const collection = firestore.collection(path);

		// We then list all documents from the collection.
		return collection.listDocuments();
	} catch (error) {
		console.error('Error while listing documents', path, error); // TODO: we need to log this error somewhere.

		// In the case of an exception, we return `null`.
		return null;
	}
}

/**
 * Query a given path inside of a Firebase Firestore instance.
 * This will return the collections, document and documents if they exist.
 * The Firebase Firestore instance is identified using the given service account.
 *
 * @param serviceAccount The service account to use.
 * @param path The path to the document or collection.
 * @returns The collections, document and documents if they exist, `null` otherwise.
 */
export async function query(serviceAccount: ServiceAccount, path: string) {
	// We first get the Firestore instance.
	const firestore = getFirebaseFirestore(serviceAccount);
	// We then get the collections, document and documents.
	const [collections, document, documents] = await Promise.all([
		listCollections(firestore, path),
		getDocument(firestore, path),
		listDocuments(firestore, path),
	]);

	return {
		collections,
		document,
		documents,
	};
}
