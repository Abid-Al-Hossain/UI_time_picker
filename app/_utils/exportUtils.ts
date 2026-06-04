import type { TimePickerState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: TimePickerState, fileName = "time-picker") : ExportPayload {
  return {
    fileName: `${fileName || "time-picker"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: TimePickerState) {
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "export default function TimePickerComponent() {",
    "  return (",
        "    <label htmlFor={state.id}>{state.label}</label>",
    "    <input id={state.id} name={state.name} type=\"time\" value={state.value} min={state.min} max={state.max} step={state.step} required={state.required} disabled={state.disabled} readOnly={state.readOnly} onChange={() => undefined} />",
    "  );",
    "}",
    "",
  ].join("\n");
}
