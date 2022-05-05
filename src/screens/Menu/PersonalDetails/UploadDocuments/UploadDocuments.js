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
import { getToken } from "../../../../store/app";

import styles from "./uploadDocumentsStyles";

const getUploadedDocumentsStatus =
  UploadDocumentsServices.getUploadedDocumentsStatus();

const getComplianceAllowedDocuments =
  UploadDocumentsServices.getComplianceAllowedDocuments();

const UploadDocuments = ({ navigation }) => {
  const { t } = useTranslation();
  const token = useSelector((state) => getToken(state));
  const [disabled, setDisabled] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [isDatepickerOpen, setDatepickerOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState(null);
  const [allDocuments, setDocuments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDocsReady, setDocsReady] = useState(false);
  const [fileResponse, setFileResponse] = useState([]);

  useEffect(() => {
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
            value: doc.Name,
            DocumentGroupId: doc.DocumentGroupId,
            GroupName: doc.GroupName,
            Name: doc.Name,
            RequiredExpirationDate: doc.RequiredExpirationDate,
          };
        });
        setDocuments(allDocs);
        setLoading(false);
        setDocsReady(true);

        // TODO
        // widget.elementsCache.uploadedDocs.html(widget.displayDocumentsTable(response.data))
      });
    });
  }, []);

  const _pickDocument = async () => {
    // To work on IOS we should provide App AppleID !!!!!!!
    if (Platform.OS === "ios") {
      alert("To work on IOS we should provide App AppleID !!!!!!!");
      return;
    }
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };

  const onChangeExpDate = (value) => {
    if (value !== null) {
      setExpDate(value);
      setDatepickerOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <Formik
          style={styles.form}
          initialValues={{
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
          }}
          onSubmit={(values) => {
            setDisabled(true);
          }}
        >
          {(props) => (
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
                    onChange={(value) => setFileType(value)}
                  />
                ) : null}
                <Datepicker
                  modalState={isDatepickerOpen}
                  toggleModal={onChangeExpDate}
                  datepickerDate={expDate ? expDate : new Date(Date.now())}
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
                    text={"No file chosen"}
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
                  onPress={props.handleSubmit}
                  disabled={disabled}
                />
              </View>
            </View>
          )}
        </Formik>
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default UploadDocuments;
