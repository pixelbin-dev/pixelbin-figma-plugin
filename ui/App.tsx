import { useState, useEffect } from "react";
import Button from "./components/button/button";
import { PdkAxios } from "@pixelbin/admin/common.js";
import { PixelbinConfig, PixelbinClient } from "@pixelbin/admin";
import eraseBgOptions from "./../constants";
import { Util } from "./../util.ts";
import "./styles/style.scss";
import Pixelbin, { transformations } from "@pixelbin/core";

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
			let presignedUrl = null;
			let blob = new Blob([data.pluginMessage.imageBytes], {
				type: "image/jpeg",
			});

			const pixelbin = new Pixelbin({
				cloudName: "muddy-lab-41820d",
				zone: "default", // optional
			});
			const EraseBg = transformations.EraseBG;
			const demoImage = pixelbin.image("__playground/playground-default.jpeg"); // File Path on Pixelbin
			demoImage.setTransformation(EraseBg.bg());
			console.log("DIU", demoImage.getUrl());

			presignedUrl = await defaultPixelBinClient.assets.createSignedUrlV2({
				path: "path/to/containing/folder",
				name: "filename",
				format: "jpeg",
				access: "public-read",
				tags: ["tag1", "tag2"],
				metadata: {},
				overwrite: false,
				filenameOverride: true,
			});

			// bytes = data.pluginMessage.imageBytes;
			// // console.log("bytes", data.pluginMessage.imageBytes);
			// const pixelbin = new Pixelbin({
			// 	cloudName: "muddy-lab-41820d",
			// 	zone: "default",
			// });
			// const image = await pixelbin.image(
			// 	"__playground/playground-default.jpeg"
			// );
			// let t = Pixelbin.transformations.EraseBG.bg();
			// image.setTransformation(t);
			// // console.log("url after remoing bg", image.getUrl());
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
		<div className="main-container">
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/figma-plugin-ds@1.0.1/dist/figma-plugin-ds.min.css"
			/>
			<link rel="stylesheet" href="style.css" />
			<div>
				<div className="heading">Erase Bg</div>

				<div id="options-wrapper">{formComponentCreator()}</div>
			</div>

			<div className="bottom-btn-container" onClick={handleReset}>
				<div className="reset-container" id="reset">
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
		</div>
	);
}

export default App;
