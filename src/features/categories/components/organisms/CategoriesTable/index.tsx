import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { CopyableId } from "@/components/atoms/CopyableId";
import type { Category, CategoryStatus } from "../../../types";
import { categoryName } from "../../../helpers";
import { CategoryBadge } from "../../atoms/CategoryBadge";
import { CategoryActions } from "../../molecules/CategoryActions";
type Props = { categories: Category[]; onView: (item: Category) => void; onEdit: (item: Category) => void; onStatus: (item: Category, status: CategoryStatus) => void; onChildren: (id: string) => void };
export function CategoriesTable({ categories, onView, onEdit, onStatus, onChildren }: Props) {
  const names = new Map(categories.map((item) => [item.id, categoryName(item.name)]));
  const columns: DataTableColumn<Category>[] = [
    { key: "name", header: "Category", render: (item) => <button type="button" onClick={() => onView(item)} className="cursor-pointer whitespace-nowrap font-semibold text-sky-700 hover:underline">{categoryName(item.name)}</button> },
    { key: "parent", header: "Parent", className: "whitespace-nowrap", render: (item) => item.parentId ? names.get(item.parentId) || <CopyableId value={item.parentId} label="Parent ID" /> : "Top level" },
    { key: "status", header: "Status", render: (item) => <CategoryBadge status={item.status} /> },
    { key: "products", header: "Products", render: (item) => item.productsCount ?? "—" },
    { key: "children", header: "Subcategories", render: (item) => <button onClick={() => onChildren(item.id)} className="text-sky-700 hover:underline">{item.childrenCount ?? "View"}</button> },
    { key: "order", header: "Sort order", render: (item) => item.sortOrder ?? "—" },
    { key: "created", header: "Created", render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—" },
    { key: "actions", header: "Actions", className: "w-16", render: (item) => <CategoryActions category={item} onView={() => onView(item)} onEdit={() => onEdit(item)} onStatus={(status) => onStatus(item, status)} /> },
  ];
  return <DataTable columns={columns} data={categories} getRowKey={(item) => item.id} emptyMessage="No categories match these filters." />;
}
