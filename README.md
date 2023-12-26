<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>TikTok Discord Bot 2</h1>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript" />
</p>
<img src="https://img.shields.io/github/license/InformationlessUsername/TikTok-Discord-Bot-2?style=flat&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/InformationlessUsername/TikTok-Discord-Bot-2?style=flat&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/languages/top/InformationlessUsername/TikTok-Discord-Bot-2?style=flat&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents

- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 Running TikTok-Discord-Bot-2](#-running-TikTok-Discord-Bot-2)
- [📄 License](#-license)

---

## 📍 Overview

This is the fifth iteration of this project. It is labelled as v2 because it is a complete rewrite of the now-deprecated [v1](https://github.com/InformationlessUsername/TikTok-Discord-Bot). TikTok has continually been changing their API, which prompted the rewrite, aiming for increased stability and reduced maintenance.

Features:

Responds to TikTok links with customizable embeds and the source video or image(s)
Supports missed-message rescanning and cleans up bot-initiated interactions.
Built in JavaScript using Discord.js and a third-party API for watermark-free TikTok content.
Designed for modularity and readability. Detailed documentation.

---

## 📦 Features

|     | Feature           | Description                                                                                                                                      |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**  | The bot is structured around an event-driven design architecture, where dedicated handlers respond to specific Discord events.                   |
| 📄  | **Documentation** | Features full [JSDoc](https://jsdoc.app/) in both main and utility/handler modules                                                               |
| 🔗  | **Dependencies**  | The project relies on external node.js libraries like discord.js, dotenv for environment variables, and tiktok-no-watermark-api for convenience. |
| 🧩  | **Modularity**    | The code is well-organized into separate, specific modules like event handlers and utility functions for readability and maintainability.        |
| ⚡️ | **Performance**   | The project's main bottleneck is internet speed for both requests to TikTok and the Discord API.                                                 |

---

## 📂 Repository Structure

```sh
└── TikTok-Discord-Bot-2/
    ├── eventHandlers/
    │   ├── onMessageCreate.js
    │   └── onceReady.js
    ├── index.js
    ├── options.js
    ├── package.json
    └── utilities/
        ├── downloadFile.js
        ├── fixURL.js
        ├── generateSlideshowEmbed.js
        ├── generateVideoEmbed.js
        └── uniqueColorHex.js

```

---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the TikTok-Discord-Bot-2 repository:

```sh
git clone https://github.com/InformationlessUsername/TikTok-Discord-Bot-2
```

2. Change to the project directory:

```sh
cd TikTok-Discord-Bot-2
```

3. Install the dependencies:

```sh
npm install
```

or

```sh
yarn install
```

### 🤖 Running TikTok-Discord-Bot-2

```sh
node index.js
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/InformationlessUsername/TikTok-Discord-Bot-2/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/InformationlessUsername/TikTok-Discord-Bot-2/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/InformationlessUsername/TikTok-Discord-Bot-2/issues)**: Submit bugs found or log feature requests for INFORMATIONLESSUSERNAME.

#### _Contributing Guidelines_

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License.

---

[**Return**](#Top)

---
