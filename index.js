const code = document.getElementById("code");
const textArea = document.getElementById("text-area");
const convertButton = document.querySelector(".button__convert");
const saveButton = document.querySelector(".button__copy");
const clearButton = document.querySelector(".button__clear");
const outputBlock = document.querySelector(".output-block");

function parseQueryString(url) {
	const decodedUrl = decodeURIComponent(url);
	const params = new URLSearchParams(decodedUrl);
	const result = {};

	params.forEach((value, key) => {
		const keys = key.split('[');
		let obj = result;
		for (let i = 0; i < keys.length; i++) {
			const currentKey = keys[i].replace(']', '');
			const isArray = !isNaN(parseInt(keys[i + 1]));
			if (!obj[currentKey]) {
				if (isArray) {
					obj[currentKey] = [];
				} else {
					obj[currentKey] = {};
				}
			}
			if (i === keys.length - 1) {
				if (isArray) {
					obj[currentKey].push(value);
				} else {
					obj[currentKey] = value;
				}
			}
			obj = obj[currentKey];
		}
	});

	return result;
}

if (textArea.value === "") {
	saveButton.disabled = true;
}

function convertURL() {
	if (textArea.value !== "") {
		outputBlock.classList.remove("show");
		code.innerText = JSON.stringify(parseQueryString(textArea.value), null, 2);
		saveButton.disabled = false;
	}
}

function clearTextArea() {
	textArea.value = "";
	code.innerText = "";
	outputBlock.classList.add("show");
	saveButton.disabled = true;
}

function saveToBuffer() {
	const saveString = JSON.stringify(parseQueryString(textArea.value), null, 2);
	console.log(saveString)

	if (textArea.value !== "") {
		navigator.clipboard.writeText(saveString)
			.then(() => console.log("Done!"))
			.catch(err => console.error(err))
	}
}

convertButton.addEventListener('click', convertURL);
saveButton.addEventListener('click', saveToBuffer);
clearButton.addEventListener('click', clearTextArea);





