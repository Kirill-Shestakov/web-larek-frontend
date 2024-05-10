export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class API {
	readonly baseUrl: string;
	protected options: RequestInit;
	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected handleResponse<T>(response: Response): Promise<T> {
		if (response.ok) return response.json() as Promise<T>;
		else
			return response
				.json()
				.then((data) =>
					Promise.reject(new Error(data.error ?? response.statusText))
				);
	}

	get<T>(uri: string): Promise<T> {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: 'GET',
		}).then((response) => this.handleResponse<T>(response));
	}

	post<T>(
		uri: string,
		data: object,
		method: ApiPostMethods = 'POST'
	): Promise<T> {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then((response) => this.handleResponse<T>(response));
	}
}
