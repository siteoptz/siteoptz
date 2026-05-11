import React from 'react'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  align?: 'left' | 'center' | 'right'
  highlighted?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  variant?: 'default'
}

const tableVariants = {
  default: {
    table: "w-full",
    header: "border-b border-gray-700",
    headerCell: "py-4 px-6 text-gray-400 font-medium",
    headerCellHighlighted: "py-4 px-6 text-white font-medium bg-blue-500/20",
    body: "text-sm",
    row: "border-b border-gray-800", 
    cell: "py-4 px-6 text-gray-300"
  }
}

export function Table<T>({ data, columns, variant = 'default' }: TableProps<T>) {
  const styles = tableVariants[variant]

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render((row as any)[column.key], row)
    }
    return (row as any)[column.key]
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          {columns.map((column, index) => (
            <th
              key={index}
              className={`${
                column.highlighted ? styles.headerCellHighlighted : styles.headerCell
              } ${getAlignmentClass(column.align)}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.row}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`${styles.cell} ${getAlignmentClass(column.align)}`}
              >
                {getCellValue(row, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}