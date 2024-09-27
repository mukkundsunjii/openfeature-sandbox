## Overview

Feature flags allow enabling and disabling features in the application without changing the source code. 

### Naive Method

```jsx
// Express app with basic flags on one of the routes
routes.get('/', async (_, res) => {
  // set this to true to test our new
  // cow-based greeting system
  const withCow = false;
  if (withCow) {
    res.send(cowsay.say({ text: 'Hello, world!' }));
  } else {
    res.send('Hello, world!');
  }
});
```

## Feature Flagging with OpenFeatures SDK

The open-feature SDK opens up a lot of possibilities to control the feature flags at a fine grain. 

### Instantiation

```jsx
export const featureFlags = OpenFeature.getClient();
```

The client can be used to get and set feature flags in the application, like so:

```jsx
// is-rebranded is a feature flag being imported
const isRebranded = await featureFlags.getBooleanValue("is-rebranded", false, context);
```

### Targeting

You can also set the feature based on a certain condition. For instance, setting the features based on a specific header to trigger the feature-flag. 

```jsx
// Definition of an in-memory feature flag
"is-rebranded": {
    variants: {
      on: true,
      off: false,
    },
    disabled: false,
    defaultVariant: "on",
    contextEvaluator: (context: EvaluationContext) => {
      if (context.geoCode === "NL") {
        return "on";
      }
      return "off"; // Provide a default return value
    },
  }
```

## Feature Providers

Feature providers are components that supply feature flag configurations and evaluation logic. They act as the source of truth for feature flag values, determining whether a feature should be enabled or disabled based on various criteria such as user attributes, environment, or other contextual information.

### Simple In-Memory Provider

The simplest feature provider would be the in-memory flavor that is shipped directly with the Open-Feature SDK. It can be set up as like so: 

```jsx
const FLAG_CONFIGURATION = {
  "is-rebranded": {...},
};

export const inMemoryFeatureProvider = new InMemoryProvider(FLAG_CONFIGURATION);
```

### [Flagd](https://flagd.dev/)

A robust setup is to have the feature provider as a separate service. Flagd is an open source feature provider that offers a simple solution to this. It is also open-feature compliant. 

All you need is a simple configuration: 

```json
{
  "flags": {
    "is-rebranded": {
      "variants": {
        "on": true,
        "off": false
      },
      "state": "ENABLED",
      "defaultVariant": "on"
    }
  }
}
```

Setup the service and set the feature provider in your api server code: 

```jsx
OpenFeature.setProvider(new FlagdProvider());
```

For more information on configuring targeting rules, consult the [documentation](https://flagd.dev/quick-start/#add-a-targeting-rule).