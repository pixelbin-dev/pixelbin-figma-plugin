document.addEventListener("DOMContentLoaded", function () {
	// Add an event listener to the button

	document.getElementById("create").addEventListener("create", function () {
		figma.notify("Hurray");
	});

	document.getElementById("cancel").addEventListener("click", function () {
		// Call figma.closePlugin() when the button is clicked
		// figma.closePlugin();
	});
});
