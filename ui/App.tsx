import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./components/button/button";
import { PdkAxios } from "@pixelbin/admin/common.js";
import { PixelbinConfig, PixelbinClient } from "@pixelbin/admin";
import eraseBgOptions from "./../constants";
import { Util } from "./../util.ts";
import "./styles/style.scss";
import Pixelbin, { transformations } from "@pixelbin/core";
import LoaderGif from "../assets/loader.gif";

const defaultPixelBinClient: PixelbinClient = new PixelbinClient(
	new PixelbinConfig({
		domain: "https://api.pixelbin.io",
		apiSecret: "da66bab0-723a-4157-94ab-b4e83fd910e1",
	})
);

PdkAxios.defaults.withCredentials = false;

function App() {
	// Create a state variable to count upcoming rectangles
	const [formValues, setFormValues] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		parent.postMessage(
			{
				pluginMessage: {
					type: "initialCall",
				},
			},
			"*"
		);
	}, []);

	window.onmessage = async (event) => {
		const { data } = event;
		if (data.pluginMessage.type === "createForm") {
			let temp = { ...formValues };
			eraseBgOptions.forEach((option, index) => {
				const camelCaseName = Util.camelCase(option.name);
				const savedValue = data.pluginMessage.savedFormValue[camelCaseName];

				temp[camelCaseName] =
					savedValue !== undefined && savedValue !== null
						? savedValue
						: option.default;
			});
			setFormValues({ ...temp });
		}
		if (data.pluginMessage.type === "selectedImage") {
			let res = null;
			let blob = new Blob([data.pluginMessage.imageBytes], {
				type: "image/jpeg",
			});

			const pixelbin = new Pixelbin({
				cloudName: "muddy-lab-41820d",
				zone: "default", // optional
			});
			const EraseBg = transformations.EraseBG;
			let name = `${data?.pluginMessage?.imageName}${uuidv4()}`;

			res = await defaultPixelBinClient.assets.createSignedUrlV2({
				path: "figma/ebg",
				name: name,
				format: "jpeg",
				access: "public-read",
				tags: ["tag1", "tag2"],
				metadata: {},
				overwrite: false,
				filenameOverride: false,
			});

			Pixelbin.upload(blob as File, res?.presignedUrl, {
				chunkSize: 2 * 1024 * 1024,
				maxRetries: 1,
				concurrency: 2,
			})
				.then(() => {
					const url = JSON.parse(
						res.presignedUrl.fields["x-pixb-meta-assetdata"]
					);
					const demoImage = pixelbin.image(url?.fileId);
					demoImage.setTransformation(EraseBg.bg());
					parent.postMessage(
						{
							pluginMessage: {
								type: "replace-image",
								bgRemovedUrl: demoImage.getUrl(),
							},
						},
						"*"
					);
				})
				.catch((err) => console.log("Error while uploading", err));
		}
		if (data.pluginMessage.type === "toggle-loader") {
			setIsLoading(data.pluginMessage.value);
		}
	};

	const formComponentCreator = () => {
		return (
			<div>
				{eraseBgOptions.map((obj, index) => {
					switch (obj.type) {
						case "enum":
							return (
								<select
									onChange={(e) => {
										setFormValues({
											...formValues,
											[Util.camelCase(obj.name)]: e.target.value,
										});
									}}
									id={Util.camelCase(obj.name)}
									value={formValues[Util.camelCase(obj.name)]}
								>
									{obj.enum.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))}
								</select>
							);
						case "boolean":
							return (
								<div className="checkbox">
									<input
										id={Util.camelCase(obj.name)}
										type="checkbox"
										checked={formValues[Util.camelCase(obj.name)]}
										onChange={(e) => {
											setFormValues({
												...formValues,
												[Util.camelCase(obj.name)]: e.target.checked,
											});
										}}
									/>
									<div className="white-text">{obj.name}</div>
								</div>
							);

						default:
							return null;
					}
				})}
			</div>
		);
	};

	function handleReset() {
		let temp = { ...formValues };
		eraseBgOptions.forEach((option, index) => {
			const camelCaseName = Util.camelCase(option.name);
			temp[camelCaseName] = option.default;
		});
		setFormValues({ ...temp });
	}

	/** Handles button clicks and sends data to the plugin’s backend */
	function handleSubmit() {
		parent.postMessage(
			{
				pluginMessage: {
					type: "transform",
					params: formValues,
				},
			},
			"*"
		);
	}

	return (
		<div className={`main-container ${isLoading ? "hide-overflow" : ""}`}>
			{/* <link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/figma-plugin-ds@1.0.1/dist/figma-plugin-ds.min.css"
			/>
			<link rel="stylesheet" href="style.css" /> */}
			<div>
				<div className="heading">Erase Bg</div>

				<div id="options-wrapper">{formComponentCreator()}</div>
			</div>
			<div className="bottom-btn-container">
				<div className="reset-container" id="reset" onClick={handleReset}>
					<div className="icon icon--swap icon--blue reset-icon"></div>
					<div className="reset-text">Reset all</div>
				</div>

				<button
					id="submit-btn"
					onClick={handleSubmit}
					className="button button--primary"
				>
					Apply
				</button>
			</div>
			{isLoading && (
				<div className="loader-modal">
					<img src={LoaderGif} alt="Loader" height={50} width={50} />
				</div>
			)}
		</div>
	);
}

export default App;
