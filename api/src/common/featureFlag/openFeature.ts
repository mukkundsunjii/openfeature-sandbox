import {OpenFeature} from "@openfeature/server-sdk";
import {flagdProvider} from "./flagdProvider";

export const featureFlags = OpenFeature.getClient();

// In-memory provider
// OpenFeature.setProvider(inMemoryFeatureProvider);

// Flagd feature provider
OpenFeature.setProvider(flagdProvider);
