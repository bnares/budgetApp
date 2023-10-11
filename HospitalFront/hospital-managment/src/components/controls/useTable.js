import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'
import React from 'react'


const useStyle = makeStyles(theme=>({
    table:{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color:theme.palette.primary.main,
            backgroundColor:theme.palette.primary.light
        },
        '& tbody td':{
            fontWeight:'300'
        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer'
        }
    }
}))

export default function useTable(records,headCells,filterFn) {
    const classes = useStyle();
    const pages = [5,10,25];
    const [page,setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
    const [order,setOrder] = React.useState();
    const [orderBy, setOrderBy] = React.useState();

    const TblContainer = props=>(
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props=>{
        const classes = useStyle();
        return (
        <TableHead className={classes.table}>
            <TableRow>
                {headCells.map(item=>(
                        <TableCell key={item.id} sortDirection={orderBy===item.id?order:false}>
                            {item.disableSorting?item.label:
                            <TableSortLabel 
                                active={orderBy===item.id}
                                direction={orderBy===item.id?order:'asc'}
                                onClick={()=>{handleSortRequest(item.id)}}
                            >
                                {item.label}
                            </TableSortLabel>
                            }
                        </TableCell>))}
            </TableRow>
        </TableHead>)
    }

    const handleSortRequest = (cellId)=>{
        const isAsync = orderBy === cellId && order==='asc';
        setOrder(isAsync?'desc':'asc');
        setOrderBy(cellId)
    }

    const TblPagination = ()=>(
        <TablePagination 
            rowsPerPageOptions={pages}
            component='div'
            count={filterFn.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange = {handleChangePage}
            onRowsPerPageChange = {handleChangeRowsPerPage}
        />
    )

    const handleChangePage = (event,newPage)=>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }

      function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }

    const recordsAfterPagingAndSorting = ()=>{
        return stableSort(filterFn,getComparator(order,orderBy)).slice(page*rowsPerPage, (page+1)*rowsPerPage);
    }

    function stableSort(array, comparator){
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
            return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}
