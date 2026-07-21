# Contributing to VeriFace

First off, thank you for considering contributing to VeriFace! It's people like you that make VeriFace such a great tool.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally: `git clone https://github.com/your-username/veriface.git`
3. **Add the upstream remote**: `git remote add upstream https://github.com/your-org/veriface.git`
4. **Create a branch** for your feature or bug fix.

## Development Setup

### Backend (Python/FastAPI)
1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows).
4. Install dependencies: `pip install -r requirements.txt`

### Frontend (React)
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Branch Naming Convention

Please follow these conventions for your branch names:
- `feature/description-of-feature`
- `bugfix/description-of-bug`
- `hotfix/description-of-hotfix`

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

Example: `feat: add deepfake video detection endpoint`

## Pull Request Process

1. Ensure your code is fully functional and all tests pass.
2. Provide a clear and comprehensive description of your changes in the PR.
3. Link any relevant issues.
4. Your PR will be reviewed by maintainers. Please be open to feedback and make any requested changes.

## Code Style Guidelines

- **Python**: We use `Black` for code formatting and `flake8` for linting. Please ensure your code conforms before submitting.
- **JavaScript/React**: We use `ESLint` and `Prettier`. Run `npm run lint` and `npm run format` before committing.

## Issue Reporting Guidelines

When reporting an issue, please include:
- A clear, descriptive title.
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Relevant environment details (OS, Node version, Python version).

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior.
