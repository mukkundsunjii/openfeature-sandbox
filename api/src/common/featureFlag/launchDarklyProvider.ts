import {LaunchDarklyProvider} from "@launchdarkly/openfeature-node-server";

const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY;

if (!sdkKey && process.env.FEATURE_PROVIDER === "launchDarkly") {
  throw new Error("LAUNCHDARKLY_SDK_KEY is not set");
}

export const launchDarklyProvider = new LaunchDarklyProvider(sdkKey ?? "");
