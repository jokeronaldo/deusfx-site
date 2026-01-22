import type { ASTNode } from "./ast";

export type SlotMap = Record<string, ASTNode[]>;

export function resolveSlot(name: string, slots?: SlotMap): ASTNode[] {
  if (!slots) return [];
  return slots[name] ?? [];
}
