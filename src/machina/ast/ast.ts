export type ASTNode =
  | ASTElement
  | ASTText
  | ASTDirective
  | ASTSlot
  | ASTBlockInstance;

export interface ASTMeta {
  key?: string;
  scope?: Record<string, string>; // virtual scope bindings
}

export interface ASTElement {
  type: "element";
  tag: string;
  attrs?: Record<string, any>;
  props?: Record<string, any>;
  events?: Record<string, ASTEvent>;
  children?: ASTNode[];
  meta?: ASTMeta;
}

export interface ASTText {
  type: "text";
  value: string; // "{{prop}}"
}

export interface ASTSlot {
  type: "slot";
  name?: string;
  props?: Record<string, string>; // EXPRESSÕES
}

export interface ASTBlockInstance {
  ast: ASTNode;
  node: Node;
}

export interface ASTDirective {
  type: "directive";
  kind: "if" | "else-if" | "else" | "each";
  expression?: string;
  itemAlias?: string;
  indexAlias?: string;
  children: ASTNode[];
}

export interface ASTEvent {
  handler: string;
  params?: string[];
}
