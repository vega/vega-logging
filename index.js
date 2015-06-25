var ts;

function write(msg) {
  msg = "[Vega Log] " + msg;
  console.log(msg);
}

function error(msg) {
  msg = "[Vega Err] " + msg;
  console.error(msg);
}

function debug(input, args) {
  if (!debug.enable) return;
  var log = Function.prototype.bind.call(console.log, console);
  var state = {
    prevTime:  Date.now() - ts,
    stamp: input.stamp
  };

  if (input.add) {
    state.add = input.add.length;
    state.mod = input.mod.length;
    state.rem = input.rem.length;
    state.reflow = !!input.reflow;
  }

  log.apply(console, (args.push(JSON.stringify(state)), args));
  ts = Date.now();
}

module.exports = {
  log: write,
  error: error,
  debug: (debug.enable = false, debug)
};