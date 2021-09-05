import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useAppSelector } from "redux/app/hooks";
import { selectAllState } from "redux/slices/op25/op25Slice";
import { frequencyToString } from "lib/op25";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Theme,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import {
  FiChevronsLeft as DoubleArrowsLeftIcon,
  FiChevronLeft as ArrowLeftIcon,
  FiChevronsRight as DoubleArrowsRightIcon,
  FiChevronRight as ArrowRightIcon,
} from "react-icons/fi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    currentchannel: {
      marginLeft: 15,
      marginBottom: 20,
    },
    grid: {
      height: 175,
    },
    gridRoot: {
      fontSize: 12,
      border: "0",
    },
    rowRoot: {
      border: "0",
    },
    cellRoot: {
      paddingLeft: 5,
      paddingRight: 5,
      border: "0",
    },
    actions: {
      paddingBottom: 20,
      flexWrap: "wrap",
      justifyContent: "center",
    },
    actionsDiv: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        marginTop: 30,
      },
    },
    actionbuttons: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  })
);

const MainHUD = () => {
  const classes = useStyles();
  const state = useAppSelector(selectAllState);

  const columns: GridColDef[] = [
    { field: "id", hide: true, sortable: false },
    {
      field: "stateName",
      align: "right",
      sortable: false,
      minWidth: 110,
      renderHeader: (_) => <></>,
      renderCell: (params: GridRenderCellParams) =>
        params.getValue(params.id, "description") ? (
          <Tooltip
            title={`${
              params.getValue(params.id, "description") &&
              params.getValue(params.id, "description")?.toString()
            }`}
            enterDelay={500}
            placement="right"
          >
            <span>{params.getValue(params.id, "stateName")}</span>
          </Tooltip>
        ) : (
          <span>{params.getValue(params.id, "stateName")}</span>
        ),
    },
    {
      field: "stateValue",
      align: "left",
      sortable: false,
      renderHeader: (_) => <></>,
    },
    { field: "description", hide: true, sortable: false },
  ];

  const rows = [
    {
      id: 1,
      stateName: "Group Address:",
      stateValue: state.current_talkgroupId ? state.current_talkgroupId : "-",
      description:
        "Also known as the Talkgroup ID, this is the unique ID assigned to a group.",
    },
    {
      id: 2,
      stateName: "Source Address:",
      stateValue: state.current_talkgroupId ? state.channel_sourceAddress : "-",
      description: "ID of the person talking (Radio ID / Unit ID)",
    },
    {
      id: 3,
      stateName: "Frequency:",
      stateValue:
        state.channel_frequency && frequencyToString(state.channel_frequency),
    },
  ];

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.currentchannel}
          variant="h5"
          component="h2"
        >
          {state.channel_tag ? state.channel_tag : state.current_talkgroupId}
        </Typography>
        <div className={classes.grid}>
          <DataGrid
            classes={{
              root: classes.gridRoot,
              row: classes.rowRoot,
              cell: classes.cellRoot,
            }}
            rows={rows}
            columns={columns}
            headerHeight={0}
            isRowSelectable={(_) => false}
            hideFooter
          />
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">Skip</Button>
        <Button size="small">Hold</Button>
        <Button size="small">GOTO</Button>
        <Tooltip title="Blacklist" placement="top" enterDelay={500}>
          <Button size="small">B/List</Button>
        </Tooltip>
        <Tooltip title="Whitelist" placement="top" enterDelay={500}>
          <Button size="small">W/List</Button>
        </Tooltip>
        <Tooltip title="Log Verbosity" placement="top" enterDelay={500}>
          <Button size="small">Log/V</Button>
        </Tooltip>
        <div className={classes.actionsDiv}>
          <Tooltip title={`-${state.stepSizeLarge}`} placement="top">
            <IconButton size="small" className={classes.actionbuttons}>
              <DoubleArrowsLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`-${state.stepSizeSmall}`} placement="top">
            <IconButton size="small" className={classes.actionbuttons}>
              <ArrowLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`+${state.stepSizeSmall}`} placement="top">
            <IconButton size="small" className={classes.actionbuttons}>
              <ArrowRightIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`+${state.stepSizeLarge}`} placement="top">
            <IconButton size="small" className={classes.actionbuttons}>
              <DoubleArrowsRightIcon />
            </IconButton>
          </Tooltip>
        </div>
      </CardActions>
    </Card>
  );
};

export default MainHUD;
