import React, {ReactNode} from 'react';
import {useGlobals} from '@storybook/preview-api';
import type {
    PartialStoryFn as StoryFunction,
    Renderer,
    StoryContext,
} from '@storybook/types';
import {IntlProvider} from 'next-intl';

export const withNextIntl = (
    StoryFn: StoryFunction<Renderer>,
    context: StoryContext<Renderer>,
) => {
    const [{locale}] = useGlobals();
    const {
        parameters: {nextIntl},
    } = context;

    if (nextIntl === undefined) {
        console.error(
            `The 'nextIntl' parameter is missing in 'parameters' configuration of preview.js. Check the README for instructions.`,
        );
        return StoryFn(context);
    }

    const {
        defaultLocale,
        messagesByLocale,
        formats,
        onError,
        defaultTranslationValues,
        getMessageFallback,
    } = nextIntl || {};

    const currentLocale = locale || defaultLocale;
    const currentMessages = messagesByLocale[currentLocale] || {};

    return (
        <IntlProvider
            defaultTranslationValues={defaultTranslationValues}
            formats={formats}
            getMessageFallback={getMessageFallback}
            locale={currentLocale}
            messages={currentMessages}
            onError={onError}
        >
            {StoryFn(context) as ReactNode | null}
        </IntlProvider>
    );
};
