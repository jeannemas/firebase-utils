declare global {
	type Like<T, V extends T> = V extends T ? V : never;

	type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
	type Metadata = {
		[K in HTTPVerb]?: JSONValue;
	};

	type JSONValue = string | number | boolean | null | { [key: string]: JSONValue } | JSONValue[];
}

// TODO comment

export {};
