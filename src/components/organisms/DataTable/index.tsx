import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type DataTableColumn<T> = { key: string; header: string; className?: string; render: (row: T) => React.ReactNode };

type DataTableProps<T> = { columns: DataTableColumn<T>[]; data: T[]; getRowKey: (row: T) => string; emptyMessage?: string };

export function DataTable<T>({ columns, data, getRowKey, emptyMessage = "No records found." }: DataTableProps<T>) {
  return <Table><TableHeader><TableRow>{columns.map((column) => <TableHead key={column.key} className={column.className}>{column.header}</TableHead>)}</TableRow></TableHeader><TableBody>{data.length ? data.map((row) => <TableRow key={getRowKey(row)}>{columns.map((column) => <TableCell key={column.key} className={column.className}>{column.render(row)}</TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={columns.length} className="h-36 text-center text-slate-500">{emptyMessage}</TableCell></TableRow>}</TableBody></Table>;
}
