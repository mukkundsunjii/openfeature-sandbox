import {OpenFeature} from "@openfeature/server-sdk";
import {inMemoryFeatureProvider} from "./inMemoryProvider";
import {flagdProvider} from "./flagdProvider";
import {launchDarklyProvider} from "./launchDarklyProvider";

export const featureFlags = OpenFeature.getClient();

export type GeoCodeContext = {targetingKey: string};

const featureProvider = process.env.FEATURE_PROVIDER;
switch (featureProvider) {
  case "inMemory":
    OpenFeature.setProvider(inMemoryFeatureProvider);
    break;
  case "flagd":
    OpenFeature.setProvider(flagdProvider);
    break;
  case "launchDarkly":
    OpenFeature.setProvider(launchDarklyProvider);
    break;
  default:
    throw new Error(`Feature provider is not specified or not supported: ${featureProvider}`);
}
