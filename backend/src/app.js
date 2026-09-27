const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const fineRoutes = require("./routes/fineRoutes");
const reportRoutes = require("./routes/reportRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", require("path").join(__dirname, "views"));
app.use(express.static(require("path").join(__dirname, "../public")));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/fines", fineRoutes);
app.use("/api/reports", reportRoutes);

const page = (name, isProtected = true, extra = {}) => (req, res) =>
  res.render("app", { page: name, isProtected, title: "", reportKey: "", ...extra });

app.get("/", page("login", false));
app.get("/login", page("login", false));
app.get("/register", page("register", false));
app.get("/forgot-password", page("forgot-password", false));
app.get("/reset-password/:token", page("reset-password", false));
app.get("/unauthorized", page("unauthorized", false));

app.get("/admin/home", page("admin-home"));
app.get("/admin/maintenance", page("maintenance"));
app.get("/admin/maintenance/add-membership", page("add-membership"));
app.get("/admin/maintenance/update-membership", page("update-membership"));
app.get("/admin/maintenance/add-book", page("add-book"));
app.get("/admin/maintenance/update-book", page("update-book"));
app.get("/admin/maintenance/user-management", page("user-management"));
app.get("/user/home", page("user-home"));
app.get("/reports", page("reports"));
app.get("/reports/books", page("report-table", true, { title: "Master List of Books", reportKey: "books" }));
app.get("/reports/movies", page("report-table", true, { title: "Master List of Movies", reportKey: "movies" }));
app.get("/reports/memberships", page("report-table", true, { title: "Master List of Memberships", reportKey: "memberships" }));
app.get("/reports/active-issues", page("report-table", true, { title: "Active Issues", reportKey: "activeIssues" }));
app.get("/reports/overdue-returns", page("report-table", true, { title: "Overdue Returns", reportKey: "overdue" }));
app.get("/reports/pending-requests", page("report-table", true, { title: "Pending Issue Requests", reportKey: "pending" }));
app.get("/transactions", page("transactions"));
app.get("/transactions/book-availability", page("book-availability"));
app.get("/transactions/issue", page("issue-book"));
app.get("/transactions/return", page("return-book"));
app.get("/transactions/pay-fine", page("pay-fine"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;