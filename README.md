# Structures

An open-source Angular platform by [The Corner](https://github.com/thecorner-inc) designed to help teams **visualize, document, and share project organization standards** — starting with folder structures.

---

## Overview

Modern development teams often struggle to keep their **project organization** consistent and understandable — especially when onboarding new members or collaborating across roles.

**Structure** solves that by offering an **interactive, VS Code–like interface** where you can:

- 🗂️ Explore a project’s folder structure visually  
- 💬 Hover files and folders to see their purpose  
- 🧭 Understand how everything connects  
- 💾 Save and share structures (via JSON, later online)  

---

## Current Focus — *Folders for Angular*

The first version focuses on **Angular folder structures**, letting you:

- See an opinionated best-practice folder setup  
- Read contextual explanations for each file/folder  
- Explore an intuitive VS Code–inspired UI  
- Prepare for full customization and export (coming soon)

Later, other frameworks will follow: **React**, **Vue**, **NestJS**, and more.

---

## Roadmap

| Phase    | Goal                                                   | Status        |
| -------- | ------------------------------------------------------ | ------------- |
| **v0.1** | Display static Angular folder structure + descriptions | 🚧 In progress |
| **v0.2** | Add JSON import/export                                 | 🚧 Planned     |
| **v0.3** | Enable users to edit and save their own structures     | 🚧 Planned     |
| **v0.5** | Add support for other frameworks                       | ⏳ Planned     |
| **v0.4** | Add theming (VS Code dark/light)                       | ⏳ Planned     |

---

## Getting Started

### Setup
```bash
npm install
```

### Development
```bash
npm start
```

---

## Usage
- Open the app in your browser (default: [http://localhost:4200](http://localhost:4200))
- Browse the folder structure and read contextual markdown for each file/folder
- Use the search and settings features to explore and customize

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- Fork the repo and create a feature branch
- Make your changes and add tests if needed
- Open a pull request with a clear description

### Folder structure proposal
The structure can be found under `public/assets/[language]/settings.json`. 
Feel free to suggest improvements or new structures by opening an issue or pull request.

### Page & component content
Content for files and folders is stored as markdown files under `public/assets/[language]/md/`. 
You can contribute by adding new explanations or improving existing ones.

---

## Links
- [Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme)
- [Angular](https://angular.io)
