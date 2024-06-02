import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Product } from "./types/Product";

// Register a custom font
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 30,
    fontSize: 12,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 50,
    marginBottom: 20,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #EEE",
    padding: 8,
  },
  tableHeader: {
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
  },
  terms: {
    marginTop: 20,
    padding: 20,
    paddingHorizontal: 40,
    backgroundColor: "black",
    color: "white",
    borderRadius: 50,
  },
});

export const Invoice = ({
  id,
  products,
}: {
  id: string;
  products: Product[];
}) => {
  const validDays = 7;
  const validUntil =
    new Date().getUTCDate() + validDays > 31
      ? new Date().getUTCDate() + validDays - 31
      : new Date().getUTCDate() + validDays;
  const total = products
    .filter((product: Product) => product.invoiceId === id)
    .map((product: Product) => product.rate * product.quantity)
    .reduce((a, b) => a + b, 0);
  const gst = total * 0.18;
  const grandTotal = total + gst;

  return (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>INVOICE GENERATOR</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: 5,
                  marginRight: 20,
                }}
              >
                <Text>levitation</Text>
                <Text>infotech</Text>
              </View>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Product</Text>
                <Text style={styles.tableCell}>Qty</Text>
                <Text style={styles.tableCell}>Rate</Text>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              {products.map((product, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{product.name}</Text>
                  <Text style={styles.tableCell}>{product.quantity}</Text>
                  <Text style={styles.tableCell}>{product.rate}</Text>
                  <Text style={styles.tableCell}>
                    INR {product.quantity * product.rate}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "40%",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Total: INR </Text>
                <Text>{total}</Text>
              </View>
              <Text
                style={{
                  width: "40%",
                  height: "1",
                  backgroundColor: "#EEE",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <view
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "40%",
                }}
              >
                <Text>GST (18%):</Text>
                <Text>INR {gst}</Text>
              </view>
              <Text
                style={{
                  width: "40%",
                  height: "1",
                  backgroundColor: "#EEE",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  width: "40%",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Grand Total:</Text>
                <Text>INR {grandTotal}</Text>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
            <Text>Valid until:</Text>
            <Text style={{ fontWeight: "bold" }}>
              {validUntil}/{new Date().getUTCMonth()}/
              {new Date().getUTCFullYear()}
            </Text>
          </View>
          <View style={styles.terms}>
            <Text style={{ fontWeight: "bold" }}>Terms and Conditions</Text>
            <Text>
              We are happy to supply any further information you may need and
              trust that you call on us to fill your order, which will receive
              our prompt and careful attention
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
