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

const colorPrimary = "#00ADEF";
const backgroundColor = "#020817";
const borderColor = "#bfbfbf";

// eslint-disable-next-line react/display-name
export const PDF = React.memo(({ data }: Props) => {
  const training = data.training.split(",");

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
              <Text style={styles.textCell}>
                EMPRESA INSTALADORA: {data.employee.InstallationCompany.name}
              </Text>
              <Text style={styles.textCell}>TÉCNICO: {data.employee.name}</Text>
              <Text style={styles.textCell}>
                TELÉFONO MÓVIL: {data.employee.InstallationCompany.phone}
              </Text>
              <Text style={styles.textCell}>
                CORREO: {data.employee.InstallationCompany.email}
              </Text>
              <Text style={styles.textCell}>
                PÁGINA WEB: {data.employee.InstallationCompany.website}
              </Text>
              <Text style={styles.textCell}>
                OFICINA: {data.employee.InstallationCompany.address}
              </Text>
            </View>
            <View style={styles.ViewHeaderInfo}>
              <Text style={styles.textCell}>
                FECHA: {new Date(data.serviceDate).toLocaleDateString()}
              </Text>
              <Text style={styles.textCell}>REFERENCIA: {data.number}</Text>
              <Text style={styles.textCell}>CLIENTE: {data.customer.name}</Text>
              <Text style={styles.textCell}>
                DIRECCIÓN/CALLE: {data.customer.address}
              </Text>
              <Text style={styles.textCell}>
                DISTRITO: {data.customer.district}
              </Text>
              <Text style={styles.textCell}>CORREO: {data.customer.email}</Text>
            </View>
          </View>
        </View>

        <View style={stylesTable.table}>
          <Text style={styles.textTitleBorderBotton}>SERVICIOS</Text>
          <View style={stylesTableCharacteristics.tableRow}>
            <View style={stylesTableCharacteristics.tableCol1}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                Código
              </Text>
            </View>
            <View style={stylesTableCharacteristics.tableCol2}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                Servicio
              </Text>
            </View>
            <View style={stylesTableCharacteristics.tableCol3}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                N° de WO IBS
              </Text>
            </View>
          </View>
          {data.services.map((item, index) => (
            <View key={index} style={stylesTableCharacteristics.tableRow}>
              <View style={stylesTableCharacteristics.tableCol1}>
                <Text style={stylesTableCharacteristics.tableCell}>
                  {item.service.code}
                </Text>
              </View>
              <View style={stylesTableCharacteristics.tableCol2}>
                <Text style={stylesTableCharacteristics.tableCell}>
                  {item.service.serviceName}
                </Text>
              </View>
              <View style={stylesTableCharacteristics.tableCol3}>
                <Text style={stylesTableCharacteristics.tableCell}>
                  {item.service.woNumber}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            fontSize: "8",
            border: "1.5px solid #bfbfbf",
            borderRadius: 10,
            marginTop: "15px",
            overflow: "hidden",
          }}
        >
          <View>
            <Text
              style={[
                styles.textTitleBorderBotton,
                { backgroundColor: "#fff" },
              ]}
            >
              Observaciones generales del técnico:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "5px 9px",
              }}
            >
              <Text style={{ fontSize: 8 }}>{data.technicianObservations}</Text>
            </View>
          </View>

          <View
            style={{
              borderTop: "1px solid #bfbfbf",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Text
              style={[
                styles.textTitleBorderBotton,
                {
                  backgroundColor: "transparent",
                  width: "33  %",
                  borderRight: "1px solid #bfbfbf",
                  borderRadius: 0,
                },
              ]}
            >
              Capacitación al cliente:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "5px 9px",
                gap: "15px",
              }}
            >
              {training.map((item, index) => (
                <Text key={index} style={{ fontSize: 8 }}>
                  {item},
                </Text>
              ))}
            </View>
          </View>

          <View
            style={{
              borderTop: "1px solid #bfbfbf",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Text
              style={[
                styles.textTitleBorderBotton,
                {
                  backgroundColor: "transparent",
                  width: "33%",
                  borderRight: "1px solid #bfbfbf",
                  borderRadius: 0,
                },
              ]}
            >
              Cerrado por:
            </Text>
            <View style={{ padding: "5px 10px" }}>
              <Text style={{ fontSize: 8 }}>{data.closureInfo}</Text>
            </View>
          </View>
        </View>

        <View style={stylesTable.table}>
          <Text style={styles.textTitleBorderBotton}>
            IVENTARIO NO SERIALIZADO
          </Text>
          <View style={stylesTableCharacteristics.tableRow}>
            <View style={stylesTableCharacteristics.productTableCol1}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                Producto
              </Text>
            </View>
            <View style={stylesTableCharacteristics.productTableCol2}>
              <Text style={stylesTableCharacteristics.tableCellTitle}>
                Cantidad
              </Text>
            </View>
          </View>
          {data.products.map((item, index) => (
            <View key={index} style={stylesTableCharacteristics.tableRow}>
              <View style={stylesTableCharacteristics.productTableCol1}>
                <Text style={stylesTableCharacteristics.tableCell}>
                  {item.product.item}
                </Text>
              </View>
              <View style={stylesTableCharacteristics.productTableCol2}>
                <Text style={stylesTableCharacteristics.tableCell}>
                  {item.quantityUsed}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.ViewCard}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
              borderBottom: "1.5px solid #bfbfbf",
            }}
          >
            <Text>Observaciones del Cliente:</Text>
            <Text>{data.customerObservations}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
                borderRight: "1.5px solid #bfbfbf",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <View>
                <Text>Firma del Cliente:</Text>
                <Image
                  src={data.customer.signature}
                  style={{ width: "140px", margin: "0 auto" }}
                />
              </View>
              <View
                style={{ borderTop: "1.5px solid #bfbfbf", padding: "10px" }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text>{data.customer.name}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: "100%", padding: "10px" }}>
              <View>
                <Text>Firma del Tecnico:</Text>
                <Image
                  src={data.employee.signature}
                  style={{ width: "140px", margin: "0 auto" }}
                />
              </View>
              <View
                style={{ borderTop: "1.5px solid #bfbfbf", padding: "10px" }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text>{data.employee.name}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={stylesImages.Footer}>
          <Text>{data.employee.InstallationCompany.name}</Text>
        </View>
      </Page>
    </Document>
  );
});

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
  Footer: {
    width: "120%",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    padding: "10px",
    fontSize: 12,
    backgroundColor: colorPrimary,
    color: "#fff",
  },
});

