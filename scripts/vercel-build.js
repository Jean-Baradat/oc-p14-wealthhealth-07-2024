import { execSync } from "child_process"
import process from "process"

const buildCommand = process.env.VERCEL_ENV === "production" ? "build:prod" : ""

try {
	execSync(`npm run ${buildCommand}`, { stdio: "inherit" })
} catch (error) {
	process.exit(1)
}
