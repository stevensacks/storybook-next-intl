import type {Renderer, ProjectAnnotations} from 'storybook/internal/types';
import i18n from 'storybook-i18n/preview';
import {withNextIntl} from './withNextIntl';

const i18nDecorators = i18n.decorators || [];

const preview: ProjectAnnotations<Renderer> = {
    ...i18n,
    // @ts-expect-error i18nDecorators may be a single non-iterable decorator, not an array
    decorators: [...i18nDecorators, withNextIntl],
};

export default preview;
