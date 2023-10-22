import { execSync } from "child_process";

const options = { encoding: "ascii", windowsHide: true, timeout: 200 } as const;
type Getters = { readonly [key in NodeJS.Platform]?: [string, RegExp] };

const platforms: Getters = {
  win32: [
    "REG QUERY HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid",
    /MachineGuid\s+REG_SZ\s+(.*?)\s/
  ],

  darwin: [
    "ioreg -rd1 -c IOPlatformExpertDevice",
    /"IOPlatformUUID" = "(.*?)"/
  ],
  linux: [
    "cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || true",
    /^([\da-f]+)/
  ]
};

/**
 * Returns machine hardware id.
 * Returns `undefined` if cannot determine.
 * @return {string?}
 */
export function getHwId(): string | undefined {
  const getter = platforms[process.platform];
  if (!getter) return;

  const result = getter[1].exec(execSync(getter[0], options));
  if (!result) return;

  return result[1] || undefined;
}
