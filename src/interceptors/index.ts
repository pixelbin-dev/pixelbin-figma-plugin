import { isAbsoluteURL, combineURLs } from "./helpers";
const isBrowser = true;
// const { transformRequestOptions } = require("./../../../helper/utils");
var parse = require("url-parse");
const { sign } = require("./signature");
function transformRequestOptions(params: any) {
	let options = "";
	for (const key in params) {
		if (typeof params[key] !== "object" && typeof params[key] !== "undefined") {
			const encodeVal = encodeURIComponent(params[key]);
			options += `${key}=${encodeVal}&`;
		} else if (Array.isArray(params[key])) {
			// eslint-disable-next-line no-loop-func
			params[key].forEach(() => {
				const encodeVal = encodeURIComponent(params[key]);
				options += `${key}=${encodeVal}&`;
			});
		} else if (typeof params[key] === "object" && params[key]) {
			options += transformRequestOptions(params[key]);
		}
	}
	return options ? options.slice(0, -1) : options;
}
function getTransformer(config: any) {
	const { transformRequest } = config;
	if (transformRequest) {
		if (typeof transformRequest === "function") {
			return transformRequest;
		} else if (transformRequest.length) {
			return transformRequest[0];
		}
	}
	throw new Error(
		"Could not get default transformRequest function from Axios defaults"
	);
}
export function processQueryParams({
	params,
	search,
}: {
	params: any;
	search: string;
}) {
	let queryParam = "";
	if (params && Object.keys(params).length) {
		if (search && search.trim() !== "") {
			queryParam = `&${transformRequestOptions(params)}`;
		} else {
			queryParam = `?${transformRequestOptions(params)}`;
		}
	}
	return queryParam;
}
function base64Encode(text: string) {
	return Buffer.from(text).toString("base64");
}
export function addSignatureFn(options: any) {
	return (config: any) => {
		if (!config.url) {
			throw new Error(
				"No URL present in request config, unable to sign request"
			);
		}
		let url = config.url;
		if (config.baseURL && !isAbsoluteURL(config.url)) {
			url = combineURLs(config.baseURL, config.url);
		}
		// if (url.startsWith("/api") && isBrowser)
		// {
		// 	url = `https://www.figma.com${url}`;
		// }
		const { host, pathname, search } = parse(url);
		// if (
		// 	pathname.startsWith("/service/panel") ||
		// 	pathname.startsWith("/api/service/panel")
		// )
		{
			const { data, headers, method, params } = config;
			const queryParam = processQueryParams({ params, search });
			const transformRequest = getTransformer(config);
			const transformedData = transformRequest(data, headers);
			// Remove all the default Axios headers
			const {
				common,
				delete: _delete, // 'delete' is a reserved word
				get,
				head,
				post,
				put,
				patch,
				...headersToSign
			} = headers;
			const signingOptions = {
				method: method && method.toUpperCase(),
				host: host,
				path: pathname + search + queryParam,
				body: transformedData,
				headers: headersToSign,
			};
			sign(signingOptions);
			config.headers["x-ebg-param"] = base64Encode(
				signingOptions.headers["x-ebg-param"]
			);
			config.headers["x-ebg-signature"] =
				signingOptions.headers["x-ebg-signature"];
		}
		return config;
	};
}
/**
 * Fetch monkey patching
 * NOTE: Following interceptor implementation needs to thoughrly tested with various scenario
 * Currently working for log streaming use case without body and params
 */
export function loadSignatureHeaders(url: string, config: any) {
	if (!url) {
		throw new Error("No URL present in request config, unable to sign request");
	}
	console.log("Now breaking down url", url);
	try {
		const { host, pathname, search } = parse(url);
		// if (
		// 	pathname.startsWith("/service/figma") ||
		// 	pathname.startsWith("/api/service/panel")
		// )
		{
			const { data, headers, method, params } = config;
			const queryParam = processQueryParams({ params, search });
			const {
				common,
				delete: _delete, // 'delete' is a reserved word
				get,
				head,
				post,
				put,
				patch,
				...headersToSign
			} = headers;
			const signingOptions = {
				method: method && method.toUpperCase(),
				host: host,
				path: pathname + search + queryParam,
				body: data,
				headers: headersToSign,
			};
			sign(signingOptions);
			config.headers["User-Agent"] = "figma-plugin";
			config.headers["x-ebg-param"] = base64Encode(
				signingOptions.headers["x-ebg-param"]
			);
			config.headers["x-ebg-signature"] =
				signingOptions.headers["x-ebg-signature"];
			return config;
		}
	} catch (error) {
		console.log("Error while loading signature headers", error);
		return config;
	}
}
