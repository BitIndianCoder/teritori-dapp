import axios from "axios";
import { CID } from "multiformats/cid";

import { LocalFileData } from "../utils/types/files";

export interface PinataFileProps {
  file: LocalFileData;
  pinataJWTKey: string;
}

export const pinataPinFileToIPFS = async ({
  file,
  pinataJWTKey,
}: PinataFileProps) => {
  try {
    const formData = new FormData();
    formData.append("file", file.file);
    const responseFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        Authorization: "Bearer " + pinataJWTKey,
        "Content-Type": "multipart/form-data",
      },
    });
    const v0 = CID.parse(responseFile.data.IpfsHash);

    return {
      ...responseFile.data,
      IpfsHash: v0.toV1().toString(),
    };
  } catch (err) {
    console.error("Error pinning " + file.fileName + " to IPFS", err);
  }
};
