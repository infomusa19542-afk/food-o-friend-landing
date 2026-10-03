"use client";

import { useId, useState } from "react";
import Icon from "@/components/common/Icon";
import { cn } from "@/utils/classnames";

export interface AccordionItem {
  id: number | string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
}

/** Disclosure list: one panel open at a time, native buttons, no animation. */
export default function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <ul className={cn("divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]", className)}>
      {items.map((item) => {
        const key = String(item.id);
        const isOpen = openId === key;
        const buttonId = `${baseId}-button-${key}`;
        const panelId = `${baseId}-panel-${key}`;

        return (
          <li key={key}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : key)}
                className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-white transition-colors hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
              >
                <span className="min-w-0 break-words">{item.title}</span>
                <Icon
                  name="plus"
                  className={cn("size-5 text-brand transition-transform motion-reduce:transition-none", isOpen && "rotate-45")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-relaxed break-words whitespace-pre-line text-white/75"
            >
              {item.content}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
