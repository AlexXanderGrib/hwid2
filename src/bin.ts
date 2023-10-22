import { getHwId } from "./";

// eslint-disable-next-line unicorn/no-process-exit
console.log(getHwId() || process.exit(1));
