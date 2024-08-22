# Storybook next-intl addon

Easy next-intl Storybook integration.

Required Peer Dependencies:
* storybook - `^8.2.0`
* next-intl - `^3.0.0`

This Storybook addon assumes your project is already set up with [next-intl](https://next-intl-docs.vercel.app/), and that it is properly configured and working.

## Installation

Install this addon as a devDependency.

```bash
npm i -D storybook-next-intl
```

## Usage

After installing, follow these 3 steps to enable this addon in Storybook.

### main.ts
Insert this addon into your addons array:
```typescript
{
  addons: [
    // other addons...
    'storybook-next-intl',
  ]
}
```
---

### next-intl.ts
Create a file in your `.storybook` folder called `next-intl.ts` (or whatever you like). 

In this file, copy and paste the below code and make whatever modifications you need (paths to messages files, etc.).
```typescript
import en from '../src/messages/en.json';
import fr from '../src/messages/fr.json';
import ja from '../src/messages/ja.json';

const messagesByLocale: Record<string, any> = {en, fr, ja};

const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale,
};

export default nextIntl;
```

You can also include options such as [formats](https://next-intl-docs.vercel.app/docs/usage/configuration#formats), [defaultTranslationValues](https://next-intl-docs.vercel.app/docs/usage/configuration#default-translation-values), [onError and getMessageFallback](https://next-intl-docs.vercel.app/docs/usage/configuration#error-handling).
```typescript
const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale,
  formats: {/* your settings */},
  defaultTranslationValues: {/* your settings */},
  onError: (error) => console.error(error),
  getMessageFallback: ({namespace, key}) => `${namespace}.${key}`,
};
```
---

### preview.ts
In your `preview.ts`, you need to add the `locales` and `locale` to `initialGlobals`, as well as adding `nextIntl` that you exported from the above file to parameters.

`locales` is an object where the keys are the "ids" of the locales/languages and the values are the names you want to display in the dropdown.

`locale` is what you want the default locale to be.

```typescript
import nextIntl from './next-intl';

const preview: Preview = {
    initialGlobals: {
        locale: 'en',
        locales: {
            en: 'English',
            fr: 'Français',
            ja: '日本語',
        },
    },
    parameters: {
      nextIntl,
    },
};

export default preview;
```

You can also use full locale strings as keys. It depends on your next-intl configuration.

```typescript
import nextIntl from './next-intl';

const preview: Preview = {
    initialGlobals: {
        locale: 'en_US',
        locales: {
            en_US: 'English (US)',
            en_GB: 'English (GB)',
            fr_FR: 'Français',
            ja_JP: '日本語',
        },
    },
    parameters: {
      nextIntl,
    },
};

export default preview;
```


The `locales` object can also have values as an object with keys of `title`, `left`, or `right`.

This is useful if you want to include an emoji flag or some other string to the left or right side.

For example:
```typescript
import nextIntl from './next-intl';

const preview: Preview = {
    initialGlobals: {
        locale: "en",
        locales: {
            en: {icon: '🇺🇸', title: 'English', right: 'EN'},
            fr: {icon: '🇫🇷', title: 'Français', right: 'FR'},
            ja: {icon: '🇯🇵', title: '日本語', right: 'JA'},
        },
    },
    parameters: {
      nextIntl,
    },
};

export default preview;
```

Or something like this:
```typescript
import nextIntl from './next-intl';

const preview: Preview = {
    initialGlobals: {
        locale: 'en_US',
        locales: {
            en_US: {title: 'English', right: 'US'},
            en_GB: {title: 'English', right: 'GB'},
            fr_FR: {title: 'Français', right: 'FR'},
            ja_JP: {title: '日本語', right: 'JA'},
        },
    },
    parameters: {
      nextIntl,
    },
};

export default preview;
```

## Story Parameters Locale

If you want to have a story use a specific locale, set it in that Story's parameters.

```typescript jsx
export const Default: StoryObj = {
    render: () => <YourComponent/>,
};

export const Japanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: () => <YourComponent/>,
};
```
Note that doing this switches the current locale to the parameter one, so when you change to a story without a parameter, it will stay at the last selected locale.

In the above example, if you view the Japanese story and then click back on the Default story, the locale will stay `ja`.

---
Once you have finished these steps and launch storybook, you should see a globe icon in the toolbar.

Clicking this globe icon will show a dropdown with the locales you defined in `parameters`. 

Switching locales will use the strings defined in your locale json files.
