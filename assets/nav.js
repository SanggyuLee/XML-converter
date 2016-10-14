const ipc = require('electron').ipcRenderer

ipc.on('selected-file', function(event, path) {
	document.getElementById('selected-file').innerHTML = path.msg
})

ipc.on('file-read', function(event, buffer) {
	console.log(buffer.offset)
	document.querySelector(".address").innerHTML = buffer.offset
	document.querySelector(".hex-code").innerHTML = buffer.hex
	document.querySelector(".string").innerHTML = buffer.string
})
