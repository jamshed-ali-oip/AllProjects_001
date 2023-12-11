import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Products from './screens/Products';
import ProductsListings from './screens/ProductsListings';

const ProductStack = createNativeStackNavigator();
const ProductsStack = props => {
  return (
    <ProductStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Productss">
      <ProductStack.Screen name="Productss" component={Products} {...props.navigation} />
      <ProductStack.Screen name="ProductsListings" component={ProductsListings} {...props.navigation} />
    </ProductStack.Navigator>
  );
};

export default ProductsStack;
