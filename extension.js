const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

let translations = {};

function loadTranslations() {
    const language = vscode.env.language; // Π.χ., "en" ή "el"
    const translationsPath = path.join(__dirname, 'i18n', `${language}.json`);

    if (fs.existsSync(translationsPath)) {
        const fileContent = fs.readFileSync(translationsPath, 'utf8');
        translations = JSON.parse(fileContent);
    } else {
        // Αν η μετάφραση δεν υπάρχει, φορτώνουμε την προεπιλεγμένη (π.χ., αγγλικά)
        const defaultTranslationsPath = path.join(__dirname, 'i18n', 'en.json');
        const fileContent = fs.readFileSync(defaultTranslationsPath, 'utf8');
        translations = JSON.parse(fileContent);
    }
}

function translate(key) {
    return translations[key] || key; // Αν το κλειδί δεν βρεθεί, επιστρέφει το ίδιο το κλειδί
}

function activate(context) {
    // Φόρτωσε μεταφράσεις κατά την ενεργοποίηση
    loadTranslations();

    // Δημιουργία ενός στοιχείου Status Bar
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = translate("buildNotAvailable");
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Συνάρτηση για την ενημέρωση του αριθμού build
    function updateBuildNumber() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage(translate("noWorkspace"));
            statusBarItem.text = translate("buildNotAvailable");
            return;
        }

        const filePath = path.join(workspaceFolders[0].uri.fsPath, ".versions", "lastBuild.json");
        if (!fs.existsSync(filePath)) {
            vscode.window.showErrorMessage(translate("fileMissing"));
            statusBarItem.text = translate("buildNotAvailable");
            return;
        }

        try {
            const fileContent = fs.readFileSync(filePath, "utf8");
            const jsonContent = JSON.parse(fileContent);
            const buildNumber = jsonContent.lastBuildNumber || "Unknown";

            // Διάβασε τη ρύθμιση από το configuration
            const config = vscode.workspace.getConfiguration('buildNumberDisplay');
            const format = config.get('format', 'Build: {number}');

            // Ενημέρωση του status bar με μορφοποιημένο κείμενο
            statusBarItem.text = format.replace('{number}', buildNumber);
        } catch (error) {
            vscode.window.showErrorMessage(translate("buildError") + `: ${error.message}`);
            statusBarItem.text = translate("buildError");
        }
    }

    // Ενημέρωση του αριθμού build κατά την ενεργοποίηση
    updateBuildNumber();

    // Εγγραφή FileSystemWatcher για το αρχείο lastBuild.json
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        const fileWatcher = vscode.workspace.createFileSystemWatcher(
            new vscode.RelativePattern(workspaceFolders[0], ".versions/lastBuild.json")
        );

        fileWatcher.onDidChange(() => {
            updateBuildNumber();
        });

        fileWatcher.onDidCreate(() => {
            updateBuildNumber();
        });

        fileWatcher.onDidDelete(() => {
            statusBarItem.text = translate("buildNotAvailable");
        });

        context.subscriptions.push(fileWatcher);
    }

    // Εγγραφή Command για χειροκίνητη ενημέρωση
    const command = vscode.commands.registerCommand("extension.refreshBuildNumber", () => {
        updateBuildNumber();
    });
    context.subscriptions.push(command);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
