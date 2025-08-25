# Contributing to ImpactClick MVP

Thank you for your interest in contributing to ImpactClick! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide error messages and stack traces
- Include your environment details (OS, Node.js version, etc.)

### Suggesting Features
- Use the GitHub issue tracker with the "enhancement" label
- Describe the feature and its benefits
- Include mockups or examples if possible

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/impactclick-mvp.git
cd impactclick-mvp

# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:backend
npm run test:dashboard
npm run test:widget
```

## 📝 Code Style

### TypeScript
- Use TypeScript for all new code
- Follow the existing code style
- Add proper type annotations
- Use interfaces for object shapes

### React Components
- Use functional components with hooks
- Follow the existing naming conventions
- Use TypeScript for props and state

### NestJS Backend
- Follow NestJS best practices
- Use decorators appropriately
- Add proper validation using class-validator
- Include proper error handling

## 🧪 Testing Guidelines

### Backend Tests
- Write unit tests for services
- Write integration tests for controllers
- Use Jest as the testing framework
- Mock external dependencies

### Frontend Tests
- Write component tests using React Testing Library
- Test user interactions and state changes
- Mock API calls and external services

### Widget Tests
- Test widget initialization
- Test click tracking functionality
- Test error handling

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] New functionality includes tests
- [ ] Documentation is updated
- [ ] No console errors or warnings

### Pull Request Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issue
- `priority: low` - Low priority issue

## 📞 Getting Help

- Check existing issues and pull requests
- Join our community discussions
- Contact the maintainers directly

## 🙏 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

Thank you for contributing to ImpactClick! 🚀
