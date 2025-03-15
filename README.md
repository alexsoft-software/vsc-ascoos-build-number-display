# Ascoos Build Number Display

**Version**: 1.0.0  
**Author**: AlexSoft Software

![Screenshot](https://dl.ascoos.com/vscode/images/vsc-ascoos-build-number-display.png)

## Description

The **Ascoos Build Number Display** extension allows you to easily monitor the current build number of your workspace in the status bar of Visual Studio Code. It reads the `lastBuild.json` file from the `.versions` folder in your workspace and displays the `lastBuildNumber` in a simple and accessible way. Designed for developers working with versioned projects or build processes, this extension is a lightweight and effective solution for build tracking.

---

## Features

- **Automatic Activation**: The extension activates automatically when the workspace contains the `.versions/lastBuild.json` file.
- **Ascoos Build Number Display**: Displays the current build number directly in the **status bar**.
- **File Watching**: Automatically updates the displayed build number whenever the `lastBuild.json` file changes.
- **Manual Refresh**: Includes a command for manually refreshing the build number from the `Command Palette`.
- **Error Handling**: Provides clear error messages if the `lastBuild.json` file is missing, corrupted, or unavailable.

---

## Installation

1. Download the `.vsix` file from the [VSIX Package](https://dl.ascoos.com/vscode/vsc-ascoos-build-number-display.vsix).
2. Open **Visual Studio Code**.
3. Go to the **Extensions** view (Ctrl+Shift+X or Cmd+Shift+X).
4. Click the **ellipsis menu (`...`)** in the top-right corner.
5. Choose **Install from VSIX...**.
6. Select the `.vsix` file you downloaded.

---

## Usage

- The extension will automatically activate if the workspace contains the `.versions/lastBuild.json` file.
- The current build number will appear in the **status bar** at the bottom left of the VS Code window.
- **Automatic Updates**: Any changes to the `lastBuild.json` file will instantly update the displayed build number.
- **Manual Refresh**: 
  - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
  - Search for and run the command `Refresh Build Number`.
- Error messages will appear if the `lastBuild.json` file is missing, corrupted, or deleted.

---

## File Requirements

The `.versions/lastBuild.json` file must be present in the workspace directory. It should have the following structure:
```json
{
  "lastBuildNumber": 11200
}
```

If the file is missing or does not follow this structure, the extension will display an error in the status bar.

This extension requires the use of the **vsc-ascoos-update-build** extension, which generates the `lastBuild.json` file. Ensure that the `vsc-ascoos-update-build` extension is installed and properly configured in your workspace to create and maintain the build file.

## Known Issues
- If the `.versions/lastBuild.json` file is missing or corrupted, an error message will be displayed.
- Only the first workspace folder is supported in multi-root workspaces.

## Configuration
The extension supports configuration for customizing the display format of the build number:

**`buildNumberDisplay.format`:**
- **Type**: String
- **Default**: `"Build: {number}"`
- **Description**: Customize the format of the build number display. Use `{number}` as a placeholder for the build number.

### Example:
```json
{
  "buildNumberDisplay.format": "Current Build → {number}"
}
```

## Contributing
If you'd like to contribute to this extension, feel free to fork the repository and create a pull request with your changes.

## License
This project is licensed under the AGL-F (ASCOOS General License - Free). See the [LICENSE](https://docs.ascoos.com/lics/ascoos/AGL-F.html) file for details.