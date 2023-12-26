import ApiService from "./apiCall";
import ebgOptions from "./../formOptions.js";

figma.showUI(__html__, {
	title: "Erase Bg",
	height: 400,
	width: 248,
	themeColors: true,
});

figma.ui.onmessage = async (msg) => {
	if (msg.type === "initialCall") {
		const body = {
			type: "createForm",
			optionsArray: ebgOptions,
			savedFormValue: null,
		};

		figma.clientStorage
			.getAsync("savedFormValue")
			.then((value) => {
				body.savedFormValue = value;
			})
			.catch((err) => {
				console.error("Error loading data:", err);
			})
			.finally(() => {
				figma.ui.postMessage(body);
			});
	}

	if (msg.type === "transform") {
		if (msg.params) {
			figma.clientStorage
				.setAsync("savedFormValue", msg.params)
				.then(() => {
					console.log(`Data saved`);
				})
				.catch((err) => {
					console.error("Error saving data:", err);
				});
		}

		if (figma.currentPage.selection.length > 1)
			figma.notify("Please select a single node");
		else {
			let node: any = figma.currentPage.selection[0];

			try {
				const res = await fetch(
					"http://localhost:8081/service/platform/assets/v1.0/upload/signed-url",
					{
						method: "POST",
						headers: {
							"x-pixelbin-token": "da66bab0-723a-4157-94ab-b4e83fd910e1",
							"Content-Type": "application/json",
							// mode: "cors",
						},
						body: JSON.stringify({
							path: "path/to/containing/folder",
							name: "filename",
							format: "jpeg",
							access: "public-read",
							tags: ["tag1", "tag2"],
							metadata: {},
							overwrite: false,
							filenameOverride: true,
						}),
						redirect: "follow",
					}
				);
				console.log("sure", res);
			} catch (err) {
				console.log("Err", err);
			}

			if (node.fills[0].type === "IMAGE") {
				const image = figma.getImageByHash(node.fills[0].imageHash);
				let bytes: any = null;
				if (image) {
					bytes = await image.getBytesAsync();
					// const imageLayer = figma.createImage(bytes);
					// figma.currentPage.appendChild(imageLayer);
					figma.ui.postMessage({
						type: "selectedImage",
						imageBytes: bytes,
					});
				}
			}

			figma
				.createImageAsync(
					"https://cdn.pixelbin.io/v2/muddy-lab-41820d/erase.bg(i:general,shadow:false,r:true)/__playground/playground-default.jpeg"
				)
				.then(async (image: Image) => {
					node.fills = [
						{
							type: "IMAGE",
							imageHash: image.hash,
							scaleMode: "FILL",
						},
					];
				})
				.then(() => {
					figma.closePlugin();
				});
		}
	} else if (msg.type === "close-plugin") figma.closePlugin();
};
