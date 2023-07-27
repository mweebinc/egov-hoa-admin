import React from "react";
import getStatusColor from "./getStatusColor";

function map(resident) {
  const status = resident.status;
  const barangay = resident.barangay.map((b) => b.name);
  const picture = resident.picture;
  const sex = resident.sex;
  const civil_status = resident.civil_status;
  const birthdate = resident.birthdate;
  const hoa = resident.hoa;
  const address = [];
  if (resident.block_number) {
    address.push("blk " + resident.block_number);
  }
  if (resident.unit_number) {
    address.push(resident.unit_number);
  }
  if (resident.street) {
    address.push(resident.street);
  }
  if (resident.barangay.length > 0) {
    address.push(resident.barangay[0].name);
  }
  return {
    id: resident._id,
    name: `${resident.first_name} ${resident.last_name}`,
    address: address.join(" "),
    barangay: barangay,
    picture: picture,
    sex: sex,
    civil_status: civil_status,
    birthDate: birthdate,
    hoa: hoa,
    status: (
      <span className={`badge ${getStatusColor(status)} text-white`}>
        {status}
      </span>
    ),
  };
}

export default map;
