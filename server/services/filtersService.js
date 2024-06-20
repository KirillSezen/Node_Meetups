const { Op } = require("sequelize")

class FilterService {
    formateOffset(page, limit) {
        let offset = page * limit - limit
        return offset
    }

    formateWhereconditions(search, description) {
        let whereConditions = {}
        if (search) {
            whereConditions = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ]
            };
        }
    
        if (description) {
            whereConditions = { ...whereConditions, description: {
                [Op.ne]: null, 
                [Op.ne]: ''
            }};
        }
        return whereConditions
    }

    formateOrederconditions(sort, order) {
        let orderConditions = []
        if (sort && order) {
            orderConditions = [[sort, order]];
        }
        return orderConditions
    }
}

module.exports = new FilterService()