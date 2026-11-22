// Mac: give the app an ad-hoc signature before it goes into the .dmg. Without any signature, Apple Silicon Macs
// refuse to open it ("damaged"). With it, macOS only asks you to confirm the first time (see README).
const { execSync } = require("child_process");
const path = require("path");
exports.default = async function (ctx) {
  if (ctx.electronPlatformName !== "darwin") return;
  // a universal build packs Intel and Apple Silicon copies first, then merges them: sign only the merged app
  if (ctx.arch !== 4 /* universal */) return;
  const appPath = path.join(ctx.appOutDir, `${ctx.packager.appInfo.productFilename}.app`);
  execSync(`codesign --force --deep --sign - "${appPath}"`, { stdio: "inherit" });
};
