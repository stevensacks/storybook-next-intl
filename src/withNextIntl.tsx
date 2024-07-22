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
        console.error(`The 'nextIntl' parameter is missing in 'parameters' configuration of preview.js. Define the 'i18n' parameter as follows:
parameters: {
    nextIntl,
}, 
`);
        return StoryFn(context);
    }

    const {defaultLocale, messages} = nextIntl || {};
    const currentLocale = locale || defaultLocale;
    const currentMessages = messages[currentLocale] || {};

    console.log('-'.repeat(50));
    console.log({currentMessages, locale, currentLocale});
    console.log('-'.repeat(50));

    return (
        <IntlProvider messages={currentMessages} locale={currentLocale}>
            {StoryFn(context) as ReactNode | null}
        </IntlProvider>
    );
};
