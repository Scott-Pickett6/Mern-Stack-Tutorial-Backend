import { Model, DataTypes } from 'sequelize';

  export default(sequelize) => {
    class Product extends Model {
      static associate(models) {
        // define association here
      }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};