import ipRegex from "ip-regex";
export default function validateIp(ip) {
  return ipRegex({ exact: true }).test(ip);
}
