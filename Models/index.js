const mongoose = require("mongoose");
const userSchema = require("./Schemas/userSchema");
const productSchema = require("./Schemas/productSchema");
const categorySchema = require("./Schemas/categorySchema");
const orderSchema = require("./Schemas/orderSchema");

exports.User = mongoose.model("User", userSchema);
exports.Product = mongoose.model("Product", productSchema);
exports.Category = mongoose.model("Category", categorySchema);
exports.Order = mongoose.model("Order", orderSchema);
