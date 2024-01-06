const store_transaction = require('../services/transaction/storeTransaction')
const { transactionmodel, productoutmodel } = require('../models/');
const Pagination = require('../utils/pagination');
const responseFormatter = require('../formatter/responseFormatter');
const { Op } = require("sequelize");
module.exports = {
  create: async (req, res) => {
    const transaction_data = req.body.transaction;
    const product_list = req.body.productList;
    try {
      // const create_transaction = await store_transaction(transaction_data, product_list);
      const create_transaction = await store_transaction(product_list, transaction_data);
      if (!create_transaction) {
        return res.json(responseFormatter.error(create_transaction))
      }
      res.json(responseFormatter.success(create_transaction))
    } catch (error) {
      console.log(error)
      throw (error)
      res.json(responseFormatter.error(error))
    }


  },
  get: async (req, res) => {
    const { limit = 10, page = 1, search } = req.query;
    const whereClause = {
      [Op.and]: [
        {
          [Op.or]: [
            {
              id: {
                [Op.like]: `%${search}%`
              }
            },
          ]
        }
      ]
    };
    try {
      const offset = (page - 1) * limit;
      const response = await transactionmodel.findAndCountAll({
        limit: parseInt(limit),
        offset: offset,
        distinct: true,
        where: (search ? whereClause : {}),
        include: {
          model: productoutmodel,
          as: 'products',

        }
      })
      const results = Pagination(limit, page, response)
      res.json(responseFormatter.success(results))
    } catch (error) {
      throw error
    }
  },
  getTransactionById: async (req, res) => {
    const { limit = 10, page = 1, search } = req.query;
    try {
      const offset = (page - 1) * limit;
      const response = await transactionmodel.findOne({
        limit: parseInt(limit),
        offset: offset,
        distinct: true,
        where: {
          id: search
        },
        include: {
          model: productoutmodel,
          as: 'products',

        }
      })
      const results = Pagination(limit, page, response)
      res.json(responseFormatter.success(results))
    } catch (error) {
      throw error
    }
  }
}