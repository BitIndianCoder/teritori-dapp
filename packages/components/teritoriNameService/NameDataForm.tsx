import React, { useEffect, useState } from "react";
import { Image, View, ViewStyle } from "react-native";

import tnsProfileAvatar from "../../../assets/default-images/default-name-nft.png";
import tnsProfileCover from "../../../assets/default-images/tns-profile-cover.png";
import uploadCloudIcon from "../../../assets/icons/upload-cloud.svg";
import { Metadata } from "../../contracts-clients/teritori-name-service/TeritoriNameService.types";
import { neutral17, neutral33, neutral77 } from "../../utils/style/colors";
import { layout } from "../../utils/style/layout";
import { BrandText } from "../BrandText";
import { ExternalLink } from "../ExternalLink";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { TextInputCustom } from "../inputs/TextInputCustom";
// TODO: Later, create a reusable FormBase cpt to avoid writing too much code and call it in NameDataForm.tsx. Maybe use react-hook-form ?

export const NameDataForm: React.FC<{
  isMintPath?: boolean;
  btnLabel: string;
  onPressBtn: (values: Metadata) => Promise<void>;
  initialData: Metadata;
  disabled?: boolean;
}> = ({ isMintPath, btnLabel, onPressBtn, initialData, disabled }) => {
  const [pathId, setPathId] = useState("");
  const [publicName, setPublicName] = useState("");
  const [public_bio, setBio] = useState("");
  const [image, setImageUrl] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [email, setEmail] = useState("");
  const [external_url, setWebsite] = useState("");
  const [twitter_id, setTwitter] = useState("");
  const [discord_id, setDiscord] = useState("");
  const [telegram_id, setTelegrameUsername] = useState("");
  const [keybase_id, setKeybaseIo] = useState("");
  const [validator_operator_address, setValidatorOperatorAddress] =
    useState("");

  const inputStyle: ViewStyle = { marginBottom: 12, width: "100%" };
  const profileDataTextStyle = { color: neutral77, fontSize: 16 };

  // Sending the input values
  const handlePressBtn = () =>
    onPressBtn({
      pathId,
      public_name: publicName,
      public_bio,
      image,
      public_profile_header: bannerImage,
      email,
      external_url,
      twitter_id,
      discord_id,
      telegram_id,
      keybase_id,
      validator_operator_address,
    });

  // Setting initial inputs values (Pre-filled values if existing token)
  useEffect(() => {
    setBio(initialData.public_bio || "");
    setImageUrl(initialData.image || "");
    setBannerImage(initialData.public_profile_header || "");
    setEmail(initialData.email || "");
    setWebsite(initialData.external_url || "");
    setTwitter(initialData.twitter_id || "");
    setDiscord(initialData.discord_id || "");
    setTelegrameUsername(initialData.telegram_id || "");
    setKeybaseIo(initialData.keybase_id || "");
    setValidatorOperatorAddress(initialData.validator_operator_address || "");
    setPublicName(initialData.public_name || "");
  }, [initialData]);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      {isMintPath ? (
        <>
          <View
            style={{
              width: 210,
              height: 72,
              minHeight: 72,
              flex: 1,
              marginTop: 4,
              marginBottom: 20,
              alignSelf: "flex-start",
            }}
          >
            <BrandText style={{ marginBottom: 8 }}>Profile data</BrandText>
            <BrandText style={profileDataTextStyle}>
              Tip: to generate a PFP URL, use a service like{" "}
              <ExternalLink
                externalUrl="https://www.pinata.cloud/"
                style={{ fontSize: 16 }}
              >
                Pinata
              </ExternalLink>
              .
            </BrandText>
          </View>
          <TextInputCustom<Metadata>
            name="pathId"
            style={inputStyle}
            label="Path ID (must be unique)"
            placeHolder="Type path ID here"
            value={pathId}
            onChangeText={setPathId}
            squaresBackgroundColor={neutral17}
          />
        </>
      ) : null}
      <TextInputCustom<Metadata>
        name="name"
        style={[inputStyle]}
        label="Name"
        rules={{ required: true }}
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Type name here"
        value={publicName}
        onChangeText={setPublicName}
        regexp={new RegExp(/^[a-zA-Z]+$/)}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="public_bio"
        style={inputStyle}
        label="Bio"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Type bio here"
        value={public_bio}
        onChangeText={setBio}
        squaresBackgroundColor={neutral17}
      />
      <View
        style={{
          borderRadius: layout.borderRadius,
          borderWidth: 1,
          marginBottom: layout.spacing_x1,
          padding: layout.spacing_x1_5,
          backgroundColor: neutral17,
        }}
      >
        <TextInputCustom<Metadata>
          name="image"
          style={inputStyle}
          label="Avatar URL"
          noBrokenCorners
          variant="labelOutside"
          placeHolder="https://website.com/avatar.jpg"
          postIconSVG={uploadCloudIcon}
          value={image}
          onChangeText={setImageUrl}
          squaresBackgroundColor={neutral17}
        />
        <TextInputCustom<Metadata>
          name="public_profile_header"
          style={inputStyle}
          label="Cover Image URL"
          noBrokenCorners
          postIconSVG={uploadCloudIcon}
          variant="labelOutside"
          placeHolder="https://website.com/coverimage.jpg"
          value={bannerImage}
          onChangeText={setBannerImage}
          squaresBackgroundColor={neutral17}
        />
        <View
          style={{
            marginTop: layout.spacing_x1,
            marginBottom: layout.spacing_x3,
          }}
        >
          <Image
            source={{ uri: bannerImage || tnsProfileCover }}
            style={{
              width: 388,
              height: 100,
              borderRadius: layout.borderRadius,
              borderWidth: 1,
              borderColor: neutral33,
            }}
          />
          <Image
            source={{ uri: image || tnsProfileAvatar }}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              bottom: -24,
              left: 16,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: neutral33,
            }}
          />
        </View>
      </View>

      <TextInputCustom<Metadata>
        name="email"
        style={inputStyle}
        label="Email"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Type email here"
        value={email}
        onChangeText={setEmail}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="external_url"
        style={inputStyle}
        label="Website"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Type/insert link here"
        value={external_url}
        onChangeText={setWebsite}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="twitter_id"
        style={inputStyle}
        label="Twitter (X)"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Link to Twitter account"
        value={twitter_id}
        onChangeText={setTwitter}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="discord_id"
        style={inputStyle}
        label="Discord"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Link to Discord"
        value={discord_id}
        onChangeText={setDiscord}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="telegram_id"
        style={inputStyle}
        label="Telegram Username"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="@nickname"
        value={telegram_id}
        onChangeText={setTelegrameUsername}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="keybase_id"
        style={inputStyle}
        label="Keybase.io"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Type/insert link here"
        value={keybase_id}
        onChangeText={setKeybaseIo}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="validator_operator_address"
        style={inputStyle}
        label="Validator Operator Address"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="Type/insert link here"
        value={validator_operator_address}
        onChangeText={setValidatorOperatorAddress}
        squaresBackgroundColor={neutral17}
      />
      <PrimaryButton
        size="M"
        text={btnLabel}
        disabled={disabled}
        onPress={handlePressBtn}
        style={{ marginHorizontal: 8, alignSelf: "center" }}
        squaresBackgroundColor={neutral17}
        loader
      />
    </View>
  );
};
