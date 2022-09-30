# Ecommerce101

## Small fullstack single-page ecommerce application for learning purposes

## **Requirements and Setup:**

- [node and npm](https://nodejs.org/)
- [git](https://git-scm.com/)
- Set your name in git `git config --global user.name "your name"`
- Set your email in git `git config --global user.email "your email"` (verify with `cat .git/config`)
- We use prettier formatter so set it on save in your IDE as default formatter and install any additional prettier extension
- Run `npm install`
- Run development mode `npm run dev`

## **Code conventions:**

- No debugging code in PR
- No comments in PR
- Make sure your changes are responsive and they not brake the desktop/mobile view
- We follow [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/) for our folder/files structures (except templates)
- We follow some sort of [BEM (Blocks, Elemets, Modifiers)](https://getbem.com/introduction/) css methodology, check the current classNames in an existing module.

## **Branches and Pull Requests**:

- All branches are created from the latest `develop` branch
- All branches are merged into `develop` branch
- Branch and PR names must start with `ECM-<ticketNumber>-<name>`
- Commits must start with `ECM-<ticketNumber>` and be descriptive.

## **Releases**:

- We work with 3 environments `develop` (local), `staging` (deployed) and `production` (deployed)
- We work with [Semantic Versioning](https://semver.org/#semantic-versioning-200) system (`vA.B.C`)
  - `A` MAJOR version when you make incompatible API changes
  - `B` MINOR version when you add functionality in a backwards compatible manner
  - `C` PATCH version when you make backwards compatible bug fixes or hotfixes in staging/production
- Ideally, `staging` environmen should be ahead of `develop` by 1 "minor version"
- Ideally, `production` environmen should be ahead of `staging` by 1 "minor version"

| Sprint | develop | staging | production |
| ------ | ------- | ------- | ---------- |
| 4      | v1.5.0  | v1.4.0  | v1.3.0     |
| 3      | v1.4.0  | v1.3.0  | v1.2.0     |
| 2      | v1.3.0  | v1.2.0  | v1.1.0     |
| 1      | v1.2.0  | v1.1.0  | none       |
