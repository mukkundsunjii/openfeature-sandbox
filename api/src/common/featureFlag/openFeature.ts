import {OpenFeature} from "@openfeature/server-sdk";
import {inMemoryFeatureProvider} from "./inMemoryProvider";
import {FlagdProvider} from "@openfeature/flagd-provider";

export const featureFlags = OpenFeature.getClient();

// In-memory provider
// OpenFeature.setProvider(inMemoryFeatureProvider);

// Flagd feature provider
OpenFeature.setProvider(new FlagdProvider());
