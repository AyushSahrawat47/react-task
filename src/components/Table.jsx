import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useDex } from '../context/dexContext';

const headCells = [
    { id: 'pool', label: 'Pool' },
    { id: 'price', label: 'Price' },
    { id: 'TXN', label: 'TXN' },
    { id: '5M', label: '5M' },
    { id: '1H', label: '1H' },
    { id: '6H', label: '6H' },
    { id: '24H', label: '24H' },
    { id: 'volume', label: 'Volume' },
    { id: 'LIQ', label: 'LIQ' },
    { id: 'FDV', label: 'FDV' },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable() {
    const { dex } = useDex(); // Use dexes from context
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/xdc/dexes/${dex}/pools`);
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dex]); // Fetch data when dexes changes

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const formatReserveUSD = (reserve) => (reserve / 1000).toFixed(2) + "K";
    const formatFDVUSD = (fdv) => fdv >= 1_000_000 ? (fdv / 1_000_000).toFixed(2) + "M" : (fdv / 1000).toFixed(2) + "K";
    const calculateTotalTransactions = (transactions) => transactions.h24.buys + transactions.h24.sells;
    const formatVolume = (value) => value >= 1000 ? (value / 1000).toFixed(2) + "k" : (value / 1).toFixed(2);

    const visibleRows = React.useMemo(
        () => [...data].sort((a, b) => (order === 'desc' ? b[orderBy] - a[orderBy] : a[orderBy] - b[orderBy]))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [data, order, orderBy, page, rowsPerPage]
    );

    return (
        <Box className="mx-auto" sx={{ width: '97%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>
                            {visibleRows.map((item) => {
                                const attributes = item.attributes;
                                return (
                                    <TableRow hover key={item.id}>
                                        <TableCell>{attributes.name}</TableCell>
                                        <TableCell>{`$${parseFloat(attributes.base_token_price_usd).toFixed(3)}`}</TableCell>
                                        <TableCell>{calculateTotalTransactions(attributes.transactions)}</TableCell>
                                        <TableCell>{`${attributes.price_change_percentage.m5}%`}</TableCell>
                                        <TableCell>{`${attributes.price_change_percentage.h1}%`}</TableCell>
                                        <TableCell>{`${attributes.price_change_percentage.h6}%`}</TableCell>
                                        <TableCell>{`${attributes.price_change_percentage.h24}%`}</TableCell>
                                        <TableCell>{formatVolume(attributes.volume_usd.h24)}</TableCell>
                                        <TableCell>{formatReserveUSD(attributes.reserve_in_usd)}</TableCell>
                                        <TableCell>{formatFDVUSD(attributes.fdv_usd)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
