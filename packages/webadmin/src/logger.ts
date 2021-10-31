import loglevel from "loglevel";

loglevel.setLevel("warn");

export default {
  warn: loglevel.warn,
  debug: loglevel.debug,
  info: loglevel.info,
  error: loglevel.error,
  trace: loglevel.trace,
  setLevel: loglevel.setLevel,
};
