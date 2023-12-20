import ApiService from "./apiCall";
import ebgOptions from "./../formOptions.js";

figma.showUI(__html__);

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
			// figma.notify(node.fills[0].type);

			const selectedItem = figma.currentPage.selection[0];

			ApiService.get(
				"https://api.pixelbin.io/service/platform/assets/v1.0/playground/default",
				{
					headers: {
						"x-ebg-param": "MjAyMzEyMTlUMTAwMDA4Wg==",
						"x-ebg-signature":
							"v1:7cc2ba0b7e0ae2b75843fecf562a4a719d25936e966446c4e80f6e5d49f8326f",
						Authorization:
							"Bearer ZGE2NmJhYjAtNzIzYS00MTU3LTk0YWItYjRlODNmZDkxMGUx",

						"Access-Control-Allow-Origin": "anonymous",
					},
					referrer: "https://www.pixelbin.io",
				}
			)
				.then(() => {
					console.log("Sucessfull");
				})
				.catch((e) => {
					console.log("with err", e);
				});

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
					"https://cdn.pixelbin.io/v2/muddy-lab-41820d/erase.bg(i:general,shadow:false,r:true)/upload.jpeg"
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
				});
		}
	} else if (msg.type === "close-plugin") figma.closePlugin();
};
