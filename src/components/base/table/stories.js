import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import Table from '.';
import Box from '../box';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';
import Text from '../text';

const handleTestEdit = (item) => {
  console.log(item);
};

const handleTestDelete = (item) => {
  console.log(item);
};
const DATA = [{
  email: '4@domain.com',
  name: 'A',
  link: 'http://a.com',
}, {
  email: '3@domain.com',
  name: 'B',
  link: 'http://b.com',
}, {
  email: '2@domain.com',
  name: 'C',
  link: 'http://c.com',
}, {
  email: '1@domain.com',
  name: 'D',
  link: 'http://d.com',
}];

const COLUMNS = [{
  Header: 'Name',
  tooltip: 'The name',
  accessor: 'name',
  width: undefined,
}, {
  Header: 'Email',
  accessor: 'email',
  width: undefined,
  tooltip: 'Or some other non-obvious descriptor for your table',
}, {
  Header: 'Link',
  accessor: 'link',
  Cell: row => (
    <a href={row.value} target="_blank" rel="noopener noreferrer">
      {row.value}
    </a>
  ),
  width: undefined,
},
];


storiesOf('Base', module)
  .addDecorator(withKnobs)
  .add('Table', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <Box>
          <Text isTitle size="large">Filled Table</Text>
          <Box horizontal space={60}>
            <Table
              data={DATA}
              columns={COLUMNS}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Filled Table</Text>
          <Box horizontal space={60}>
            <Table
              data={DATA}
              columns={COLUMNS}
              hasActions
              onEdit={handleTestEdit}
              onDelete={handleTestDelete}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Empty Table</Text>
          <Box horizontal space={60}>
            <Table
              data={[]}
              columns={[]}
            />
          </Box>
        </Box>
        <Box>
          <Text isTitle size="large">Loading Table</Text>
          <Box horizontal space={60}>
            <Table
              data={[]}
              columns={[]}
              loading
            />
          </Box>
        </Box>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
