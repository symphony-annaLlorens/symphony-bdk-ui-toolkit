import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import {THEMES} from "../src/styles/colors";
import {Logger} from "../src/utils";
import withTextSizer from './custom-addons/text-sizer';
import './config.css';
import { SizeContext } from './custom-addons/text-sizer/text-size-provider';
import { StoryWrapper } from '../src/components/misc/wrappers';
import { themes } from '@storybook/theming'
import theme from './theme';

Logger.setEnv({
  appTitle: 'MS Storybook',
  environment: 'DEV',
  apiUrl: null,
  debugLevel: 1,
});

const decoratedThemes = THEMES.map(theme => Object.assign({
  name: theme.mode,
}, theme)).reverse();

const sizes = ['small', 'normal'];

const CustomThemeProvider = ({ theme, children, args }) => (
  <SizeContext.Consumer>
    {(value) => {
      return (
        <ThemeProvider theme={{...theme, size: value}}>
          <StoryWrapper p={15}>
            {children}
          </StoryWrapper>
        </ThemeProvider>);
    }}
  </SizeContext.Consumer>
);

const DocsPageWrapper = (args) =>  (
  <ThemeProvider theme={THEMES[0]}>
      <DocsContainer {...args}/>
  </ThemeProvider>
);

addParameters({
  docs: {
    container: DocsPageWrapper,
    page: DocsPage,
  },
});

addParameters({
  options: {
	  theme: theme,
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
    showRoots: true,
	}
});

addDecorator(withThemesProvider(decoratedThemes, CustomThemeProvider));
addDecorator(withTextSizer(sizes));
