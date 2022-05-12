import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Pressable, Text, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import moment from "moment";
import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";

import UploadDocumentsServices from "./service/UploadDocumentsServices";

import {
  Button,
  Picker,
  Datepicker,
  Typography,
  Loading,
} from "../../../../components";
import { deviceWidth } from "../../../../utils";

import styles from "./uploadDocumentsStyles";

const getUploadedDocumentsStatus =
  UploadDocumentsServices.getUploadedDocumentsStatus();

const getComplianceAllowedDocuments =
  UploadDocumentsServices.getComplianceAllowedDocuments();

const submitDocs = UploadDocumentsServices.complianceAddDocument();

const UploadDocuments = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedDocument, setSelectedDocument] = useState({});
  const [fileType, setFileType] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [isDatepickerOpen, setDatepickerOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState(null);
  const [allDocuments, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDocsReady, setDocsReady] = useState(false);
  const [fileResponse, setFileResponse] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const getUploadedDocsStatus = () => {
    getUploadedDocumentsStatus.fetch().then(({ response }) => {
      if (response.body.code !== 200) {
        return;
      }
      setUploadedDocuments(response.body.data);
      getComplianceAllowedDocuments.fetch().then(({ response }) => {
        if (response.body.code !== 200) {
          return;
        }
        let allDocs = [];
        const documents = response.body.data;
        documents.forEach((doc) => {
          allDocs[doc.Id - 1] = {
            label: doc.Name,
            itemKey: doc.Id,
            key: doc.Id,
            value: doc.Name,
            DocumentGroupId: doc.DocumentGroupId,
            GroupName: doc.GroupName,
            Name: doc.Name,
            RequiredExpirationDate: doc.RequiredExpirationDate,
          };
        });
        setSelectedDocument(allDocs[0]);
        setDocuments(allDocs);
        setLoading(false);
        setDocsReady(true);
      });
    });
  };

  const _pickDocument = async () => {
    const validFileExtensions = [
      "image/png",
      "image/bmp",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/x-windows-bmp",
      "application/pdf",
    ];

    // To work on IOS we should provide App AppleID !!!!!!!
    if (Platform.OS === "ios") {
      alert("To work on IOS we should provide App AppleID !!!!!!!");
      return;
    }

    let result = await DocumentPicker.getDocumentAsync({});
    if (result) {
      if (!result.uri && result.size > 30000000) {
        Toast.show({
          type: "error",
          text1: "Please attach valid file.",
          topOffset: 100,
        });
      }
      const match = validFileExtensions.indexOf(result.mimeType);

      if (match < 0) {
        Toast.show({
          type: "error",
          text1: "This file type is not allowed.",
          topOffset: 100,
        });
      }

      result.lastModified = Date.now();
      result.lastModifiedDate = new Date();
      result.type = result.mimeType;
      result.webkitRelativePath = result.uri;
      setFileResponse(result);
      setFileName(result.name);
    }
  };

  const onChangeExpDate = (value) => {
    if (value !== null) {
      setExpDate(value);
      setDatepickerOpen(false);
    }
  };

  const expirationDateValidaton = (date) => {
    var mdate = moment(date, "MM-DD-YYYY"),
      today = moment().startOf("day").format("x"),
      regexp = new RegExp("^[0-9]{2}/[0-9]{2}/[0-9]{4}$"),
      isValidDate = {},
      isPastDate = today > mdate.format("x");

    isValidDate.message = t(`menu.enterValidExpDate`);

    if (!regexp.test(date)) {
      isValidDate.validDate = false;
      return isValidDate;
    }

    if (isPastDate) {
      isValidDate.validDate = false;
      isValidDate.message = t(`menu.expDateInThePast`);
      return isValidDate;
    }

    isValidDate.validDate = mdate.isValid();

    return isValidDate;
  };

  const submitDocument = () => {
    const isRequired = selectedDocument.RequiredExpirationDate;
    let expirationDate = expDate ? moment(expDate).format("MM/DD/YYYY") : "";
    const date = expirationDateValidaton(expirationDate);

    if (!selectedDocument) {
      Toast.show({
        type: "error",
        text1: t(`menu.selectTypeError`),
        topOffset: 100,
      });
    } else if (!fileResponse) {
      // TODO => finish uploadin file on android
      Toast.show({
        type: "error",
        text1: t(`menu.attachValidFile`),
        topOffset: 100,
      });
    }

    if (isRequired) {
      if (!date.validDate) {
        Toast.show({
          type: "error",
          text1: date.message,
          topOffset: 100,
        });
        return;
      }
    } else {
      expirationDate = date.validDate
        ? expirationDate
        : moment().format("MM/DD/YYYY");
    }

    submitDocs
      .fetch({
        image: fileResponse,
        documentTypeId: selectedDocument.itemKey,
        expDate: expirationDate ? expirationDate : "",
      })
      .then(({ response }) => {
        if (response.body.code !== 200) {
          Toast.show({
            type: "error",
            text1: response.body.data.text,
            topOffset: 100,
          });
          return;
        }
        getUploadedDocsStatus();
      });
  };

  useEffect(() => {
    getUploadedDocsStatus();
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <View style={styles.formWrapper}>
          <ScrollView
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: deviceWidth - 48,
              flexGrow: 1,
              paddingBottom: 130,
              marginTop: 16,
            }}
          >
            {isDocsReady ? (
              <Picker
                values={allDocuments}
                placeholderText={fileType}
                value={fileType}
                onChange={(value) => {
                  if (value !== fileType) {
                    setSelectedDocument(
                      allDocuments.find((x) => x.label === value)
                    );
                    setFileType(value);
                  }
                }}
              />
            ) : null}
            <Datepicker
              modalState={isDatepickerOpen}
              toggleModal={onChangeExpDate}
              datepickerDate={expDate ? expDate : new Date(Date.now())}
              minDate={new Date()}
            />
            <View style={styles.chooseFileWrapper}>
              <Pressable
                style={styles.chooseFileBtn}
                title="open picker for single file selection"
                onPress={_pickDocument}
              >
                <Typography
                  name="small"
                  text={"Choose file"}
                  style={styles.btnText}
                />
              </Pressable>
              <Typography
                name="small"
                text={fileName}
                style={styles.fileText}
              />
            </View>
            <View style={styles.textFieldWrapper}>
              <Pressable
                onPress={() => setDatepickerOpen(!isDatepickerOpen)}
                style={styles.input}
              >
                <Typography
                  name="small"
                  text={
                    expDate
                      ? moment(expDate).format("DD-MM-YYYY")
                      : t(`menu.expirationDate`)
                  }
                />
              </Pressable>
            </View>
            <Button
              textStyle={styles.myDocumentsBtn}
              text={t(`menu.myDocuments`)}
              type="text"
              font="normal"
              size="medium"
              onPress={() =>
                navigation.navigate("MyDocuments", {
                  documents: uploadedDocuments,
                })
              }
            />
          </ScrollView>
          <View style={styles.buttonsWrapper}>
            <Button
              text={t("common-labels.save")}
              type="primary"
              font="mediumBold"
              size="big"
              onPress={() => submitDocument()}
            />
          </View>
        </View>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default UploadDocuments;
