import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, text, boolean, select,
} from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx/lib';
import styled from 'styled-components';

import Button from '.';
import Box from '../Box';
import Text from '../Text';
import { FILL_TYPES } from './theme';
import { THEME_TYPES } from '../../../styles/colors';

const asyncAction = async () => new Promise(success => setTimeout(success, 2000));

const EditableComponent = () => {
  const BUTTON_TYPES = {
    Danger: 'danger',
    Primary: 'primary',
    Secondary: 'secondary',
    Grey: 'grey',
  };

  const BUTTON_SIZES = {
    TINY: 'tiny',
    SMALL: 'small',
    LARGE: 'large',
  };

  return (
    <Box horizontal space={20} align="center">
      <Button
        size={select('Button Size', BUTTON_SIZES, 'large')}
        type={select('Button Type', BUTTON_TYPES, 'primary')}
        fill={select('Button Fill Type', FILL_TYPES)}
        disabled={boolean('Disabled', false)}
      >
        <span>{text('Button Label', 'Sample')}</span>
      </Button>
    </Box>
  );
};


const StoryWrapper = styled(Box)`
  background-color: ${props => (props.theme.mode === THEME_TYPES.LIGHT ? 'white' : '#17191C')};
`;

storiesOf('Base', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('Button', () => (
    <StoryWrapper p={15}>
      <Box>
        <Text title size="large">Live Example (Knobs)</Text>
        { EditableComponent() }
      </Box>
      <Box>
        <Text title size="large">Button types</Text>
        <Box horizontal space={20}>
          <Button size="large" type="primary" fill="filled" onClick={action('clicked')}>
            <span>Primary</span>
          </Button>
          <Button size="large" type="secondary" fill="filled" onClick={action('clicked')}>
            <span>Secondary</span>
          </Button>
          <Button size="large" type="danger" fill="filled" onClick={action('clicked')}>
            <span>Danger</span>
          </Button>
          <Button size="large" type="grey" fill="filled" onClick={action('clicked')}>
            <span>Grey</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Outlined buttons</Text>
        <Box horizontal space={20}>
          <Button size="large" type="primary" fill="filled" onClick={action('clicked')}>
            <span>Filled</span>
          </Button>
          <Button size="large" type="secondary" fill="outlined" onClick={action('clicked')}>
            <span>Outlined</span>
          </Button>
          <Button size="large" type="danger" fill="ghost" onClick={action('clicked')}>
            <span>GHOST</span>
          </Button>
        </Box>
        <Box>
          <Text title size="large">Button size</Text>
          <Box horizontal space={20} align="center">
            <Button size="large" type="primary" fill="filled" onClick={action('clicked')}>
              <span>Large</span>
            </Button>
            <Button size="small" type="danger" fill="outlined" onClick={action('clicked')}>
              <span>Small</span>
            </Button>
            <Button size="tiny" type="secondary" onClick={action('clicked')}>
              <span>Tiny</span>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Async loader</Text>
        <Box horizontal space={20} align="center">
          <Button size="large" type="primary" fill="filled" onClick={asyncAction}>
            <span>Next</span>
          </Button>
          <Button size="large" type="danger" fill="outlined" onClick={asyncAction}>
            <span>Delete</span>
          </Button>
          <Button size="small" fill="filled" type="secondary" onClick={asyncAction}>
            <span>Submit</span>
          </Button>
        </Box>
      </Box>
      <Box>
        <Text title size="large">Disabled buttons</Text>
        <Box horizontal space={20} align="center">
          <Button size="large" type="primary" fill="filled" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="large" type="danger" fill="outlined" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="small" type="secondary" fill="filled" disabled onClick={asyncAction}>
            <span>Disabled</span>
          </Button>
          <Button size="large" type="grey" disabled fill="ghost" onClick={action('clicked')}>
            <span>DISABLED</span>
          </Button>
        </Box>
      </Box>
    </StoryWrapper>
  ));
