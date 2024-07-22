import en from '../src/stories/messages/en';
import fr from '../src/stories/messages/fr';
import ja from '../src/stories/messages/ja';

const messages: Record<string, any> = {en, fr, ja};

const nextIntl = {
    defaultLocale: 'en',
    messages,
};

export default nextIntl;
