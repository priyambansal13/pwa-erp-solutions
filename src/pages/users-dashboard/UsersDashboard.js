import React, { useEffect, useMemo } from "react";
import {
  setBanksListAction,
  setCustomersListAction,
  setPayableListAction,
  setPaymentListAction,
  setProductsListAction,
  setPurchaseListAction,
  setReceiptListAction,
  setReceivableListAction,
  setSalesListAction,
  setStockListAction,
  setSuppliersListAction,
  setUserAccountListAction,
} from "../../store/reducers/organization-user.state";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/reducers/authentication";
import OrganizationUserApi from "../../services/organization-user-api";
import api from "../../services/common-api";
import {
  formatStockData,
  getFormattedPaymentList,
  getFormattedPurchaseList,
  getFormattedReceiptList,
  getFormattedSalesList,
} from "../../utils/user-utils";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AnalyticEcommerce from "../../components/@extended/AnalyticEcommerce";
import avatar1 from "../../assets/images/users/avatar-1.png";
import avatar2 from "../../assets/images/users/avatar-2.png";
import avatar3 from "../../assets/images/users/avatar-3.png";
import avatar4 from "../../assets/images/users/avatar-4.png";
import MainCard from "../../components/MainCard";
import { useNavigate } from "react-router-dom";

import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const UsersDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const organizationId = localStorage.getItem("organizationId");
  const payableListState = useSelector(
    (state) => state?.organizationUserState?.payableList
  );

  const receivableListState = useSelector(
    (state) => state?.organizationUserState?.receivableList
  );
  const salesListState = useSelector(
    (state) => state?.organizationUserState?.salesList
  );

  const purchaseListState = useSelector(
    (state) => state?.organizationUserState?.purchaseList
  );
  useEffect(
    () => {
      if (userId) {
        getUserDetails(userId);
        getReceivableList();
        getPayableList();
        getUserAccountList();
        getBankList();
        getProductsForUser();
        getStockList();
        getCustomerList();
        getSupplierList();
        getPurchaseList();
        getSalesList();
        getPaymentsList();
        getReceiptsList();
      }
    },
    // eslint-disable-next-line
    []
  );

  const payableTotal = useMemo(() => {
    if (payableListState !== null) {
      let total = 0;
      const result = payableListState?.map((pay) => {
        total = total + pay.amount;
        return total;
      });
      console.log(result);
      return total;
    }
  }, [payableListState]);

  const receivableTotal = useMemo(() => {
    if (receivableListState !== null) {
      let total = 0;
      const result = receivableListState?.map((pay) => {
        total = total + pay.amount;
        return total;
      });
      console.log(result);
      return total;
    }
  }, [receivableListState]);

  const salesTotal = useMemo(() => {
    if (salesListState !== null) {
      let total = 0;
      const result = salesListState?.map((pay) => {
        total = total + pay.totalAmount;
        return total;
      });
      console.log(result);
      return total;
    }
  }, [salesListState]);

  const purchaseTotal = useMemo(() => {
    if (purchaseListState !== null) {
      let total = 0;
      const result = purchaseListState?.map((pay) => {
        total = total + pay.totalAmount;
        return total;
      });
      console.log(result);
      return total;
    }
  }, [purchaseListState]);

  const getUserDetails = async (userId) => {
    const response = await api.getUserDetails({
      userId,
    });
    localStorage.setItem("organizationId", response.data.organization.id);
    dispatch(setUserDetails({ userDetails: response.data }));
  };

  const getProductsForUser = async () => {
    const response = await OrganizationUserApi.getProducts(organizationId);
    dispatch(setProductsListAction({ productsList: response.data }));
  };

  const getStockList = async () => {
    const response = await OrganizationUserApi.getStockList(organizationId);
    const stockData = formatStockData(response.data);
    dispatch(setStockListAction({ stocksList: stockData }));
    // dispatch(setProductsListAction({ productsList: stockData }));
  };

  const getPurchaseList = async () => {
    const response = await OrganizationUserApi.getPurchases();
    const formattedPurchaseList = getFormattedPurchaseList(response.data);
    dispatch(setPurchaseListAction({ purchaseList: formattedPurchaseList }));
  };

  const getSalesList = async () => {
    const response = await OrganizationUserApi.getSales();
    const formattedSalesList = getFormattedSalesList(response.data);

    dispatch(setSalesListAction({ salesList: formattedSalesList }));
  };

  const getCustomerList = async () => {
    const response = await OrganizationUserApi.getCustomers();
    dispatch(setCustomersListAction({ customersList: response.data }));
  };

  const getSupplierList = async () => {
    const response = await OrganizationUserApi.getSuppliers();
    dispatch(setSuppliersListAction({ suppliersList: response.data }));
  };

  const getPayableList = async () => {
    const response = await OrganizationUserApi.getPaymentsPayable();
    dispatch(setPayableListAction({ payableList: response.data }));
  };

  const getReceivableList = async () => {
    const response = await OrganizationUserApi.getReceiptsReceivable();
    dispatch(setReceivableListAction({ receivableList: response.data }));
  };

  const getBankList = async () => {
    const response = await OrganizationUserApi.getBankList();
    dispatch(setBanksListAction({ bankList: response.data }));
  };

  const getUserAccountList = async () => {
    const response = await OrganizationUserApi.getUserAccounts();
    dispatch(setUserAccountListAction({ userAccountList: response.data }));
  };
  const getPaymentsList = async () => {
    const response = await OrganizationUserApi.getAllPayments();
    const formattedResult = getFormattedPaymentList(response.data);

    dispatch(setPaymentListAction({ paymentList: formattedResult }));
  };

  const getReceiptsList = async () => {
    const response = await OrganizationUserApi.getAllReceipts();
    const formattedReceiptList = getFormattedReceiptList(response.data);

    dispatch(setReceiptListAction({ receiptList: formattedReceiptList }));
  };

  const onClickCards = (field) => {
    console.log("clicked", field);
    if (field === "Payable") navigate("/dashboard/payableTotal");
    if (field === "Receivable") navigate("/dashboard/receivableTotal");
    if (field === "Sales") navigate("/dashboard/salesTotal");
    if (field === "Purchase") navigate("/dashboard/purchaseTotal");
  };
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Payable Amount"
            count={`Rs ${payableTotal}`}
            percentage={59.3}
            extra="35,000"
            onClickHandler={() => onClickCards("Payable")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Receivable Amount"
            count={`Rs ${receivableTotal}`}
            percentage={70.5}
            extra="8,900"
            onClickHandler={() => onClickCards("Receivable")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales"
            count={`Rs ${salesTotal}`}
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
            onClickHandler={() => onClickCards("Sales")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Purchase"
            count={`Rs ${purchaseTotal}`}
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
            onClickHandler={() => onClickCards("Purchase")}
          />
        </Grid>
        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />

        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Unique Visitor</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  // onClick={() => setSlot("month")}
                  color={"primary"}
                  variant={"outlined"}
                >
                  Month
                </Button>
                <Button
                  size="small"
                  // onClick={() => setSlot("week")}
                  color={"secondary"}
                  variant={"text"}
                >
                  Week
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              {/* <IncomeAreaChart slot={slot} /> */}
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  This Week Statistics
                </Typography>
                <Typography variant="h3">$7,650</Typography>
              </Stack>
            </Box>
            {/* <MonthlyBarChart /> */}
          </MainCard>
        </Grid>

        {/* row 3 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Orders</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            {/* <OrdersTable /> */}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Analytics Report</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Company Finance Growth" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Company Expenses Ratio" />
                <Typography variant="h5">0.58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Business Risk Cases" />
                <Typography variant="h5">Low</Typography>
              </ListItemButton>
            </List>
            {/* <ReportAreaChart /> */}
          </MainCard>
        </Grid>

        {/* row 4 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Sales Report</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                size="small"
                select
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": { py: 0.5, fontSize: "0.875rem" },
                }}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 1.75 }}>
            <Stack spacing={1.5} sx={{ mb: -12 }}>
              <Typography variant="h6" color="secondary">
                Net Profit
              </Typography>
              <Typography variant="h4">$1560</Typography>
            </Stack>
            {/* <SalesColumnChart /> */}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Transaction History</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                "& .MuiListItemButton-root": {
                  py: 1.5,
                  "& .MuiAvatar-root": avatarSX,
                  "& .MuiListItemSecondaryAction-root": {
                    ...actionSX,
                    position: "relative",
                  },
                },
              }}
            >
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: "success.main",
                      bgcolor: "success.lighter",
                    }}
                  >
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Order #002434</Typography>
                  }
                  secondary="Today, 2:00 AM"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $1,430
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      78%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: "primary.main",
                      bgcolor: "primary.lighter",
                    }}
                  >
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Order #984947</Typography>
                  }
                  secondary="5 August, 1:45 PM"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $302
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      8%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: "error.main",
                      bgcolor: "error.lighter",
                    }}
                  >
                    <SettingOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Order #988784</Typography>
                  }
                  secondary="7 hours ago"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $682
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      16%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Stack>
                    <Typography variant="h5" noWrap>
                      Help & Support Chat
                    </Typography>
                    <Typography variant="caption" color="secondary" noWrap>
                      Typical replay within 5 min
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <AvatarGroup
                    sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}
                  >
                    <Avatar alt="Remy Sharp" src={avatar1} />
                    <Avatar alt="Travis Howard" src={avatar2} />
                    <Avatar alt="Cindy Baker" src={avatar3} />
                    <Avatar alt="Agnes Walker" src={avatar4} />
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                Need Help?
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default UsersDashboard;
