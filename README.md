[![CircleCI](https://circleci.com/gh/qlik-oss/sn-container.svg?style=shield)](https://circleci.com/gh/qlik-oss/sn-container)
[![Maintainability](https://api.codeclimate.com/v1/badges/1166aaa6a2e06f8de9eb/maintainability)](https://codeclimate.com/repos/60ba2ff677769346e5000f42/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1166aaa6a2e06f8de9eb/test_coverage)](https://codeclimate.com/repos/60ba2ff677769346e5000f42/test_coverage)

# sn-container

Has been archived and moved to [qlik-oss/sn-container](https://github.com/qlik-oss/sn-container)
## A container for nebula.js.

Container objects enable you to visualize your data through different visualization grouped under a single object.

## Requirements

Requires `@nebula.js/stardust` version `2.3.0` or later.

## Installing

If you use npm: npm install @qlik-oss/sn-container

## Usage

```js
import { embed } from '@nebula.js/stardust';
import container from '@qlik-oss/sn-container';

// 'app' is an enigma app model
const nuked = embed(app, {
  types: [
    {
      // register the container
      name: 'container',
      load: () => Promise.resolve(container),
    },
  ],
});

// Rendering a container on the fly
// Best way is to make a sn-container extension in the client and copy the properties
// You will need add the serverUrl and serverKey to the options
nuked.render({
  type: 'container',
  element,
  options: {
    configuration: { serverUrl: ...,  serverKey: ... }
  },
  properties: {
    ...
  },
});
```

## Options

- configuration
  - serverUrl - host url for container server.
  - serverKey - key for container server.

## Examples

### Container containing a bar chart visualization

```js
nuked.render({
  type: 'container',
  element,
  options: {},
  properties: {
    qInfo: {
      qId: 'AksfrjG',
      qType: 'container'
    },
    qExtendsId: '',
    qMetaDef: {},
    qStateName: '',
    children: [
      {
        refId: 'drVNZNd',
        label: 'Bar chart',
        isMaster: false
      }
    ],
    showTitles: false,
    title: '',
    subtitle: '',
    footnote: '',
    disableNavMenu: false,
    showDetails: false,
    showDetailsExpression: false,
    borders: 'auto',
    showTabs: true,
    useDropdown: true,
    useScrollButton: true,
    showIcons: false,
    activeTab: '',
    defaultTab: '',
    visualization: 'container',
    qChildListDef: {
      qData: {
        visualization: '/visualization',
        containerChildId: '/containerChildId',
        qExtendsId: '/qExtendsId',
        title: '/title',
        showCondition: '/showCondition'
      }
    },
    supportRefresh: false,
    hasExternalChildren: false
  },
});
```
