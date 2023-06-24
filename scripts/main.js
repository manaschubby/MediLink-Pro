const iframe = document.getElementById("iframe");
// create a funtion to change iframe source
function changeIframeSource(url, event) {
	iframe.src = url;

	window.electronAPI
		.appointment(true)
		.then((appointments) => {
			iframe.contentWindow.postMessage(
				{
					data: appointments,
					message: "data-loaded",
				},
				"*"
			);
		})
		.catch((error) => {
			iframe.contentWindow.postMessage(
				{
					message: "data-error",
					error: error,
				},
				"*"
			);
		});
	console.log("iframe source changed");
	colorNavButtons(event);
}

function colorNavButtons(url) {
	document.querySelector(".sidebar a").classList.remove("active");

	document.getElementById(url).classList.add("active");
}
