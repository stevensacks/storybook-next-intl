import type {Renderer, ProjectAnnotations} from '@storybook/types';
import i18n from 'storybook-i18n/preview';
import {withNextIntl} from './withNextIntl';

// @ts-ignore
const i18nDecorators = i18n.decorators || [];

const preview: ProjectAnnotations<Renderer> = {
    ...i18n,
    decorators: [...i18nDecorators, withNextIntl],
};

export default preview;
