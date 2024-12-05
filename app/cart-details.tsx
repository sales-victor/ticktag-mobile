import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import Product from "@/components/Product";
import { ProductInterface } from "@/constants/ProductsTypes";

const ProductItem: ProductInterface = {
  eventName: "Event",
  address: "address",
  date: "date",
  hour: "hour",
  price: 500,
  quantity: 2,
};

const Products: Array<ProductInterface> = [
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
  ProductItem,
];

export default function CartDetails() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.cartText}>Carrinho de Compras</Text>
      {Products.map((productItem) => (
        <Product
          product={productItem}
          addQuantity={() => console.log("test")}
          subtractQuantity={() => console.log("teste2")}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  cartText: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
