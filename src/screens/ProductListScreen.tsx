import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductListScreenProps {
  navigation: {
    navigate: (screen: string, params?: {product: Product}) => void;
  };
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `https://fakestoreapi.com/products?limit=10&page=${page}`,
      );
      if (response.data.length === 0) {
        setHasMore(false); // No more products available
      } else {
        setProducts(prevProducts => [...prevProducts, ...response.data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem: ListRenderItem<Product> = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {product: item})}
      key={item.id.toString()}>
      <View style={styles.productContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
      contentContainerStyle={
        products.length === 0 ? styles.emptyList : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListScreen;
