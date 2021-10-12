// jshint -W119

async function main() {
	let widget = new ListWidget();
  widget.addText('Hello duniya udpated!');
 	let value = (config.runsInWidget) ? Script.setWidget(widget) : await widget.presentMedium();
 	Script.complete();
}

module.exports = {
  main
};
