import { StyleSheet, Document, Text, Page } from "@react-pdf/renderer";
import React from "react";

interface Props {
  data: ReportServiceTable;
}
// eslint-disable-next-line react/display-name
export const PDF = React.memo(() => {
  return (
    <Document>
      <Page size="A4" style={styles.Page}>
        <Text style={styles.TextCenter}>PROFORMA</Text>
      </Page>
    </Document>
  );
});

const stylesImages = StyleSheet.create({
  ImageHeader: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "50%",
    height: "auto",
    marginTop: 0,
    marginLeft: 0,
  },
  ImageFooter: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: "auto",
  },
  Ellipse: {
    position: "absolute",
    width: "70px",
  },
  Ellipse1: {
    top: "130px",
    left: "-35px",
    width: "70px",
  },
  Ellipse2: {
    top: "30%",
    right: "-30px",
    width: "70px",
  },
  Ellipse3: {
    top: "50%",
    left: "-35px",
    width: "70px",
  },
  Ellipse8: {
    bottom: "130px",
    right: "-20px",
    width: "70px",
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
    marginTop: "100px",
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
    top: "100px",
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
    backgroundColor: "#283C4C",
    color: "#DAFC4A",
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
