// import { loadSignatureHeaders } from "./interceptors";
type Options = {
	headers?: any;
	params?: any;
	data?: any;
	credentials?: any;
	referrer?: any;
};
class ApiService {
	constructor() {
		// NOTE: Fetch API does not natively support interceptors
		// Consider using Service Workers or custom middleware functions instead.
	}
	static new_fetch = async (...args: any[]) => {
		let [resource, config] = args;
		// request interceptor here
		// loadSignatureHeaders(resource, config);
		// original fetch call
		try {
			return await fetch(resource, config);
		} catch (e) {
			console.log("ERROR IN FETCH", e);
			throw e;
		}
	};
	static get = async (url: string, options: Options = {}) => {
		url += options.params
			? "?" + new URLSearchParams(options.params).toString()
			: "";
		return await this.new_fetch(url, {
			method: "GET",
			headers: options.headers,
			credentials: options.credentials,
		});
	};

	static post = async (url: string, options: Options = {}) => {
		return await this.new_fetch(url, {
			method: "POST",
			headers: options.headers,
			body: JSON.stringify(options.data),
			credentials: options.credentials,
		});
	};
	static put = async (url: string, options: Options) => {
		return await this.new_fetch(url, {
			method: "PUT",
			headers: options.headers,
			body: JSON.stringify(options.data),
			credentials: options.credentials,
		});
	};
	static patch = async (url: string, options: Options = {}) => {
		return await this.new_fetch(url, {
			method: "PATCH",
			headers: options.headers,
			body: JSON.stringify(options.data),
			credentials: options.credentials,
		});
	};
	static delete = async (url: string, options: Options = {}) => {
		url += options.params
			? "?" + new URLSearchParams(options.params).toString()
			: "";
		return await this.new_fetch(url, {
			method: "DELETE",
			headers: options.headers,
			body: JSON.stringify(options.data),
			credentials: options.credentials,
		});
	};
}
export default ApiService;
