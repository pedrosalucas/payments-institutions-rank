import { tb_historico_acesso } from "@prisma/client";
import { Prisma } from "@prisma/client";

type Address = {
  long_name: string;
  short_name: string;
  types: string[];
};

export default function addressParser(
  addressObject: Address[],
  accessIp: string,
  lat: number,
  lng: number
): tb_historico_acesso {
  let accessAddress = {} as tb_historico_acesso;
  for (const address of addressObject) {
    if (
      address.types.includes("administrative_area_level_2") &&
      address.types.includes("political")
    ) {
      accessAddress.nm_cidade = address.long_name;
    } else if (
      address.types.includes("administrative_area_level_1") &&
      address.types.includes("political")
    ) {
      accessAddress.nm_estado = address.long_name;
    } else if (
      address.types.includes("country") &&
      address.types.includes("political")
    ) {
      accessAddress.nm_pais = address.long_name;
    }
  }
  accessAddress.ip_acesso = accessIp;
  accessAddress.x_latitude = lat;
  accessAddress.y_longitude = lng;
  return accessAddress;
}
