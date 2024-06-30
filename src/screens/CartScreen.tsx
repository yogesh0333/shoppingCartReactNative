import React from 'react';
import {View, Text, FlatList, Image, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {removeFromCart, increaseCount, decreaseCount} from '../redux/cartSlice';

interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  image: string;
}

const CartScreen: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const dispatch = useDispatch();

  const renderItem = ({item}: {item: CartItem}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.buttonContainer}>
          <Button title="+" onPress={() => dispatch(increaseCount(item.id))} />
          <Text style={styles.countText}>{item.count}</Text>
          <Button
            title="-"
            onPress={() => {
              if (item.count > 1) {
                dispatch(decreaseCount(item.id));
              } else {
                dispatch(removeFromCart(item.id));
              }
            }}
          />
          <Button
            title="Remove"
            onPress={() => dispatch(removeFromCart(item.id))}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default CartScreen;
