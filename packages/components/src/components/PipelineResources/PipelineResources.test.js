/*
Copyright 2019 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';
import { createIntl } from 'react-intl';
import { renderWithIntl, renderWithRouter } from '../../utils/test';
import PipelineResources from './PipelineResources';

const intl = createIntl({
  locale: 'en',
  defaultLocale: 'en'
});

it('PipelineResources renders empty state', () => {
  const { queryByText } = renderWithIntl(
    <PipelineResources pipelineResources={[]} />
  );
  expect(queryByText(/no pipelineresources/i)).toBeTruthy();
  expect(queryByText(/namespace/i)).toBeTruthy();
});

it('PipelineResources renders headers state', () => {
  const { queryByText } = renderWithIntl(
    <PipelineResources pipelineResources={[]} />
  );
  expect(queryByText(/pipelineresources/i)).toBeTruthy();
  expect(queryByText(/namespace/i)).toBeTruthy();
  expect(queryByText(/type/i)).toBeTruthy();
  expect(document.getElementsByClassName('bx--overflow-menu')).toBeTruthy();
});

it('PipelineResources renders correct data', async () => {
  const pipelineResourceName = 'pipeline-resource-20190816124708';
  const { queryByText, getByTestId, getByText } = renderWithRouter(
    <PipelineResources
      intl={intl}
      pipelineResources={[
        {
          metadata: {
            name: pipelineResourceName,
            namespace: 'default-namespace',
            type: 'git'
          },
          spec: {
            params: [
              {
                name: 'url',
                value: 'https://github.com/pipeline-hotel/example-pipelines'
              },
              {
                name: 'revision',
                value: 'master'
              }
            ],
            type: 'git'
          }
        }
      ]}
      pipelineResourceActions={[
        {
          actionText: intl.formatMessage({
            id: 'test.actionText',
            defaultMessage: 'TestAction'
          })
        }
      ]}
    />
  );
  expect(queryByText(pipelineResourceName)).toBeTruthy();
  expect(queryByText(/default-namespace/i)).toBeTruthy();
  expect(queryByText(/git/i)).toBeTruthy();
  fireEvent.click(await waitForElement(() => getByTestId('overflowmenu')));
  await waitForElement(() => getByText(/TestAction/i));
});
