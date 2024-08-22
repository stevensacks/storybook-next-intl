import en from '../src/stories/messages/en';
import fr from '../src/stories/messages/fr';
import ja from '../src/stories/messages/ja';

const messagesByLocale: Record<string, any> = {en, fr, ja};

const nextIntl = {
    defaultLocale: 'en',
    messagesByLocale,
};

export default nextIntl;
