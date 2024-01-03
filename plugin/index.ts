import eraseBgOptions from "../constants";

// Configure the command that involves a UI

// Present a UI, providing it with Figma CSS color variables
figma.showUI(__html__, {
	title: "Erase.bg",
	height: 400,
	width: 248,
	themeColors: true,
});

// Create a variable to store the rectangles that will be created
const rectangles: RectangleNode[] = [];

function toggleLoader(value: boolean) {
	figma.ui.postMessage({
		type: "toggle-loader",
		value,
	});
}

/* Handle the message from the UI, being aware that it will be an object with the single `count` property */
figma.ui.onmessage = async (msg) => {
	var node: any = figma?.currentPage?.selection[0];
	if (msg.type === "initialCall") {
		const body = {
			type: "createForm",
			optionsArray: eraseBgOptions,
			savedFormValue: "",
		};

		figma.clientStorage
			.getAsync("savedFormValue")
			.then((value) => {
				body.savedFormValue = value;
				figma.ui.postMessage(body);
			})
			.catch((err) => {
				console.error("Error loading data:", err);
			});
	}

	if (msg.type === "transform") {
		if (msg.params) {
			figma.clientStorage
				.setAsync("savedFormValue", msg.params)
				.then(() => {
					console.log("Data Saved");
				})
				.catch((err) => {
					console.error("Error saving data:", err);
				});
		}
		if (!figma.currentPage.selection.length) {
			figma.notify("Please select a image");
			return;
		}

		if (figma.currentPage.selection.length > 1) {
			figma.notify("Please select a single image");
			return;
		} else {
			node = figma.currentPage.selection[0];
			if (node.fills[0].type !== "IMAGE") {
				figma.notify("Make sure you are selecting an image");
				return;
			}
			if (node.fills[0].type === "IMAGE") {
				toggleLoader(true);
				const image = figma.getImageByHash(node.fills[0].imageHash);
				let bytes: any = null;
				if (image) {
					bytes = await image.getBytesAsync();
					figma.ui.postMessage({
						type: "selectedImage",
						imageBytes: bytes,
						imageName: node?.name?.replace(/ /g, ""),
					});
				}
			}
		}
	}
	if (msg.type === "replace-image") {
		figma
			.createImageAsync(msg?.bgRemovedUrl)
			.then(async (image: Image) => {
				node.fills = [
					{
						type: "IMAGE",
						imageHash: image.hash,
						scaleMode: "FILL",
					},
				];
				toggleLoader(false);
				figma.notify(
					"Transformation Applied (you can use (ctrl/command + z/y) or  to undo/redo tranformation)",
					{ timeout: 5000 }
				);
			})
			.catch((err) => {
				figma.notify("Something went wrong");
			});
	} else if (msg.type === "close-plugin") figma.closePlugin();
};
