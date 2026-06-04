"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { TimePickerState } from "../types";

type Props = {
  state: TimePickerState;
  update: <K extends keyof TimePickerState>(key: K, value: TimePickerState[K]) => void;
};

export default function FieldSection({ state, update }: Props) {
  return (
    <SectionCard title="Field" subtitle="Field controls that are native, preview-honest, and React-export-honest.">
      <Input label="Value" value={state.value} onChange={(value) => update("value", value)} />
      <Input label="Min" value={state.min} onChange={(value) => update("min", value)} />
      <Input label="Max" value={state.max} onChange={(value) => update("max", value)} />
      <Slider label="Step seconds" value={state.step} min={60} max={3600} step={1} onChange={(value) => update("step", value)} />
      <Switch label="Show seconds" checked={state.showSeconds} onChange={(value) => update("showSeconds", value)} />
      <Switch label="Timezone label" checked={state.showTimezone} onChange={(value) => update("showTimezone", value)} />
      <Input label="Timezone copy" value={state.timezoneLabel} onChange={(value) => update("timezoneLabel", value)} />
    </SectionCard>
  );
}
