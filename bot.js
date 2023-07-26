const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

const repoPath = path.join(__dirname, "git-repo"); // Path to the Git repository
const fileName = "random-file.txt";
const botBranch = "main"; // Name of the branch for the commit bot

// Function to generate a random string for the file content
function generateRandomContent() {
    // Implement your logic to generate random content
    return "Random content: " + Math.random();
}

// Function to check if the file exists and create it if not
function ensureFileExists(filePath) {
    if (!fs.existsSync(filePath)) {
        // If the file doesn't exist, create it with default content
        fs.writeFileSync(filePath, "Initial content");
    }
}

// Function to rename the branch if it's "master"
function renameMasterToMain(git) {
    return git.branchLocal().then(({ current }) => {
        if (current === "master") {
            // Rename the branch from "master" to "main"
            return git.checkoutLocalBranch("main").then(() => {
                return git.deleteLocalBranch("master", true);
            });
        }
    });
}

// Function to update the file content and commit changes
function commitRandomFile() {
    const fileContent = generateRandomContent();
    const filePath = path.join(repoPath, fileName);

    // Ensure the file exists or create it with default content
    ensureFileExists(filePath);

    // Write the random content to the file (overwriting the previous content)
    fs.writeFileSync(filePath, fileContent);

    // Initialize simple-git with the repository directory
    const git = simpleGit(repoPath);

    // Check and rename the branch if it's "master"
    renameMasterToMain(git)
        .then(() => {
            // Add the file to the staging area
            return git.add(fileName);
        })
        .then(() => {
            // Commit the changes with a random commit message
            return git.commit(`Update: ${fileName}`);
        })
        .then(() => {
            console.log(`Changes committed: ${fileName}`);
            // Push the changes to the remote repository (origin)
            return git.push("origin", botBranch);
        })
        .then(() => {
            console.log(`Changes pushed to origin/${botBranch}`);
        })
        .catch((err) => {
            console.error("Error committing/pushing changes:", err);
        });
}

// Schedule the commits (e.g., every 1 hour)
const schedule = require("node-schedule");
schedule.scheduleJob("0 * * * *", commitRandomFile); // Run every hour at minute 0

// Optionally, you can run the commitRandomFile function once at the start
commitRandomFile();
