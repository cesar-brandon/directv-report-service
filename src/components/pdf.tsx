import {
  StyleSheet,
  Document,
  Text,
  Page,
  Image,
  View,
} from "@react-pdf/renderer";
import React from "react";

interface Props {
  data: ReportService;
}
// eslint-disable-next-line react/display-name
export const PDF = React.memo(({ data }: Props) => {
  return (
    <Document title="Reporte de Servicio" author="directv">
      <Page size="A4" style={styles.Page}>
        <Image src="/dtv-logo-blue.png" style={stylesImages.ImageHeader} />
        <View style={styles.ViewTextNumber}>
          <Text>Reporte de Servicio N° {data.number}</Text>
        </View>
        <View style={{ padding: "15px" }}>
          <View style={styles.ViewHeader}>
            <View style={[styles.ViewHeaderInfo, styles.ViewHeadEnterprise]}>
              <Text style={styles.textCell}>RAZÓN SOCIAL: lorem</Text>
              <Text style={styles.textCell}>RUC: lorem</Text>
              <Text style={styles.textCell}>TELÉFONO MÓVIL: lorem</Text>
              <Text style={styles.textCell}>CORREO: sdfsdfdsfdsf</Text>
              <Text style={styles.textCell}>PÁGINA WEB: sfsdfsf</Text>
              <Text style={styles.textCell}>OFICINA: Av. Brasil 2980</Text>
              <Text style={styles.textCell}>PORTAFOLIO DIGITAL: sfsfsdfsf</Text>
            </View>
            <View style={styles.ViewHeaderInfo}>
              <Text style={styles.textCell}>FECHA: {data.serviceDate}</Text>
              <Text style={styles.textCell}>REFERENCIA: {data.number}</Text>
              <Text style={styles.textCell}>
                ELABORADO POR: {data.employee.name}
              </Text>
              <Text style={styles.textCell}>
                APROBADO POR: {data.customer.name}
              </Text>
              <Text style={styles.textCell}>CORREO: {data.employee.email}</Text>
              <Text style={styles.textCell}>
                TELÉFONO MÓVIL: {data.employee.role}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            fontSize: "8",
            border: "1.5px solid #000",
            borderRadius: 10,
            marginBottom: "15px",
          }}
        >
          <Text style={styles.textTitleBorderBotton}>PRESENTACIÓN</Text>
          <View
            style={{ display: "flex", flexDirection: "row", padding: "8px" }}
          >
            <View>
              <Text style={styles.textCell}>NOMBRE DEL PROSPECTO:</Text>
              <Text style={styles.textCell}>RUC: </Text>
              <Text style={styles.textCell}>DATOS DE NEGOCIO:</Text>
              <Text style={styles.textCell}>DIRECCIÓN:</Text>
            </View>
            <View style={{ marginLeft: "5px" }}>
              <Text style={styles.textCell}>NOMBRE DEL NEGOCIO:</Text>
              <Text style={styles.textCell}>CORREO: {data?.company.email}</Text>
              <Text style={styles.textCell}>TELÉFONO: +51</Text>
            </View>
          </View>
        </View>
        <View style={stylesTable.table}>
          <Text style={styles.textTitleBorderBotton}>1. CARACTERÍSTICAS</Text>
          <View style={stylesTableCharacteristics.tableRow}>
            <View style={stylesTableCharacteristics.tableCol1}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                AREA
              </Text>
            </View>
            <View style={stylesTableCharacteristics.tableCol2}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                ITEM
              </Text>
            </View>
            <View style={stylesTableCharacteristics.tableCol3}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                DETALLE
              </Text>
            </View>
            <View style={stylesTableCharacteristics.tableCol4}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                PAQUETE 1
              </Text>
            </View>
            <View style={stylesTableCharacteristics.tableCol4}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                PAQUETE 2
              </Text>
            </View>
            <View style={stylesTableCharacteristics.table4Background}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                PAQUETE 3
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: "8px",
                paddingRight: "20px",
              }}
            >
              RECOMENDADO
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
});

const colorPrimary = "#00ADEF";
const backgroundColor = "#020817";

const stylesImages = StyleSheet.create({
  ImageHeader: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "30%",
    height: "auto",
    marginTop: 20,
    marginLeft: 20,
  },
  ImageFooter: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: "auto",
  },
});

const styles = StyleSheet.create({
  Document: {},
  Page: {
    padding: "20px",
  },
  ViewHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 8,
    marginBottom: "15px",
    marginTop: "60px",
  },
  ViewHeaderInfo: {
    border: "1.5px solid #283C4C",
    borderRadius: 10,
    padding: 5,
    width: "48%",
  },
  ViewHeadEnterprise: {
    width: "70%",
    border: "none",
  },
  ViewTextNumber: {
    position: "absolute",
    top: "20px",
    right: "0px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "45%",
    height: "30px",
    justifyContent: "flex-start",
    fontSize: "14px",
    fontWeight: "semibold",
    paddingLeft: "15px",
    backgroundColor: backgroundColor,
    color: colorPrimary,
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  textCell: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
    fontWeight: "light",
  },
  textTitleBorderBotton: {
    backgroundColor: "#DADADA",
    borderBottom: "1.5px solid #283C4C",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 2,
    fontSize: 9,
  },
  textSubTitleBackground: {
    backgroundColor: "#e8fd8e",
    width: "100%",
  },
  textTitleBackground: {
    backgroundColor: "#DADADA",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 2,
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    fontSize: 9,
  },
  ViewFooter: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexDirection: "row",
    fontSize: 8,
    border: "1.5px solid #283C4C",
    borderRadius: 10,
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "5px 10px",
  },
  ViewItemDisplayFlex: {
    width: "45%",
  },
  ViewTextFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 8,
  },
  TextCenter: {
    textAlign: "center",
    textDecoration: "underline",
    paddingBottom: "5px",
    marginTop: "5px",
  },
  TextDetailItem: {
    width: "100%",
    fontSize: 8,
    fontWeight: "light",
  },
});

const stylesTable = StyleSheet.create({
  table: {
    display: "flex",
    width: "auto",
    border: "1.5px solid #283C4C",
    marginTop: "10px",
    marginBotton: "5px",
    borderRadius: "10px",
  },
  tableCancelarMarginTop: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBotton: "5px",
    marginTop: "5px",
  },
  tableRow: {
    width: "100%",
    flexDirection: "row",
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRight: "none",
  },
  tableCell: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
  },
  tableText: {
    width: "100%",
    border: "1.5px solid #000",
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    fontSize: 8,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },
  ColTablePrecing: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellPrecingRight: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
    textAlign: "left",
  },
  tableCellPrecing: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 8,
    textAlign: "right",
  },
});

const stylesTableCharacteristics = StyleSheet.create({
  table: {
    display: "none",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "16.6666%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: "7%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "5%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: "28%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol4: {
    width: "20%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  table4Background: {
    width: "20%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRight: "none",
    borderTopWidth: 0,
    backgroundColor: "#e8fd8e",
  },
  tableCell: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 6,
    paddingLeft: 2,
    paddingRight: 2,
  },
  tableCellTitle: {
    margin: "auto",
    fontSize: 7,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

const stylesTableDetailService = StyleSheet.create({
  tableCellSubTitle: {
    marginTop: 2,
    fontSize: 7,
  },
  tableCell: {
    marginTop: 2,
    fontSize: 6,
  },
});
