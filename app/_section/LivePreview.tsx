"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { TimePickerState } from "../types";

function shellStyle(state: TimePickerState): CSSProperties {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";

  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${invalid ? "#fb7185" : state.previewState === "focus" ? state.accent : state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: disabled ? 0.55 : 1,
    outline: state.previewState === "focus" ? `${state.focusRing}px solid ${state.accent}` : "none",
    transition: state.motion ? "all 180ms ease" : "none",
  };
}

function normalizeTimeValue(value: string, showSeconds: boolean) {
  if (!value) return "";
  const [rawHour = "", rawMinute = "", rawSecond = ""] = value.split(":");
  const hour = rawHour.padStart(2, "0").slice(0, 2);
  const minute = rawMinute.padStart(2, "0").slice(0, 2);
  const second = rawSecond.padStart(2, "0").slice(0, 2);
  return showSeconds ? `${hour}:${minute}:${second || "00"}` : `${hour}:${minute}`;
}

function nativeStep(state: TimePickerState) {
  return state.showSeconds ? Math.max(1, Math.min(state.step, 59)) : Math.max(60, state.step);
}

export default function LivePreview({ state }: { state: TimePickerState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";
  const success = state.showSuccess && !invalid;
  const [value, setValue] = useState(() => normalizeTimeValue(state.value, state.showSeconds));
  const helpId = `${state.id}-help`;
  const timezoneId = `${state.id}-timezone`;
  const describedBy = [helpId, state.showTimezone ? timezoneId : ""].filter(Boolean).join(" ");
  const message = invalid ? state.errorText : success ? state.successText : state.showHelper ? state.helper : "";

  useEffect(() => {
    setValue(normalizeTimeValue(state.value, state.showSeconds));
  }, [state.value, state.showSeconds]);

  return (
    <div style={shellStyle(state)} className="grid content-center">
      <label htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      {state.description ? <p className="text-sm" style={{ color: state.muted }}>{state.description}</p> : null}
      <div className="flex items-center gap-2 rounded-2xl border px-3 py-2" style={{ borderColor: invalid ? "#fb7185" : state.border, background: "rgba(255,255,255,.06)" }}>
        <input
          id={state.id}
          name={state.name}
          title={state.title}
          tabIndex={state.tabIndex}
          dir={state.dir}
          lang={state.lang}
          type="time"
          value={value}
          min={normalizeTimeValue(state.min, state.showSeconds)}
          max={normalizeTimeValue(state.max, state.showSeconds)}
          step={nativeStep(state)}
          required={state.required}
          disabled={disabled}
          readOnly={state.readOnly}
          autoComplete={state.autocomplete}
          inputMode={state.inputMode}
          enterKeyHint={state.enterKeyHint}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="w-full bg-transparent outline-none"
          style={{ color: state.foreground, fontSize: state.inputSize }}
          onChange={(event) => setValue(event.target.value)}
        />
        {state.showClearAction && value && !disabled && !state.readOnly ? (
          <button type="button" aria-label="Clear time" className="rounded-lg px-2" style={{ color: state.muted }} onClick={() => setValue("")}>
            Clear
          </button>
        ) : null}
      </div>
      {state.showTimezone ? <span id={timezoneId} className="text-xs" style={{ color: state.muted }}>{state.timezoneLabel}</span> : null}
      <small id={helpId} style={{ color: invalid ? "#fb7185" : success ? "#22c55e" : state.muted }}>{message}</small>
    </div>
  );
}
