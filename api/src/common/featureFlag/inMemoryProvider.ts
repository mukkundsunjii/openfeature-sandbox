import {EvaluationContext, InMemoryProvider} from "@openfeature/server-sdk";

export type GeoCodeContext = {geoCode: string};

const FLAG_CONFIGURATION = {
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
  },
};

export const inMemoryFeatureProvider = new InMemoryProvider(FLAG_CONFIGURATION);
