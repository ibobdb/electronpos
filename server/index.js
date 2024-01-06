const express = require('express')
const app = express();
const cors = require('cors');
const PORT = 8080;
const bodyParser = require('body-parser');
// Middleware untuk mengurai data JSON dan formulir URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
  res.send('hello')
})
// Database Setting
const dbConfig = require('./api/dbconfig');
app.get('/api/v1/db-setting', dbConfig.getConfig)
app.post('/api/v1/db-setting/update', dbConfig.updateConfig)
app.get('/api/v1/db-setting/connection', dbConfig.connection)
// Produk API
const product = require('./api/productAPI');
app.get('/api/v1/product/', product.getAll);
app.get('/api/v1/product/:barcode', product.getByBarcode);
app.delete('/api/v1/product/:barcode', product.delete);
app.post('/api/v1/product/', product.post);
app.put('/api/v1/product/:barcode', product.update);

// Category API
const category = require('./api/categoryAPI')
app.get('/api/v1/category', category.getAll)
app.post('/api/v1/category', category.addCategory)
app.delete('/api/v1/category/:id', category.delete)
app.put('/api/v1/category/:id', category.update)
// transaksi
const transaction = require('./api/transactionAPI')
app.post('/api/v1/transaction', transaction.create);
app.get('/api/v1/transaction', transaction.get);
// app.get('/api/v1/transaction', transaction.getTransactionById);
// Dashboard
const dashboard = require('./api/dashboardAPI');
app.get('/api/v1/dashboard/non_filter_data', dashboard.non_filter_data);
app.get('/api/v1/dashboard/filter_data', dashboard.filter_data);
// DISKON
const discount = require('./api/discountAPI');
discount.check_discount_expire();
app.get('/api/v1/discount', discount.get_discount);
app.post('/api/v1/discount', discount.create_discount);
app.put('/api/v1/discount/change_status/:id', discount.set_off_discount);
// Batch
const batch = require('./api/batchAPI');
batch.check_bath_expire();
app.get('/api/v1/batch', batch.get);
app.get('/api/v1/batch/:batch_code', batch.getById);
app.post('/api/v1/batch', batch.create);
app.put('/api/v1/batch', batch.update);
app.delete('/api/v1/batch/:batch_code', batch.delete);
app.put('/api/v1/batch/:batch_code', batch.adjust_batch_stock);

app.listen(PORT, () => {
  console.log(`Server dijalankan pada port:${PORT}`)
})