const styles = StyleSheet.create({
  Document: {},
  Page: {
    padding: "20px",
  },
  ViewCard: {
    width: "100%",
    display: "flex",
    border: "1.5px solid #bfbfbf",
    borderRadius: 10,
    overflow: "hidden",
    fontSize: 10,
    marginTop: "15px",
  },
  ViewHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 8,
    marginTop: "50px",
  },
  ViewHeaderInfo: {
    border: "1.5px solid #bfbfbf",
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
    backgroundColor: colorPrimary,
    color: "#fff",
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
    backgroundColor: "#e3e3e3",
    borderBottom: "none",
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
    backgroundColor: "#bfbfbf",
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
    border: "1.5px solid #bfbfbf",
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
    border: "1.5px solid #bfbfbf",
    marginTop: "10px",
    marginBotton: "10px",
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
    border: "1.5px solid #bfbfbf",
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
    borderColor: borderColor,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderColor: borderColor,
  },
  tableCol: {
    width: "36.6666%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottom: "none",
    borderColor: borderColor,
  },


  productTableCol1: {
    width: "50%", 
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottom: "none",
    borderColor: borderColor,
  },
  productTableCol2: {
    width: "50%", 
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottom: "none",
    borderColor: borderColor,
  },

  tableCol1: {
    width: "33%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottom: "none",
    borderColor: borderColor,
  },
  tableCol2: {
    width: "33%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottom: "none",
    borderColor: borderColor,
  },
  tableCol3: {
    width: "34%", // 100% / 6 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRight: "none",
    borderTopWidth: 1,
    borderBottom: "none",
    borderColor: borderColor,
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
