# Ecommerce101

## Small fullstack single-page ecommerce application for learning purposes

### **Requirements and Setup:**

- [node and npm](https://nodejs.org/)
- [git](https://git-scm.com/)
- Set your name in git `git config --global user.name "your name"`
- Set your email in git `git config --global user.email "your email"` (verify with `cat .git/config`)
- We use prettier formatter so set it on save in your IDE as default formatter and install any additional prettier extension
- Run `npm install`
- Environment variables are needed to provide firebase credentials, request them from a dev.
- Run entire app: `npm run start`
- Run just the client: `npm run dev:client`
- Run just the server: `npm run dev:server`

### **Code conventions:**

- No debugging code in PR
- No comments in PR
- Make sure your changes are responsive and they not brake the desktop/mobile view
- We follow [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/) for our folder/files structures (except templates)
- We follow some sort of [BEM (Blocks, Elemets, Modifiers)](https://getbem.com/introduction/) css methodology, check the current classNames in an existing module.

### **Branches and Pull Requests**:

- All branches are created from the latest `develop` branch
- All branches are merged into `develop` branch
- Branch and PR names must start with `ECM-<ticketNumber>-<name>`
- Commits must start with `ECM-<ticketNumber>` and be descriptive.

### **Releases**:

- We work with 2 environments `develop` (local) and `staging` (deployed)
- We work with [Semantic Versioning](https://semver.org/#semantic-versioning-200) system (`vA.B.C`)
  - `A` MAJOR version when you make incompatible API changes
  - `B` MINOR version when you add functionality in a backwards compatible manner
  - `C` PATCH version when you make bug fixes or hotfixes in staging
- Ideally, `staging` environment should be behind of `develop` by 1 "minor version"
- When the sprint ends we deploy a new `release/v<sprintVersion>` and we QA it.
- In the future we will add a production environment

| Sprint | develop | staging |
| ------ | ------- | ------- |
| 1      | v1.2.x  | v1.1.x  |
