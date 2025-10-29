# Contributing to Student Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🌟 Ways to Contribute

1. **Report Bugs**: Open an issue describing the bug
2. **Suggest Features**: Open an issue with your feature idea
3. **Submit Pull Requests**: Fix bugs or add features
4. **Improve Documentation**: Help make the docs better
5. **Share**: Star the repo and share with others

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: How to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version

## 💡 Suggesting Features

When suggesting features:

- Check if the feature already exists
- Explain why this feature would be useful
- Provide examples of how it would work
- Consider if it fits the project's scope

## 🔨 Pull Request Process

1. **Fork the Repository**
```bash
git clone https://github.com/yourusername/student-portfolio.git
cd student-portfolio
```

2. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

3. **Make Your Changes**
- Follow existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation if needed

4. **Test**
```bash
npm run dev      # Test in development
npm run build    # Make sure it builds
npm run preview  # Test production build
```

5. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve issue with..."
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

6. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request**
- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Describe your changes
- Submit the PR

## 📝 Code Style Guidelines

### JavaScript/React

- Use functional components with hooks
- Use meaningful variable names
- Follow existing component structure
- Keep components focused and small
- Use PropTypes or TypeScript for type checking

```jsx
// Good
const Header = ({ language, setLanguage, darkMode, setDarkMode, translations }) => {
  // Component logic
};

// Bad
const Header = (props) => {
  // Component logic
};
```

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Keep custom CSS in index.css
- Use CSS variables for theming
- Follow mobile-first approach

```jsx
// Good
<div className="flex items-center gap-4 md:gap-8">

// Bad
<div className="md:gap-8 flex gap-4 items-center">
```

### File Organization

- Components in `src/components/`
- Data/translations in `src/data/`
- Hooks in `src/hooks/`
- Utilities in `src/utils/`
- Assets in `public/`

## 🧪 Testing

Before submitting:

1. **Manual Testing**
   - Test all features work
   - Test on different screen sizes
   - Test dark/light theme
   - Test both languages

2. **Build Testing**
   ```bash
   npm run build
   npm run preview
   ```

3. **Check Setup**
   ```bash
   npm run check
   ```

## 📚 Documentation

When adding features:

1. Update README.md if needed
2. Update CUSTOMIZATION.md for new customization options
3. Add comments for complex code
4. Update translations in both languages

## 🎨 Design Guidelines

- Follow existing design patterns
- Use consistent spacing and sizing
- Maintain responsive design
- Keep animations smooth and purposeful
- Ensure accessibility (ARIA labels, keyboard navigation)

## 🔍 Code Review Process

All PRs will be reviewed for:

- Code quality and style
- Functionality and correctness
- Performance implications
- Documentation updates
- Breaking changes

## ⚠️ What Not to Do

- Don't submit PRs without testing
- Don't include unrelated changes
- Don't ignore existing code style
- Don't add large dependencies without discussion
- Don't remove features without good reason

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Thanked in the community

## 📞 Questions?

- Open an issue for questions
- Check existing issues and PRs first
- Be respectful and patient

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
