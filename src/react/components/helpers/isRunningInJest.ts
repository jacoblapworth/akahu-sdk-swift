export default function isRunningInJest() {
  return Boolean(typeof process !== 'undefined' && process?.env?.JEST_WORKER_ID);
}
