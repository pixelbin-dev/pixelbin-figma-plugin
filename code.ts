figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
	if (msg.type === "transform") {
		if (figma.currentPage.selection.length > 1)
			figma.notify("Please select a single node");
		else {
			let node: any = figma.currentPage.selection[0];
			// figma.notify(node.fills[0].type);
			console.log("HW", figma.currentPage.selection);

			const selectedItem = figma.currentPage.selection[0];

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
		}
	} else if (msg.type === "close-plugin") figma.closePlugin();
};
