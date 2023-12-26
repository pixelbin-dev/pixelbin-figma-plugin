const ebgOptions = [
	{
		name: "Industry Type",
		type: "enum",
		enum: ["general", "ecommerce", "car", "human"],
		preview: ["car"],
		default: "general",
		identifier: "i",
		title: "Industry type",
	},
	{
		name: "Add Shadow",
		title: "Add Shadow (cars only)",
		type: "boolean",
		default: false,
		preview: false,
		identifier: "shadow",
	},
	{
		name: "Refine",
		title: "Refine Output",
		type: "boolean",
		default: true,
		identifier: "r",
	},
];

export default ebgOptions;
