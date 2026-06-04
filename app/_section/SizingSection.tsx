"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { TimePickerState } from "../types";

type Props = {
  state: TimePickerState;
  update: <K extends keyof TimePickerState>(key: K, value: TimePickerState[K]) => void;
};

export default function SizingSection({ state, update }: Props) {
  return (
    <SectionCard title="Sizing" subtitle="Sizing controls that are native, preview-honest, and React-export-honest.">
      <Slider label="Width" value={state.width} min={260} max={760} step={1} onChange={(value) => update("width", value)} />
      <Slider label="Height" value={state.height} min={80} max={360} step={1} onChange={(value) => update("height", value)} />
    </SectionCard>
  );
}
