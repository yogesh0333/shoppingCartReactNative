import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Header: React.FC = () => {
  const navigation = useNavigation();
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.count, 0),
  );

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name="cart-outline" size={30} color="black" />
        {cartItemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    paddingRight: 20,
  },
  cartBadge: {
    position: 'absolute',
    right: -14,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 16,
    padding: 3,
    paddingHorizontal: 7,
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default Header;
