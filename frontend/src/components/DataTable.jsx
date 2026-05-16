import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// ЛР 8: универсальная таблица с сортировкой и перетаскиванием колонок.
// Параметры:
//   columns: массив column-объектов @tanstack/react-table
//   data: массив строк
//   stickyFirstColumn: при true первая колонка фиксируется (для мобильного скролла)

function DraggableHeader({ header, stickyFirstColumn }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: header.column.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        whiteSpace: 'nowrap',
        background: 'inherit',
    };

    const isFirst = stickyFirstColumn && header.column.getIndex() === 0;
    const stickyStyle = isFirst
        ? { position: 'sticky', left: 0, zIndex: 2, background: 'var(--mui-palette-background-paper, #fff)' }
        : {};

    // ЛР 8: вешаем sort-handler только на сортируемые колонки, чтобы клик по "Действия"
    // (или любой колонке с enableSorting: false) не показывал индикатор сортировки.
    const canSort = header.column.getCanSort();

    return (
        <TableCell
            ref={setNodeRef}
            style={{ ...style, ...stickyStyle }}
            onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
            sortDirection={canSort ? (header.column.getIsSorted() || false) : false}
            sx={{ cursor: canSort ? 'pointer' : 'default' }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                    size="small"
                    {...attributes}
                    {...listeners}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Перетащить колонку"
                >
                    <DragIndicatorIcon fontSize="small" />
                </IconButton>
                <Box sx={{ fontWeight: 600 }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </Box>
                {header.column.getIsSorted() === 'asc' && <ArrowUpwardIcon fontSize="small" />}
                {header.column.getIsSorted() === 'desc' && <ArrowDownwardIcon fontSize="small" />}
            </Box>
        </TableCell>
    );
}

export default function DataTable({ columns, data, stickyFirstColumn = false }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    const useSticky = stickyFirstColumn && isMobile;

    const [columnOrder, setColumnOrder] = useState(() => columns.map((c) => c.id || c.accessorKey));
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnOrder },
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setColumnOrder((current) => {
                const oldIndex = current.indexOf(active.id);
                const newIndex = current.indexOf(over.id);
                return arrayMove(current, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <SortableContext
                                key={headerGroup.id}
                                items={columnOrder}
                                strategy={horizontalListSortingStrategy}
                            >
                                <TableRow>
                                    {headerGroup.headers.map((header) => (
                                        <DraggableHeader
                                            key={header.id}
                                            header={header}
                                            stickyFirstColumn={useSticky}
                                        />
                                    ))}
                                </TableRow>
                            </SortableContext>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} hover>
                                {row.getVisibleCells().map((cell, idx) => {
                                    const stickyStyle =
                                        useSticky && idx === 0
                                            ? {
                                                  position: 'sticky',
                                                  left: 0,
                                                  zIndex: 1,
                                                  background: 'var(--mui-palette-background-paper, #fff)',
                                              }
                                            : {};
                                    return (
                                        <TableCell key={cell.id} style={stickyStyle}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {table.getRowModel().rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    Нет данных
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </DndContext>
    );
}
