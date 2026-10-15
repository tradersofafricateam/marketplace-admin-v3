"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { Category, CategoryStatus } from "../../../types";
import { actionLabel, categoryName, statusActions } from "../../../helpers";
import { useCategoryAccess } from "../../../hooks/use-category-access";

type Props = {
  category: Category;
  onView: () => void;
  onEdit: () => void;
  onStatus: (status: CategoryStatus) => void;
};

export function CategoryActions({ category, onView, onEdit, onStatus }: Props) {
  const { can, canStatus } = useCategoryAccess();
  const id = useId();
  const menu = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const actions = [
    { label: "View", run: onView, destructive: false },
    ...(["active", "inactive"].includes(category.status) && can("update") ? [{ label: "Edit", run: onEdit, destructive: false }] : []),
    ...statusActions(category.status).filter(canStatus).map((status) => ({ label: actionLabel(status), run: () => onStatus(status), destructive: status === "deleted" })),
  ];

  useEffect(() => {
    const close = () => menu.current?.hidePopover();
    window.addEventListener("resize", close);
    document.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("resize", close);
      document.removeEventListener("scroll", close, true);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        aria-label={`Actions for ${categoryName(category.name)}`}
        className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-navy focus-visible:outline-2 focus-visible:outline-sky-600"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPosition({ top: Math.max(8, Math.min(rect.bottom + 4, window.innerHeight - actions.length * 40 - 24)), left: Math.max(8, Math.min(rect.right - 192, window.innerWidth - 200)) });
        }}
      >
        <MoreHorizontal size={19} aria-hidden="true" />
      </button>
      <div ref={menu} id={id} popover="auto" aria-label="Category actions" style={position} className="fixed m-0 w-48 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl">
        {actions.map(({ label, run, destructive }) => (
          <button key={label} type="button" onClick={() => { menu.current?.hidePopover(); run(); }} className={`block w-full rounded-lg px-3 py-2.5 text-left font-medium focus-visible:outline-2 focus-visible:outline-sky-600 ${destructive ? "text-red-600 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50"}`}>
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
