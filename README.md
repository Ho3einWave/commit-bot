# Commit Bot

This is a Node.js script that acts as a commit bot, automatically making commits to a Git repository at regular intervals. It uses the `simple-git` package to interact with the local Git repository and the `node-schedule` package to schedule commits.

## Installation

Before running the bot, make sure you have Node.js installed on your system.

1. Clone this script into a folder on your local machine.

2. Clone or create a Git repository where you want the bot to make commits. You can name the repository "git-repo" for this example.

3. Install the required dependencies by running the following command in the script folder:

```bash
npm install
```

## Configuration

1. Update the `repoPath` variable to point to the path of your Git repository.

2. Modify the `fileName` variable to specify the file you want to update and commit. For this example, it is set to "random-file.txt."

3. Set the `botBranch` variable to the name of the branch where you want the bot to commit changes. The default value is "main."

## Usage

1. The bot generates random content for the file specified by `fileName` using the `generateRandomContent` function. You can modify this function to generate the desired content.

2. The `ensureFileExists` function checks if the specified file exists in the repository. If the file does not exist, it will be created with default content ("Initial content").

3. The `renameMasterToMain` function checks if the bot is running on a branch named "master." If it is, it will rename the branch to "main." This ensures compatibility with repositories that have transitioned from "master" to "main" as the default branch.

4. The `commitRandomFile` function performs the following steps:
   - Generates random content for the file.
   - Writes the random content to the file.
   - Initializes `simple-git` with the repository directory.
   - Checks and renames the branch if it's "master" (optional).
   - Adds the file to the staging area.
   - Commits the changes with a random commit message.
   - Pushes the changes to the remote repository (origin) on the specified branch (`botBranch`).

5. The bot is scheduled to run automatically using the `node-schedule` package. In this example, it is scheduled to run every hour at minute 0. You can adjust the schedule as needed.

6. Optionally, you can manually run the `commitRandomFile` function once at the start by uncommenting the last line in the script.

## Important Note

Before using the bot in a production environment, test it in a safe and controlled environment to ensure that it behaves as expected and meets your requirements. Automatic commits should be used with caution to avoid unintended consequences in a shared repository.

Enjoy your commit bot!