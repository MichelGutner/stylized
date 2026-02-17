import { render, RenderAPI } from "@testing-library/react-native";
import { ReactElement } from "react";
import { AllProviders } from "./provider";

const customRender = <U extends ReactElement, O>(
  ui: U,
  options?: O
): RenderAPI => {
  return render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
