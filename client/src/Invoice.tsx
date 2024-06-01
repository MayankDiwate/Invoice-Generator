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
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 5,
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
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE GENERATOR</Text>
          <Text>levitation infotech</Text>
        </View>
        <Text>Sample Output should be this</Text>
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
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Text>Total: INR {total}</Text>
          <Text>GST: {gst}%</Text>
          <Text style={{ fontWeight: "bold" }}>
            Grand Total: INR {grandTotal}
          </Text>
        </View>
        <Text>
          Valid until: {validUntil}/{new Date().getUTCMonth()}/
          {new Date().getUTCFullYear()}
        </Text>
        <View style={styles.terms}>
          <Text>Terms and Conditions</Text>
          <Text>
            We are happy to supply any further information you may need and
            trust that you call on us to fill your order, which will receive our
            prompt and careful attention
          </Text>
        </View>
      </Page>
    </Document>
  );
};