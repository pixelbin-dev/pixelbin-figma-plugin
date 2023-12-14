import Pixelbin, { transformations } from "@pixelbin/core";

const pixelbin = new Pixelbin({
	cloudName: "muddy-lab-41820d",
	zone: "default",
});
const EraseBg = transformations.EraseBG;

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
	if (msg.type === "transform") {
		figma.notify("Please select a single nodes");
		const pixelbin = new Pixelbin({ cloudName: "demo" });

		// create an image with the pixelbin object
		const image = pixelbin.image("demoImage.jpeg");

		// create a transformation
		let t = Pixelbin.transformations.Basic.resize({ height: 100, width: 100 });

		// add Transformations to the image
		image.setTransformation(t);

		// get the url
		console.log("end", image.getUrl());
	}
};
