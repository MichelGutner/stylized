# 📦 Publishing Guide

This guide covers the process of publishing the `stylized` library to npm.

## 🚀 Prerequisites

1. **Node.js**: Ensure you have Node.js 18+ installed
2. **npm account**: Make sure you're logged in to npm
   ```bash
   npm login
   ```
3. **Git**: Ensure all changes are committed and pushed

## 📋 Pre-Publish Checklist

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Documentation is updated
- [ ] Version number is updated in `package.json`
- [ ] CHANGELOG.md is updated
- [ ] Package size is reasonable (check with `npm pack --dry-run`)

## 🏗️ Build Process

The build process is automated:
1. `npm run build` - Compiles TypeScript to `dist/`
2. `npm pack --dry-run` - Shows what will be published

## 📦 Publishing Commands

### Standard Publishing
```bash
# Publish to npm
npm publish
```

### Beta/Alpha Publishing
```bash
# Publish as beta
npm publish --tag beta

# Publish as alpha
npm publish --tag alpha
```

### Dry Run (Recommended)
```bash
# Test packaging without publishing
npm pack --dry-run
```

## 🔄 Automated Publishing

The project includes automated publishing setup:

### Scripts
- `prepublishOnly`: Runs before publishing (`build + test`)
- `prepack`: Runs before packaging (`build`)

### Semantic Release
Configure `.releaserc.js` for automated releases based on commit messages:

```bash
# Conventional commits trigger releases:
git commit -m "feat: add new feature"     # Minor release
git commit -m "fix: resolve bug"         # Patch release
git commit -m "BREAKING: change API"     # Major release
```

## 📊 Package Contents

The published package includes:
- ✅ `dist/` - Compiled JavaScript and TypeScript definitions
- ✅ `README.md` - Main documentation
- ✅ `LICENSE` - MIT license
- ✅ `package.json` - Package metadata
- ✅ `CHANGELOG.md` - Version history

Excluded files (via `.npmignore`):
- ❌ Source TypeScript files
- ❌ Development configs
- ❌ Tests and examples
- ❌ Documentation (except README/CHANGELOG)

## 🔍 Verification

After publishing:

1. **Check npm page**: Visit https://www.npmjs.com/package/stylized
2. **Test installation**: 
   ```bash
   npm install stylized
   ```
3. **Verify imports**:
   ```typescript
   import { engine } from 'stylized/react-native';
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Permission denied**: Ensure you're logged in to npm
   ```bash
   npm whoami
   ```

2. **Version exists**: Increment version in `package.json`
   ```bash
   npm version patch  # 0.0.1 -> 0.0.2
   npm version minor  # 0.0.1 -> 0.1.0
   npm version major  # 0.0.1 -> 1.0.0
   ```

3. **Build fails**: Check TypeScript errors
   ```bash
   npm run build
   ```

4. **Tests fail**: Fix failing tests before publishing
   ```bash
   npm test
   ```

### Rollback

If something goes wrong:
```bash
# Unpublish (within 72 hours)
npm unpublish stylized@0.0.1

# Deprecate a version
npm deprecate stylized@0.0.1 "Critical bug in this version"
```

## 📈 Post-Publish

1. **Create GitHub Release** (if not using semantic-release)
2. **Update documentation** if needed
3. **Monitor downloads** on npm
4. **Address issues** reported by users

## 🎯 Best Practices

1. **Semantic Versioning**: Follow semver strictly
2. **Changelog**: Always update CHANGELOG.md
3. **Testing**: Ensure 100% test coverage
4. **Documentation**: Keep docs in sync with code
5. **Security**: Regularly audit dependencies
   ```bash
   npm audit
   ```

## 📞 Support

For publishing issues:
- 📧 Create an issue on GitHub
- 📖 Check npm documentation: https://docs.npmjs.com/
- 🐛 Report bugs in the issue tracker
