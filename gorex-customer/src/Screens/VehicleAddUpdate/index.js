import React, {useContext, useEffect, useState} from "react";
import {View, Text, Image, Alert, TextInput, StyleSheet, ScrollView, ImageBackground, TouchableOpacity} from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "./styles";
import { Istimara } from "../../assets";
import Colors from "../../Constants/Colors";
import GeneralAPI from "../../api/GeneralAPI";
import { showToast } from "../../utils/common";
import GeneralPostAPI from "../../api/GeneralPostAPI";
import VehicleForm from "../../Constants/VehicleForm.json";
import { requestLibraryPermission } from "../../utils/permissions";

import Loader from "../../Components/Loader";
import { RoundedSquareFullButton } from "../../Components";
import BackHeader from "../../Components/Header/BackHeader";
import {CommonContext} from "../../contexts/ContextProvider";
import Footer from "../ProductsAndServices/components/Footer";
import VehicleOptions from "../../Components/Inputs/VehicleOptions";
import CustomBottomSheet from "../../Components/BottomSheet/CustomBottomSheet";
import ConfrimVehicleCard from "../ProductsAndServices/components/ConfrimVehicleCard";
import VehicleCard from "../ProductsAndServices/components/VehicleCard";

const VehicleInformation = ({ route }) => {
  const {userProfile} = useContext(CommonContext);
  const vehicleToUpdate = route?.params?.vehicleToUpdate;

  const { t } = useTranslation();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [showType, setShowType] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);

  const [types, setTypes] = useState([]);
  const [years, setYears] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [image, setImage] = useState();
  const [cardAdded, setCardAdded] = useState(false);
  const [numberPlate, setNumberPlate] = useState("");
  const [IstimaraModal, setIstimaraModal] = useState(false);
  const [numberPlateModal, setNumberPlateModal] = useState(false);
  const [state, setState] = useState({
    fields: [],
    errorMessages: {},
  });

  useEffect(() => {
    getVehicles();
    getModels();
    getTypes();
    getYears();

    if (vehicleToUpdate) {
      if (vehicleToUpdate?.file) {
        setImage(vehicleToUpdate?.file);
      }
      setNumberPlate(vehicleToUpdate?.name);

      var newFields = VehicleForm?.form;
      newFields[0] = {...newFields[0], value: vehicleToUpdate?.manufacturer[0]};
      newFields[1] = {...newFields[1], value: vehicleToUpdate?.vehicle_model[0]};
      newFields[2] = {...newFields[2], value: vehicleToUpdate?.vehicle_variant[0]};
      newFields[3] = {...newFields[3], value: vehicleToUpdate?.year_id[0]};

      setState({...state,
        fields: newFields,
        vendor: { value: vehicleToUpdate?.manufacturer[0], label: vehicleToUpdate?.manufacturer[1] },
        model: {
          value: vehicleToUpdate?.vehicle_model[0],
          label: vehicleToUpdate?.vehicle_model[1],
          vehicleID: vehicleToUpdate?.manufacturer[0],
        },
        type: {
          value: vehicleToUpdate?.vehicle_variant[0],
          label: vehicleToUpdate?.vehicle_variant[1],
          modelID: vehicleToUpdate?.vehicle_model[0],
        },
        year: { value: vehicleToUpdate?.year_id[0], label: vehicleToUpdate?.year_id[1] },
      });
      setCardAdded(true);
    } else {
      setState({...state, fields: VehicleForm?.form});
    }
  }, []);

  const updateVehicle = async () => {
    setLoading(true);
    const args = [
      [vehicleToUpdate?.id],
      {
        customer: userProfile?.id,
        manufacturer: state?.vendor?.value,
        vehicle_model: state?.model?.value,
        vehicle_variant: state?.type?.value,
        year_id: state?.year?.value,
        name: numberPlate,
      },
    ];
    GeneralPostAPI({
      method: "write",
      model: "gorex.vehicle",
      args,
    }).then(({ success, response }) => {
      setLoading(false);
      if (success) {
        navigation.navigate("SuccessVehicle");
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const addVehicle = async () => {
    setLoading(true);
    const args = [
      {
        customer: userProfile?.id,
        manufacturer: state?.vendor?.value,
        vehicle_model: state?.model?.value,
        vehicle_variant: state?.type?.value,
        year_id: state?.year?.value,
        name: numberPlate,
      },
    ];
    GeneralPostAPI({
      method: "create",
      model: "gorex.vehicle",
      args,
    }).then(({ success, response }) => {
      setLoading(false);
      if (success) {
        navigation.navigate("SuccessVehicle");
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const getVehicles = () => {
    GeneralAPI({method: "search_read", model: "gorex.manufacturer",}).then(({ success, response }) => {
      if (success) {
        const vehicles = response.map((vehicle) => {
          return { value: vehicle?.id, label: vehicle?.name };
        });
        setVehicles(vehicles);
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const getModels = () => {
    GeneralAPI({method: "search_read", model: "vehicle.model",}).then(({ success, response }) => {
      if (success) {
        const models = response.map((model) => {
          return {
            value: model?.id,
            label: model?.name,
            vehicleID: model?.manufacturer[0],
          };
        });
        setModels(models);
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const getTypes = () => {
    GeneralAPI({method: "search_read", model: "vehicle.variant",}).then(({ success, response }) => {
      if (success) {
        const types = response.map((type) => {
          return {
            value: type?.id,
            label: type?.name,
            modelID: type?.vehicle_model[0],
          };
        });
        setTypes(types);
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const getYears = () => {
    GeneralAPI({method: "search_read", model: "gorex.year",}).then(({ success, response }) => {
      if (success) {
        const years = response.map((year) => {
          return { value: year?.id, label: year?.year };
        });
        setYears(years);
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const selectOption = (name, option) => {
    let newFields = state.fields;
    let fieldIndex = newFields.findIndex((_) => _.xmlName === name);
    newFields[fieldIndex] = {
      ...newFields[fieldIndex],
      value: option?.value?.toString(),
    };
    setState({
      ...state,
      [name]: option,
      fields: newFields,
    });
  };

  const selectVehicle = (option) => {
    if (!state.vendor) {
      return Alert.alert(t("common.alert"), t("vehicle.selectVehicle"), [{text: t("common.OK")}]);
    }
    setShowVehicle(false);
    setTimeout(() => {
      setShowModel(true);
    }, 800);
  };

  const selectModal = (option) => {
    if (!state.model) {
      return Alert.alert(t("common.alert"), t("vehicle.selectmodel"), [{text: t("common.OK")}]);
    }
    setShowModel(false);
    setTimeout(() => {
      setShowType(true);
    }, 800);
  };

  const selectType = (option) => {
    if (!state.type) {
      return Alert.alert(t("common.alert"), t("vehicle.selecttype"), [{text: t("common.OK")}]);
    }
    setShowType(false);
    setTimeout(() => {
      setShowYear(true);
    }, 800);
  };

  const selectYear = (option) => {
    if (!state.year) {
      return Alert.alert(t("common.alert"), t("vehicle.selectyear"), [{text: t("common.OK")}]);
    }
    setShowYear(false);
    setTimeout(() => {
      setNumberPlateModal(true);
    }, 800);
  };

  const selectNumberPlate = (option) => {
    if (!numberPlate) {
      return Alert.alert(t("common.alert"), t("vehicle.selectnumber"), [{text: t("common.OK")}]);
    }
    setNumberPlateModal(false);
    setCardAdded(true);
  };

  const handleImagePicker = async () => {
    const granted = await requestLibraryPermission();
    if (granted) {
      await launchImageLibrary({mediaType: "photo", maxHeight: 600, maxWidth: 800, includeBase64: true,}, (response) => {
            if (response?.assets?.length > 0 && response?.assets[0]?.base64) {
              setImage(response?.assets[0]?.base64);
            }
          }
      );
    } else {
      navigation.navigate("PermissionScreen");
    }
  };

  return (
      <View style={styles.container}>
        <BackHeader title={vehicleToUpdate ? t("vehicle.updatevehicle") : t("vehicle.Add Vehicle")} />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {cardAdded ? (
              <ConfrimVehicleCard
                  onPress={() => setShowVehicle(!showVehicle)}
                  vehicle={{
                    vendor: state?.vendor?.label,
                    model: state?.model?.label,
                    type: state?.type?.label,
                    year: state?.year?.label,
                    plate_number: numberPlate,
                    file: vehicles?.find((_) => _?.value === state.vendor?.value)?.file,
                  }}/>

          ) : (
              <View style={styles.buttonContainer}>
                <Text style={styles.pleaseAddVehicleTitleText}>{t("vehicle.pleaseaddvehicle")}</Text>
                <RoundedSquareFullButton title={t("vehicle.+AddVehicle")} onPress={async () => setShowVehicle(!showVehicle)} />
              </View>
          )}

          <VehicleOptions
              visible={showVehicle}
              xmlName="vendor"
              selectedValue={state?.vendor?.value}
              title={t("vehicle.choosevehicle")}
              options={vehicles}
              onPress={selectVehicle}
              selectOption={selectOption}
              onClose={() => {
                setShowVehicle(false);
              }}
          />

          <VehicleOptions
              visible={showModel}
              options={models.filter((model) => model?.vehicleID === state?.vendor?.value)}
              xmlName="model"
              title={t("vehicle.choosemodel")}
              selectedValue={state?.model?.value}
              onPress={selectModal}
              selectOption={selectOption}
              onClose={() => setShowModel(false)}
          />

          <VehicleOptions
              visible={showType}
              options={types.filter((type) => type?.modelID === state?.model?.value)}
              xmlName="type"
              title={t("vehicle.choosetype")}
              selectedValue={state?.type?.value}
              onPress={selectType}
              selectOption={selectOption}
              onClose={() => setShowType(false)}
          />

          <VehicleOptions
              visible={showYear}
              options={years}
              xmlName="year"
              title={t("vehicle.chooseyear")}
              selectedValue={state?.year?.value}
              onPress={selectYear}
              selectOption={selectOption}
              onClose={() => setShowYear(false)}
          />
          <CustomBottomSheet open={numberPlateModal} roundedSquareFullButton title={t("vehicle.select")} onPress={selectNumberPlate} >
            <View style={styles.sheetContent}>
              <View style={styles.inputtextContainerSheet}>
                <Text style={styles.disabledText}>{t("vehicle.numberPlate")}</Text>
                <TextInput
                    onChangeText={(text) => setNumberPlate(text)}
                    value={numberPlate}
                    style={[styles.input]}
                    placeholder={t("vehicle.enternumberplate")}
                    placeholderTextColor={Colors.BLACK}
                />
              </View>
            </View>
          </CustomBottomSheet>

          <CustomBottomSheet height={140} removeButton onClose={() => setIstimaraModal(false)} open={IstimaraModal}>
            <View style={styles.contentSheet}>
              <View style={styles.optionsContainer}>
                <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                />
              </View>
              <View style={styles.inputtextContainer}>
                <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
                  <Image style={styles.imagePicker} source={image ? { uri: `data:image/gif;base64,${image}` } : Istimara}/>
                </TouchableOpacity>
              </View>
            </View>
            <Footer title={t("vehicle.confirmadd")} onPress={() => setIstimaraModal(false)}/>
          </CustomBottomSheet>

          <View style={styles.buttonContainer}>
            <Text style={styles.addVehicleIstimaraTitleText}>{t("vehicle.istimara")}</Text>
            {image ? (
                <ImageBackground source={image ? { uri: `data:image/gif;base64,${image}` } : Istimara} style={styles.bg} imageStyle={styles.istimaraBGImage}>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => setImage("")}>
                    <Text style={{ color: "white" }}> {t("vehicle.delete")}</Text>
                  </TouchableOpacity>
                </ImageBackground>
            ) : (
                <RoundedSquareFullButton title={t("vehicle.+AddIstimara")} onPress={() => setIstimaraModal(true)} />
            )}
          </View>
        </ScrollView>

        <Footer title={t("vehicle.confirmadd")} disabled={!image || !cardAdded} onPress={vehicleToUpdate ? updateVehicle : addVehicle}/>

        <Loader visible={loading} />
      </View>
  );
};


export default VehicleInformation;
