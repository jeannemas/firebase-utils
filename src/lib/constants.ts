/** The Firebase Firestore path param default value */
export const FIRESTORE_PATH_DEFAULT_VALUE = '';
/** The Firebase Firestore path param key */
export const FIRESTORE_PATH_QUERY_PARAM = 'path';
/** The service account ID cookie key */
export const SERVICE_ACCOUNT_ID_COOKIE = 'serviceAccountId';
/** The Google Cloud Storage bucket param key */
export const STORAGE_BUCKET_QUERY_PARAM = 'bucket';
/** The Google Cloud Storage file path param key */
export const STORAGE_FILE_PATH_QUERY_PARAM = 'file';
/** The toasts dismissible default timeout value (in milliseconds) */
export const TOASTS_DISMISSIBLE_DEFAULT_TIMEOUT = 10000;

export const PAGINATION = {
	/** The pagination current page */
	CURRENT_PAGE: {
		/** The pagination current page param minimum value */
		MINIMUM_VALUE: 1,
		/** The pagination current page param key */
		QUERY_PARAM: 'page',
	},
	/** The pagination results per page */
	RESULTS_PER_PAGE: {
		/** The pagination results per page param default value */
		DEFAULT_VALUE: 10,
		/** The pagination results per page param minimum value */
		MINIMUM_VALUE: 1,
		/** The pagination results per page param maximum value */
		MAXIMUM_VALUE: 1000,
		/** The pagination results per page param key */
		QUERY_PARAM: 'resultsPerPage',
	},
	/** The pagination search */
	SEARCH: {
		/** The pagination search param default value */
		DEFAULT_VALUE: '',
		/** The pagination search param key */
		QUERY_PARAM: 'search',
	},
} as const;
