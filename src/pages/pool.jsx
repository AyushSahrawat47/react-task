import React, { useEffect, useState } from "react";
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
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDex } from '../context/dexContext';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const headCells = [
    { id: 'tx_hash', label: 'Tx Hash' },
    { id: 'block_number', label: 'Block' },
    { id: 'block_timestamp', label: 'Age' },
    { id: 'kind', label: 'Type' },
    { id: 'price_from_in_currency_token', label: 'Price XDC' },
    { id: 'price_from_in_usd', label: 'Price USD' },
    { id: 'from_token_amount', label: 'WXDC' },
    { id: 'volume_in_usd', label: 'Value' },
    { id: 'tx_from_address', label: 'From' },
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

const Pool = () => {
    const { address } = useParams();
    const { dex } = useDex(); // Use dex from context
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('tx_hash');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.geckoterminal.com/api/v2/networks/xdc/pools/${address}/trades`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dex, address]); // Fetch data when dex or address changes

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

    const calculateAgeInMinutes = (timestamp) => {
        const now = new Date();
        const blockTime = new Date(timestamp);
        const diffInMs = now - blockTime;
        return Math.floor(diffInMs / 60000); // Convert milliseconds to minutes
    };

    const visibleRows = React.useMemo(
        () => [...data].sort((a, b) => (order === 'desc' ? b.attributes[orderBy] - a.attributes[orderBy] : a.attributes[orderBy] - b.attributes[orderBy]))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [data, order, orderBy, page, rowsPerPage]
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <Box className="mb-6">
                <div className="mb-10">
                    <Typography variant="h4" className="font-bold ">
                        Pool Dashboard
                    </Typography>   
                </div>
                <Grid container spacing={2} className="mt-4">
                    <Grid item xs={3}>
                        <Box className="p-4 bg-white rounded shadow text-start py-5 ">
                            <Typography variant="h6" className="font-semibold text-gray-400">
                                TRANSACTION (24H)
                            </Typography>
                            <Typography variant="p">300 Transactions</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box className="p-4 bg-white rounded shadow text-start py-5">
                            <Typography variant="h6" className="font-semibold text-gray-400">
                                TOKEN NAME
                            </Typography>
                            <Typography variant="p">Wrapped XDC</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box className="p-4 bg-white rounded shadow text-start py-5">
                            <Typography variant="h6" className="font-semibold text-gray-400">
                                TOKEN SYMBOL
                            </Typography>
                            <Typography variant="p">WXDC</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box className="p-4 bg-white rounded shadow text-start py-5">
                            <Typography variant="h6" className="font-semibold text-gray-400">
                                GT SCORE
                            </Typography>
                            <Typography variant="p">50.459</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Table Section */}
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
                                            <TableCell>{attributes.tx_hash.slice(0, 7)}</TableCell>
                                            <TableCell>{attributes.block_number}</TableCell>
                                            <TableCell>{calculateAgeInMinutes(attributes.block_timestamp)} mins</TableCell>
                                            <TableCell>{attributes.kind}</TableCell>
                                            <TableCell>{parseFloat(attributes.price_from_in_currency_token).toFixed(5)}</TableCell>
                                            <TableCell>{parseFloat(attributes.price_from_in_usd).toFixed(5)}</TableCell>
                                            <TableCell>{parseFloat(attributes.from_token_amount).toFixed(5)}</TableCell>
                                            <TableCell>{parseFloat(attributes.volume_in_usd).toFixed(5)}</TableCell>
                                            <TableCell>{attributes.tx_from_address.slice(0,7)}</TableCell>
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
        </div>
    );
};

export default Pool;
