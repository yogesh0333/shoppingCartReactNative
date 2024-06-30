import React from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  increaseCount,
  decreaseCount,
  removeFromCart,
} from '../redux/cartSlice';
import {RootState} from '../redux/store';

interface ProductDetailScreenProps {
  route: {
    params: {
      product: {
        id: number;
        title: string;
        price: number;
        description: string;
        image: string;
      };
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === product.id),
  );

  const productCount = cartItem ? cartItem.count : 0;

  const handleDecrease = () => {
    if (productCount > 1) {
      dispatch(decreaseCount(product.id));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text>{product.title}</Text>
      <Text>${product.price.toFixed(2)}</Text>
      <Text>{product.description}</Text>
      {productCount > 0 ? (
        <View style={styles.buttonContainer}>
          <Button title="-" onPress={handleDecrease} />
          <Text style={styles.countText}>{productCount}</Text>
          <Button
            title="+"
            onPress={() => dispatch(increaseCount(product.id))}
          />
        </View>
      ) : (
        <Button
          title="Add to Cart"
          onPress={() => dispatch(addToCart(product))}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  countText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ProductDetailScreen;
