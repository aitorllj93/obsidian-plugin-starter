# Obsidian Plugin Starter Kit React + Tailwind CSS

## Initialization

To initialize the plugin with your own values, run the initialization script:

### Interactive mode

```bash
npm run init
```

The script will ask you for:
- **Plugin ID**: In kebab-case format (e.g: `my-plugin`)
- **Plugin name**: Readable name (e.g: `My Plugin`)
- **Description**: Optional plugin description

### CLI arguments mode

```bash
npm run init -- --id my-plugin --name "My Plugin" --description "Plugin description"
```

The script will automatically update all necessary files:
- `manifest.json`
- `package.json`
- `esbuild.config.mjs`
- `src/main.tsx`
- `src/components/App.tsx`
- `src/settings-tab.ts`
- `README.md`

## Development

After initializing, you can start developing:

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build

# Install in Obsidian vault
npm run dev-install <path-to-vault>
```
