import { execSync } from "child_process"
import process from "process"

if (process.env.VERCEL_ENV === "production") {
	try {
		execSync("npm run build:prod", { stdio: "inherit" })
	} catch (error) {
		process.exit(1)
	}
}
