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
		figma.ui.postMessage({
			type: "createForm",
			optionsArray: ebgOptions,
		});
	}

	if (msg.type === "transform") {
		if (figma.currentPage.selection.length > 1)
			figma.notify("Please select a single node");
		else {
			let node: any = figma.currentPage.selection[0];

			try {
				const res = await fetch(
					"https://d4e1-115-117-121-194.ngrok-free.app/service/platform/assets/v1.0/upload/signed-url",
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
					// node.resize(node.width, node.height);
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
