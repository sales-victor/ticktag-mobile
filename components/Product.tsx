import { ProductInterface } from "@/constants/ProductsTypes";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProductFuncI {
  product: ProductInterface;
  addQuantity: () => void;
  subtractQuantity: () => void;
}

export default function Product({ product, addQuantity, subtractQuantity }: ProductFuncI) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.text}>{product?.eventName}</Text>
        <Text style={styles.text}>{product?.address}</Text>
        <Text style={styles.text}>{product?.date}</Text>
        <Text style={styles.text}>{product?.hour}</Text>
      </View>
      <View style={styles.priceQuantity}>
        <Text style={styles.priceText}>R$ {(product?.price * product?.quantity).toFixed(2)}</Text>
        <View style={styles.quantityView}>
          <Pressable style={styles.quantityButtons} onPress={addQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
          <Text style={styles.quantityText}>{product?.quantity}</Text>
          <Pressable style={styles.quantityButtons} onPress={subtractQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#666",
    borderWidth: 2,
    borderRadius: 10,
    minWidth: "60%",
    maxWidth: "80%",
    margin: 5,
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
  },
  details: {
    flex: 3,
    justifyContent: "flex-start",
  },
  priceQuantity: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  priceText: {
    fontSize: 22,
    textAlign: "center",
  },
  quantityView: {
    maxWidth: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  quantityButtons: {
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  quantityText: {
    fontSize: 20,
  },
  text: {
    fontSize: 16.5,
  },
});
