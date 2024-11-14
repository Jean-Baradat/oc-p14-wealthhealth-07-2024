/* eslint-disable no-undef */

if (process.env.VERCEL_ENV === "production") {
	try {
		console.log("Running production build...")
		execSync("npm run build:prod", { stdio: "inherit" })
	} catch (error) {
		console.log("Running preview build...")
		process.exit(1)
	}
}
